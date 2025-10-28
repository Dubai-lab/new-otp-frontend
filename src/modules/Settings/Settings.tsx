import { useState } from 'react';
import { ProfileSettings, SecuritySettings } from './index';
import './Settings.css';

type SettingsTab = 'profile' | 'security';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  return (
    <div className="page">
      <div className="page-header">
        <h2>Settings</h2>
        <p>Manage your account settings and preferences.</p>
      </div>

      <div className="settings-container">
        <div className="settings-tabs">
          <button
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
        </div>

        <div className="settings-content">
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'security' && <SecuritySettings />}
        </div>
      </div>
    </div>
  );
}
