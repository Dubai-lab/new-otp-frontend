import React, { useState, useEffect } from 'react';
import { getSMTPConfigs, createSMTPConfig, updateSMTPConfig, deleteSMTPConfig, type SMTPConfig, type CreateSMTPData } from '../SMTPService';
import "./SMTP.css";

export default function SMTP() {
  const [smtpConfigs, setSmtpConfigs] = useState<SMTPConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingConfig, setEditingConfig] = useState<SMTPConfig | null>(null);
  const [formData, setFormData] = useState<CreateSMTPData>({
    name: '',
    host: '',
    port: 587,
    email: '',
    password: '',
  });

  useEffect(() => {
    fetchSMTPConfigs();
  }, []);

  const fetchSMTPConfigs = async () => {
    try {
      const data = await getSMTPConfigs();
      setSmtpConfigs(data);
    } catch {
      setError('Failed to load SMTP configurations');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      host: '',
      port: 587,
      email: '',
      password: '',
    });
    setEditingConfig(null);
  };

  const handleCreate = () => {
    resetForm();
    setShowCreateForm(true);
  };

  const handleEdit = (config: SMTPConfig) => {
    setFormData({
      name: config.name,
      host: config.host,
      port: config.port,
      email: config.email,
      password: '', // Don't populate password for security
    });
    setEditingConfig(config);
    setShowCreateForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.host || !formData.email || !formData.password) return;

    setSaving(true);
    setError(null);

    try {
      if (editingConfig) {
        await updateSMTPConfig(editingConfig.id, formData);
      } else {
        await createSMTPConfig(formData);
      }
      setShowCreateForm(false);
      resetForm();
      await fetchSMTPConfigs();
    } catch {
      setError(`Failed to ${editingConfig ? 'update' : 'create'} SMTP configuration`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this SMTP configuration? This action cannot be undone.')) return;

    setDeletingId(id);
    try {
      await deleteSMTPConfig(id);
      setSmtpConfigs(smtpConfigs.filter(config => config.id !== id));
    } catch {
      setError('Failed to delete SMTP configuration');
    } finally {
      setDeletingId(null);
    }
  };

  const handleCancel = () => {
    setShowCreateForm(false);
    resetForm();
  };

  if (loading) return <div className="loading">Loading SMTP configurations...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h2>SMTP Configurations</h2>
        <button className="action-btn" onClick={handleCreate}>
          + Add Config
        </button>
      </div>

      {showCreateForm && (
        <div className="create-form">
          <h3>{editingConfig ? 'Edit' : 'Add'} SMTP Configuration</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Configuration Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Gmail SMTP"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="host">SMTP Host</label>
                <input
                  type="text"
                  id="host"
                  value={formData.host}
                  onChange={(e) => setFormData({ ...formData, host: e.target.value })}
                  placeholder="e.g., smtp.gmail.com"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="port">Port</label>
                <input
                  type="number"
                  id="port"
                  value={formData.port}
                  onChange={(e) => setFormData({ ...formData, port: parseInt(e.target.value) || 587 })}
                  min="1"
                  max="65535"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your-email@gmail.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder={editingConfig ? 'Leave empty to keep current password' : 'Enter password'}
                required={!editingConfig}
              />
            </div>

            <div className="form-actions">
              <button type="button" onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="save-btn">
                {saving ? (editingConfig ? 'Updating...' : 'Creating...') : (editingConfig ? 'Update Config' : 'Create Config')}
              </button>
            </div>
          </form>
        </div>
      )}

      {smtpConfigs.length === 0 ? (
        <div className="empty-state">
          <h3>No SMTP configurations yet</h3>
          <p>Add your first SMTP configuration to start sending emails.</p>
          <button className="action-btn" onClick={handleCreate}>
            Add SMTP Config
          </button>
        </div>
      ) : (
        <div className="card-grid">
          {smtpConfigs.map((config) => (
            <div key={config.id} className="card-item">
              <div className="card-header">
                <h3>{config.name}</h3>
                <div className="card-actions">
                  <button onClick={() => handleEdit(config)} className="edit-btn">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(config.id)}
                    disabled={deletingId === config.id}
                    className="delete-btn"
                  >
                    {deletingId === config.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
              <div className="card-content">
                <p><strong>Host:</strong> {config.host}</p>
                <p><strong>Port:</strong> {config.port}</p>
                <p><strong>Email:</strong> {config.email}</p>
                <p><strong>Created:</strong> {new Date(config.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
