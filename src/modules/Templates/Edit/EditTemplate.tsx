import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTemplates, updateTemplate } from '../TemplateService';
import type { Template } from '../TemplateService';
import './EditTemplate.css';

export default function EditTemplate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!template) return;

    setSaving(true);
    try {
      await updateTemplate(template.id, {
        name: template.name,
        subject: template.subject,
        headerText: template.headerText,
        bodyText: template.bodyText,
        footerText: template.footerText,
        styles: template.styles,
      });
      navigate('../');
    } catch {
      setError('Failed to update template');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof Template, value: string) => {
    if (!template) return;
    setTemplate({ ...template, [field]: value });
  };

  const handleStyleChange = (section: keyof NonNullable<Template['styles']>, property: string, value: string) => {
    if (!template) return;
    setTemplate({
      ...template,
      styles: {
        ...template.styles,
        [section]: {
          ...template.styles?.[section],
          [property]: value,
        },
      },
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!template) return <div>Template not found</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h2>Edit Template</h2>
      </div>

      <form onSubmit={handleSubmit} className="template-form">
        <div className="form-group">
          <label htmlFor="name">Template Name</label>
          <input
            type="text"
            id="name"
            value={template.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Email Subject</label>
          <input
            type="text"
            id="subject"
            value={template.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="headerText">Header Text</label>
          <textarea
            id="headerText"
            value={template.headerText}
            onChange={(e) => handleChange('headerText', e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bodyText">Body Text (use &#123;&#123;OTP&#125;&#125; for OTP placeholder)</label>
          <textarea
            id="bodyText"
            value={template.bodyText}
            onChange={(e) => handleChange('bodyText', e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="footerText">Footer Text</label>
          <textarea
            id="footerText"
            value={template.footerText}
            onChange={(e) => handleChange('footerText', e.target.value)}
            required
          />
        </div>

        {/* Styles Section */}
        <div className="styles-section">
          <h3>Styles</h3>

          {/* Header Styles */}
          <div className="style-group">
            <h4>Header</h4>
            <div className="style-inputs">
              <input
                type="color"
                value={template.styles?.header?.backgroundColor || '#ffffff'}
                onChange={(e) => handleStyleChange('header', 'backgroundColor', e.target.value)}
                title="Background Color"
              />
              <input
                type="color"
                value={template.styles?.header?.textColor || '#000000'}
                onChange={(e) => handleStyleChange('header', 'textColor', e.target.value)}
                title="Text Color"
              />
              <input
                type="text"
                placeholder="Font Size (e.g., 16px)"
                value={template.styles?.header?.fontSize || ''}
                onChange={(e) => handleStyleChange('header', 'fontSize', e.target.value)}
              />
              <input
                type="text"
                placeholder="Font Family"
                value={template.styles?.header?.fontFamily || ''}
                onChange={(e) => handleStyleChange('header', 'fontFamily', e.target.value)}
              />
            </div>
          </div>

          {/* Body Styles */}
          <div className="style-group">
            <h4>Body</h4>
            <div className="style-inputs">
              <input
                type="color"
                value={template.styles?.body?.backgroundColor || '#ffffff'}
                onChange={(e) => handleStyleChange('body', 'backgroundColor', e.target.value)}
                title="Background Color"
              />
              <input
                type="color"
                value={template.styles?.body?.textColor || '#000000'}
                onChange={(e) => handleStyleChange('body', 'textColor', e.target.value)}
                title="Text Color"
              />
              <input
                type="text"
                placeholder="Font Size (e.g., 14px)"
                value={template.styles?.body?.fontSize || ''}
                onChange={(e) => handleStyleChange('body', 'fontSize', e.target.value)}
              />
              <input
                type="text"
                placeholder="Font Family"
                value={template.styles?.body?.fontFamily || ''}
                onChange={(e) => handleStyleChange('body', 'fontFamily', e.target.value)}
              />
            </div>
          </div>

          {/* OTP Styles */}
          <div className="style-group">
            <h4>OTP</h4>
            <div className="style-inputs">
              <input
                type="color"
                value={template.styles?.otp?.backgroundColor || '#f0f0f0'}
                onChange={(e) => handleStyleChange('otp', 'backgroundColor', e.target.value)}
                title="Background Color"
              />
              <input
                type="color"
                value={template.styles?.otp?.textColor || '#000000'}
                onChange={(e) => handleStyleChange('otp', 'textColor', e.target.value)}
                title="Text Color"
              />
              <input
                type="text"
                placeholder="Font Size (e.g., 18px)"
                value={template.styles?.otp?.fontSize || ''}
                onChange={(e) => handleStyleChange('otp', 'fontSize', e.target.value)}
              />
              <input
                type="text"
                placeholder="Padding (e.g., 10px)"
                value={template.styles?.otp?.padding || ''}
                onChange={(e) => handleStyleChange('otp', 'padding', e.target.value)}
              />
            </div>
          </div>

          {/* Footer Styles */}
          <div className="style-group">
            <h4>Footer</h4>
            <div className="style-inputs">
              <input
                type="color"
                value={template.styles?.footer?.backgroundColor || '#ffffff'}
                onChange={(e) => handleStyleChange('footer', 'backgroundColor', e.target.value)}
                title="Background Color"
              />
              <input
                type="color"
                value={template.styles?.footer?.textColor || '#000000'}
                onChange={(e) => handleStyleChange('footer', 'textColor', e.target.value)}
                title="Text Color"
              />
              <input
                type="text"
                placeholder="Font Size (e.g., 12px)"
                value={template.styles?.footer?.fontSize || ''}
                onChange={(e) => handleStyleChange('footer', 'fontSize', e.target.value)}
              />
              <input
                type="text"
                placeholder="Font Family"
                value={template.styles?.footer?.fontFamily || ''}
                onChange={(e) => handleStyleChange('footer', 'fontFamily', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('../')} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="save-btn">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
