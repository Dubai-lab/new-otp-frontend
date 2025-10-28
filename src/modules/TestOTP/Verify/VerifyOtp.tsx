import React, { useState } from 'react';
import { verifyTestOtp, type VerifyOtpRequest, type VerifyOtpResponse } from '../TestOtpService';
import { getApiKeys, type ApiKey } from '../../ApiKeys/ApiKeysService';
import { useEffect } from 'react';

export default function VerifyOtp() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<VerifyOtpRequest>({
    apiKeyId: '',
    otp: '',
  });

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    setLoading(true);
    try {
      const data = await getApiKeys();
      setApiKeys(data);
    } catch {
      setError('Failed to load API keys');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.apiKeyId || !formData.otp) return;

    setVerifying(true);
    setError(null);
    setSuccess(null);

    try {
      const response: VerifyOtpResponse = await verifyTestOtp(formData);
      if (response.success) {
        setSuccess('OTP verified successfully!');
        setFormData({ apiKeyId: '', otp: '' });
      } else {
        setError(response.message);
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Failed to verify OTP');
    } finally {
      setVerifying(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h2>Verify OTP</h2>
      </div>

      <div className="verify-otp-container">
        <div className="verify-section">
          <h3>Verify OTP</h3>
          <form onSubmit={handleSubmit} className="otp-form">
            <div className="form-group">
              <label htmlFor="apiKeyId">API Key</label>
              <select
                id="apiKeyId"
                value={formData.apiKeyId}
                onChange={(e) => setFormData({ ...formData, apiKeyId: e.target.value })}
                required
              >
                <option value="">Select API Key</option>
                {apiKeys.map((key) => (
                  <option key={key.id} value={key.id}>
                    {key.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="otp">OTP Code</label>
              <input
                type="text"
                id="otp"
                value={formData.otp}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                placeholder="Enter OTP code"
                required
                maxLength={6}
              />
            </div>

            <button type="submit" disabled={verifying} className="verify-btn">
              {verifying ? 'Verifying...' : 'Verify OTP ✅'}
            </button>
          </form>
        </div>

        <div className="result-section">
          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error}
            </div>
          )}

          {success && (
            <div className="success-message">
              <strong>Success:</strong> {success}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
