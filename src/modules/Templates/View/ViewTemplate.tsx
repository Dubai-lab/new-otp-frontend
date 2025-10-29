import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTemplates } from '../TemplateService';
import type { Template } from '../TemplateService';
import './ViewTemplate.css';

export default function ViewTemplate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const templates = await getTemplates();
        const foundTemplate = templates.find(t => t.id === id);
        if (foundTemplate) {
          setTemplate(foundTemplate);
        } else {
          setError('Template not found');
        }
      } catch {
        setError('Failed to load template');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTemplate();
    }
  }, [id]);

  const renderTemplatePreview = (template: Template) => {
    const styles = template.styles || {};

    // Replace {{OTP}} placeholder with a sample OTP for preview
    const bodyText = template.bodyText.replace(/\{\{OTP\}\}/g, '123456');

    return (
      <div className="email-preview">
        {/* Email Header */}
        <div
          className="email-header"
          style={{
            backgroundColor: styles.header?.backgroundColor || '#ffffff',
            color: styles.header?.textColor || '#000000',
            fontSize: styles.header?.fontSize || '16px',
            fontFamily: styles.header?.fontFamily || 'Arial, sans-serif',
            padding: '20px',
            textAlign: 'center',
            borderRadius: styles.header?.borderRadius || '0px',
            border: styles.header?.borderWidth ? `${styles.header.borderWidth} solid ${styles.header.borderColor || '#000000'}` : 'none',
          }}
        >
          {template.headerText}
        </div>

        {/* Email Body */}
        <div
          className="email-body"
          style={{
            backgroundColor: styles.body?.backgroundColor || '#ffffff',
            color: styles.body?.textColor || '#000000',
            fontSize: styles.body?.fontSize || '14px',
            fontFamily: styles.body?.fontFamily || 'Arial, sans-serif',
            padding: '30px',
            lineHeight: '1.6',
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: bodyText.replace(/\n/g, '<br>') }} />

          {/* OTP Display */}
          <div
            className="otp-display"
            style={{
              backgroundColor: styles.otp?.backgroundColor || '#f0f0f0',
              color: styles.otp?.textColor || '#000000',
              fontSize: styles.otp?.fontSize || '18px',
              padding: styles.otp?.padding || '10px',
              borderRadius: styles.otp?.borderRadius || '4px',
              border: styles.otp?.borderWidth ? `${styles.otp.borderWidth} solid ${styles.otp.borderColor || '#000000'}` : 'none',
              display: 'inline-block',
              margin: '20px 0',
              fontWeight: 'bold',
              letterSpacing: '2px',
            }}
          >
            123456
          </div>
        </div>

        {/* Email Footer */}
        <div
          className="email-footer"
          style={{
            backgroundColor: styles.footer?.backgroundColor || '#ffffff',
            color: styles.footer?.textColor || '#000000',
            fontSize: styles.footer?.fontSize || '12px',
            fontFamily: styles.footer?.fontFamily || 'Arial, sans-serif',
            padding: '20px',
            textAlign: 'center',
            borderTop: '1px solid #eee',
          }}
        >
          {template.footerText}
        </div>
      </div>
    );
  };

  if (loading) return <div className="loading">Loading template...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!template) return <div>Template not found</div>;

  return (
    <div className="page">
      <div className="page-header">
        <div className="header-content">
          <h2>Template Preview: {template.name}</h2>
          <div className="template-info">
            <span>Subject: {template.subject}</span>
            <span>Created: {new Date(template.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="header-actions">
          <Link to={`/dashboard/templates/edit/${template.id}`} className="edit-btn">
            Edit Template
          </Link>
          <button onClick={() => navigate('/dashboard/templates')} className="back-btn">
            Back to Templates
          </button>
        </div>
      </div>

      <div className="preview-container">
        <div className="preview-header">
          <h3>Email Preview</h3>
          <p>This is how your email template will appear to recipients</p>
        </div>

        <div className="preview-content">
          {renderTemplatePreview(template)}
        </div>
      </div>
    </div>
  );
}
