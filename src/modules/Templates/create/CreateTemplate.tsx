import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTemplate } from '../TemplateService';
import './CreateTemplate.css';

export default function CreateTemplate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    headerText: '',
    bodyText: '',
    footerText: '',
    styles: {
      header: {
        backgroundColor: '#ffffff',
        textColor: '#000000',
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
      },
      body: {
        backgroundColor: '#ffffff',
        textColor: '#000000',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
      },
      otp: {
        backgroundColor: '#f0f0f0',
        textColor: '#000000',
        fontSize: '18px',
        padding: '10px',
      },
      footer: {
        backgroundColor: '#ffffff',
        textColor: '#000000',
        fontSize: '12px',
        fontFamily: 'Arial, sans-serif',
      },
    },
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await createTemplate(formData);
      navigate('../');
    } catch {
      setError('Failed to create template');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleStyleChange = (section: keyof typeof formData.styles, property: string, value: string) => {
    setFormData({
      ...formData,
      styles: {
        ...formData.styles,
        [section]: {
          ...formData.styles[section],
          [property]: value,
        },
      },
    });
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Create Template</h2>
      </div>

      <form onSubmit={handleSubmit} className="template-form">
        <div className="form-group">
          <label htmlFor="name">Template Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Email Subject</label>
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="headerText">Header Text</label>
          <textarea
            id="headerText"
            value={formData.headerText}
            onChange={(e) => handleChange('headerText', e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bodyText">Body Text (use &#123;&#123;OTP&#125;&#125; for OTP placeholder)</label>
          <textarea
            id="bodyText"
            value={formData.bodyText}
            onChange={(e) => handleChange('bodyText', e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="footerText">Footer Text</label>
          <textarea
            id="footerText"
            value={formData.footerText}
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
                value={formData.styles.header.backgroundColor}
                onChange={(e) => handleStyleChange('header', 'backgroundColor', e.target.value)}
                title="Background Color"
              />
              <input
                type="color"
                value={formData.styles.header.textColor}
                onChange={(e) => handleStyleChange('header', 'textColor', e.target.value)}
                title="Text Color"
              />
              <select
                value={formData.styles.header.fontSize}
                onChange={(e) => handleStyleChange('header', 'fontSize', e.target.value)}
                title="Font Size"
              >
                <option value="12px">12px</option>
                <option value="14px">14px</option>
                <option value="16px">16px</option>
                <option value="18px">18px</option>
                <option value="20px">20px</option>
                <option value="24px">24px</option>
                <option value="28px">28px</option>
                <option value="32px">32px</option>
              </select>
              <select
                value={formData.styles.header.fontFamily}
                onChange={(e) => handleStyleChange('header', 'fontFamily', e.target.value)}
                title="Font Family"
              >
                <option value="Arial, sans-serif">Arial</option>
                <option value="Helvetica, sans-serif">Helvetica</option>
                <option value="'Times New Roman', serif">Times New Roman</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="'Courier New', monospace">Courier New</option>
                <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
                <option value="Verdana, sans-serif">Verdana</option>
              </select>
            </div>
          </div>

          {/* Body Styles */}
          <div className="style-group">
            <h4>Body</h4>
            <div className="style-inputs">
              <input
                type="color"
                value={formData.styles.body.backgroundColor}
                onChange={(e) => handleStyleChange('body', 'backgroundColor', e.target.value)}
                title="Background Color"
              />
              <input
                type="color"
                value={formData.styles.body.textColor}
                onChange={(e) => handleStyleChange('body', 'textColor', e.target.value)}
                title="Text Color"
              />
              <select
                value={formData.styles.body.fontSize}
                onChange={(e) => handleStyleChange('body', 'fontSize', e.target.value)}
                title="Font Size"
              >
                <option value="12px">12px</option>
                <option value="14px">14px</option>
                <option value="16px">16px</option>
                <option value="18px">18px</option>
                <option value="20px">20px</option>
                <option value="24px">24px</option>
                <option value="28px">28px</option>
                <option value="32px">32px</option>
              </select>
              <select
                value={formData.styles.body.fontFamily}
                onChange={(e) => handleStyleChange('body', 'fontFamily', e.target.value)}
                title="Font Family"
              >
                <option value="Arial, sans-serif">Arial</option>
                <option value="Helvetica, sans-serif">Helvetica</option>
                <option value="'Times New Roman', serif">Times New Roman</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="'Courier New', monospace">Courier New</option>
                <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
                <option value="Verdana, sans-serif">Verdana</option>
              </select>
            </div>
          </div>

          {/* OTP Styles */}
          <div className="style-group">
            <h4>OTP</h4>
            <div className="style-inputs">
              <input
                type="color"
                value={formData.styles.otp.backgroundColor}
                onChange={(e) => handleStyleChange('otp', 'backgroundColor', e.target.value)}
                title="Background Color"
              />
              <input
                type="color"
                value={formData.styles.otp.textColor}
                onChange={(e) => handleStyleChange('otp', 'textColor', e.target.value)}
                title="Text Color"
              />
              <input
                type="text"
                placeholder="Font Size (e.g., 18px)"
                value={formData.styles.otp.fontSize}
                onChange={(e) => handleStyleChange('otp', 'fontSize', e.target.value)}
              />
              <input
                type="text"
                placeholder="Padding (e.g., 10px)"
                value={formData.styles.otp.padding}
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
                value={formData.styles.footer.backgroundColor}
                onChange={(e) => handleStyleChange('footer', 'backgroundColor', e.target.value)}
                title="Background Color"
              />
              <input
                type="color"
                value={formData.styles.footer.textColor}
                onChange={(e) => handleStyleChange('footer', 'textColor', e.target.value)}
                title="Text Color"
              />
              <select
                value={formData.styles.footer.fontSize}
                onChange={(e) => handleStyleChange('footer', 'fontSize', e.target.value)}
                title="Font Size"
              >
                <option value="12px">12px</option>
                <option value="14px">14px</option>
                <option value="16px">16px</option>
                <option value="18px">18px</option>
                <option value="20px">20px</option>
                <option value="24px">24px</option>
                <option value="28px">28px</option>
                <option value="32px">32px</option>
              </select>
              <select
                value={formData.styles.footer.fontFamily}
                onChange={(e) => handleStyleChange('footer', 'fontFamily', e.target.value)}
                title="Font Family"
              >
                <option value="Arial, sans-serif">Arial</option>
                <option value="Helvetica, sans-serif">Helvetica</option>
                <option value="'Times New Roman', serif">Times New Roman</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="'Courier New', monospace">Courier New</option>
                <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
                <option value="Verdana, sans-serif">Verdana</option>
              </select>
            </div>
          </div>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="form-actions">
          <button type="button" onClick={() => navigate('../')} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="save-btn">
            {saving ? 'Creating...' : 'Create Template'}
          </button>
        </div>
      </form>
    </div>
  );
}
