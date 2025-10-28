import React, { useState, useEffect } from 'react';
import { getApiKeys, createApiKey, deleteApiKey, type ApiKey, type CreateApiKeyData } from '../ApiKeysService';
import "./ApiKeys.css";

export default function ApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [smtpConfigs, setSmtpConfigs] = useState<{ id: string; name: string; host: string; port: number }[]>([]);
  const [formData, setFormData] = useState<CreateApiKeyData>({
    smtpId: '',
    label: '',
  });

  useEffect(() => {
    fetchApiKeys();
    fetchSmtpConfigs();
  }, []);

  const fetchApiKeys = async () => {
    try {
      const data = await getApiKeys();
      setApiKeys(data);
    } catch {
      setError('Failed to load API keys');
    } finally {
      setLoading(false);
    }
  };

  const fetchSmtpConfigs = async () => {
    try {
      const { getSMTPConfigs } = await import('../../SMTP/SMTPService');
      const data = await getSMTPConfigs();
      setSmtpConfigs(data);
    } catch {
      // Ignore SMTP fetch errors for now
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.smtpId) return;

    setGenerating(true);
    setError(null);

    try {
      const result = await createApiKey(formData);
      alert(`API Key generated successfully!\n\nKey: ${result.apiKey}\n\n⚠️ This key will only be shown once. Please copy it now.`);
      setShowCreateForm(false);
      setFormData({ smtpId: '', label: '' });
      await fetchApiKeys();
    } catch {
      setError('Failed to generate API key');
    } finally {
      setGenerating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) return;

    setDeletingId(id);
    try {
      await deleteApiKey(id);
      setApiKeys(apiKeys.filter(key => key.id !== id));
    } catch {
      setError('Failed to delete API key');
    } finally {
      setDeletingId(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  if (loading) return <div className="loading">Loading API keys...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h2>API Keys</h2>
        <button className="action-btn" onClick={() => setShowCreateForm(!showCreateForm)}>
          + Generate Key
        </button>
      </div>

      {showCreateForm && (
        <div className="create-form">
          <h3>Generate New API Key</h3>
          <form onSubmit={handleGenerate}>
            <div className="form-group">
              <label htmlFor="smtpId">SMTP Configuration</label>
              <select
                id="smtpId"
                value={formData.smtpId}
                onChange={(e) => setFormData({ ...formData, smtpId: e.target.value })}
                required
              >
                <option value="">Select SMTP Config</option>
                {smtpConfigs.map((config) => (
                  <option key={config.id} value={config.id}>
                    {config.name} ({config.host}:{config.port})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="label">Label (Optional)</label>
              <input
                type="text"
                id="label"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                placeholder="e.g., Production Key"
              />
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setShowCreateForm(false)} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" disabled={generating} className="save-btn">
                {generating ? 'Generating...' : 'Generate Key'}
              </button>
            </div>
          </form>
        </div>
      )}

      {apiKeys.length === 0 ? (
        <div className="empty-state">
          <h3>No API keys yet</h3>
          <p>Generate your first API key to start sending OTP emails.</p>
          <button className="action-btn" onClick={() => setShowCreateForm(true)}>
            Generate API Key
          </button>
        </div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {apiKeys.map((key) => (
              <tr key={key.id}>
                <td>{key.name}</td>
                <td>{new Date(key.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => copyToClipboard(key.id)} className="copy-btn">
                    Copy ID
                  </button>
                  <button
                    onClick={() => handleDelete(key.id)}
                    disabled={deletingId === key.id}
                    className="delete-btn"
                  >
                    {deletingId === key.id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
