import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTemplates, deleteTemplate } from '../TemplateService';
import type { Template } from '../TemplateService';
import './ManageTemplates.css';

export default function ManageTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const data = await getTemplates();
      setTemplates(data);
    } catch {
      setError('Failed to load templates');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return;

    setDeletingId(id);
    try {
      await deleteTemplate(id);
      setTemplates(templates.filter(t => t.id !== id));
    } catch {
      setError('Failed to delete template');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <div className="loading">Loading templates...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h2>Templates</h2>
        <Link to="create" className="action-btn">
          + New Template
        </Link>
      </div>

      {templates.length === 0 ? (
        <div className="empty-state">
          <h3>No templates yet</h3>
          <p>Create your first email template to get started.</p>
          <Link to="create" className="action-btn">
            Create Template
          </Link>
        </div>
      ) : (
        <div className="card-grid">
          {templates.map((template) => (
            <div key={template.id} className="card-item">
              <div className="card-header">
                <h3>{template.name}</h3>
                <div className="card-actions">
                  <Link to={`view/${template.id}`} className="view-btn">
                    View
                  </Link>
                  <Link to={`edit/${template.id}`} className="edit-btn">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(template.id)}
                    disabled={deletingId === template.id}
                    className="delete-btn"
                  >
                    {deletingId === template.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
              <p className="subject">Subject: {template.subject}</p>
              <div className="template-preview">
                <div className="preview-section">
                  <strong>Header:</strong> {template.headerText.substring(0, 50)}...
                </div>
                <div className="preview-section">
                  <strong>Body:</strong> {template.bodyText.substring(0, 100)}...
                </div>
                <div className="preview-section">
                  <strong>Footer:</strong> {template.footerText.substring(0, 50)}...
                </div>
              </div>
              <div className="template-meta">
                Created: {new Date(template.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
