import React, { useState } from 'react';
import "./Settings.css";

interface SecuritySettings {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  loginNotifications: boolean;
}

export default function SecuritySettings() {
  const [settings, setSettings] = useState<SecuritySettings>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    sessionTimeout: 30, // minutes
    loginNotifications: true
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (settings.newPassword !== settings.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (settings.newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSuccess('Password updated successfully!');
      setSettings(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      setShowPasswordForm(false);
    } catch {
      setError('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const handleSecurityUpdate = async (field: keyof SecuritySettings, value: boolean | number) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setSettings(prev => ({ ...prev, [field]: value }));
      setSuccess('Security settings updated successfully!');
    } catch {
      setError('Failed to update security settings');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: '' };
    if (password.length < 6) return { strength: 1, label: 'Weak' };
    if (password.length < 8) return { strength: 2, label: 'Fair' };
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) return { strength: 4, label: 'Strong' };
    return { strength: 3, label: 'Good' };
  };

  const passwordStrength = getPasswordStrength(settings.newPassword);

  return (
    <div className="page">
      <div className="page-header">
        <h2>Security Settings</h2>
        <p>Manage your account security and authentication preferences.</p>
      </div>

      <div className="settings-container">
        {/* Password Section */}
        <div className="security-section">
          <div className="section-header">
            <h3>Password</h3>
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setShowPasswordForm(!showPasswordForm)}
            >
              {showPasswordForm ? 'Cancel' : 'Change Password'}
            </button>
          </div>

          {showPasswordForm && (
            <form onSubmit={handlePasswordSubmit} className="password-form">
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={settings.currentPassword}
                  onChange={(e) => setSettings(prev => ({ ...prev, currentPassword: e.target.value }))}
                  placeholder="Enter current password"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={settings.newPassword}
                  onChange={(e) => setSettings(prev => ({ ...prev, newPassword: e.target.value }))}
                  placeholder="Enter new password"
                  required
                />
                {settings.newPassword && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div
                        className={`strength-fill strength-${passwordStrength.strength}`}
                        style={{ width: `${(passwordStrength.strength / 4) * 100}%` }}
                      ></div>
                    </div>
                    <span className="strength-label">{passwordStrength.label}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={settings.confirmPassword}
                  onChange={(e) => setSettings(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Confirm new password"
                  required
                />
              </div>

              <button type="submit" disabled={loading} className="save-btn">
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          )}
        </div>

        {/* Two-Factor Authentication */}
        <div className="security-section">
          <div className="section-header">
            <h3>Two-Factor Authentication</h3>
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="twoFactor"
                checked={settings.twoFactorEnabled}
                onChange={(e) => handleSecurityUpdate('twoFactorEnabled', e.target.checked)}
                disabled={loading}
              />
              <label htmlFor="twoFactor" className="switch"></label>
            </div>
          </div>
          <p className="section-description">
            Add an extra layer of security to your account by requiring a second form of authentication.
            {settings.twoFactorEnabled ? ' Two-factor authentication is currently enabled.' : ' Two-factor authentication is currently disabled.'}
          </p>
        </div>

        {/* Session Management */}
        <div className="security-section">
          <h3>Session Management</h3>
          <div className="form-group">
            <label htmlFor="sessionTimeout">Auto-logout after inactivity (minutes)</label>
            <select
              id="sessionTimeout"
              value={settings.sessionTimeout}
              onChange={(e) => handleSecurityUpdate('sessionTimeout', parseInt(e.target.value))}
              disabled={loading}
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
              <option value={0}>Never</option>
            </select>
          </div>
        </div>

        {/* Security Notifications */}
        <div className="security-section">
          <div className="section-header">
            <h3>Security Notifications</h3>
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="loginNotifications"
                checked={settings.loginNotifications}
                onChange={(e) => handleSecurityUpdate('loginNotifications', e.target.checked)}
                disabled={loading}
              />
              <label htmlFor="loginNotifications" className="switch"></label>
            </div>
          </div>
          <p className="section-description">
            Receive email notifications when your account is accessed from a new device or location.
          </p>
        </div>

        {/* Account Recovery */}
        <div className="security-section">
          <h3>Account Recovery</h3>
          <div className="recovery-options">
            <button type="button" className="recovery-btn">
              🔐 Setup Recovery Email
            </button>
            <button type="button" className="recovery-btn">
              📱 Add Recovery Phone
            </button>
            <button type="button" className="recovery-btn">
              🛡️ Generate Recovery Codes
            </button>
          </div>
          <p className="section-description">
            Set up recovery options to regain access to your account if you lose your password or authentication method.
          </p>
        </div>

        {/* Messages */}
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
  );
}
