import React, { useState, useEffect } from 'react';
import { sendTestOtp, verifyTestOtp, type SendOtpRequest, type SendOtpResponse, type VerifyOtpRequest, type VerifyOtpResponse } from '../TestOtpService';
import { getTemplates, type Template } from '../../Templates/TemplateService';
import { getApiKeys, type ApiKey } from '../../ApiKeys/ApiKeysService';
import "./SendTestOtp.css";

export default function SendTestOtp() {
  const [activeTab, setActiveTab] = useState<'send' | 'verify'>('send');
  const [templates, setTemplates] = useState<Template[]>([]);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [sendFormData, setSendFormData] = useState<SendOtpRequest>({
    recipient: '',
    templateName: '',
    apiKeyId: '',
  });
  const [verifyFormData, setVerifyFormData] = useState<VerifyOtpRequest>({
    apiKeyId: '',
    otp: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [templatesData, apiKeysData] = await Promise.all([
        getTemplates(),
        getApiKeys(),
      ]);
      setTemplates(templatesData);
      setApiKeys(apiKeysData);
    } catch {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSendSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sendFormData.recipient || !sendFormData.templateName || !sendFormData.apiKeyId) return;

    setSending(true);
    setError(null);
    setSuccess(null);

    try {
      const response: SendOtpResponse = await sendTestOtp(sendFormData);
      if (response.success) {
        setSuccess(`OTP sent successfully! OTP: ${response.otp || 'Check your email'}`);
        setSendFormData({ recipient: '', templateName: '', apiKeyId: '' });
      } else {
        setError(response.message);
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setSending(false);
    }
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyFormData.apiKeyId || !verifyFormData.otp) return;

    setVerifying(true);
    setError(null);
    setSuccess(null);

    try {
      const response: VerifyOtpResponse = await verifyTestOtp(verifyFormData);
      if (response.success) {
        setSuccess('OTP verified successfully!');
        setVerifyFormData({ apiKeyId: '', otp: '' });
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
        <h2>Test OTP</h2>
        <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === 'send' ? 'active' : ''}`}
            onClick={() => setActiveTab('send')}
          >
            Send OTP
          </button>
          <button
            className={`tab-btn ${activeTab === 'verify' ? 'active' : ''}`}
            onClick={() => setActiveTab('verify')}
          >
            Verify OTP
          </button>
        </div>
      </div>

      <div className="test-otp-container">
        {activeTab === 'send' && (
          <div className="send-section">
            <h3>Send OTP</h3>
            <form onSubmit={handleSendSubmit} className="otp-form">
              <div className="form-group">
                <label htmlFor="recipient">Recipient Email</label>
                <input
                  type="email"
                  id="recipient"
                  value={sendFormData.recipient}
                  onChange={(e) => setSendFormData({ ...sendFormData, recipient: e.target.value })}
                  placeholder="user@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="templateName">Template</label>
                <select
                  id="templateName"
                  value={sendFormData.templateName}
                  onChange={(e) => setSendFormData({ ...sendFormData, templateName: e.target.value })}
                  required
                >
                  <option value="">Select Template</option>
                  {templates.map((template) => (
                    <option key={template.id} value={template.name}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="apiKeyId">API Key</label>
                <select
                  id="apiKeyId"
                  value={sendFormData.apiKeyId}
                  onChange={(e) => setSendFormData({ ...sendFormData, apiKeyId: e.target.value })}
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

              <button type="submit" disabled={sending} className="send-btn">
                {sending ? 'Sending...' : 'Send OTP 🚀'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'verify' && (
          <div className="verify-section">
            <h3>Verify OTP</h3>
            <form onSubmit={handleVerifySubmit} className="otp-form">
              <div className="form-group">
                <label htmlFor="verifyApiKeyId">API Key</label>
                <select
                  id="verifyApiKeyId"
                  value={verifyFormData.apiKeyId}
                  onChange={(e) => setVerifyFormData({ ...verifyFormData, apiKeyId: e.target.value })}
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
                  value={verifyFormData.otp}
                  onChange={(e) => setVerifyFormData({ ...verifyFormData, otp: e.target.value })}
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
        )}

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
