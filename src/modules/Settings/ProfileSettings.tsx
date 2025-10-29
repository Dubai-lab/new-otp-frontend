import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import SettingsService, { type UpdateProfileData } from './SettingsService';
import "./Settings.css";

interface UserProfile {
  fullName: string;
  email: string;
  avatar?: string;
}

export default function ProfileSettings() {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    fullName: '',
    email: '',
    avatar: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load current user profile from auth context
    if (user) {
      setProfile({
        fullName: user.fullName || '',
        email: user.email || '',
        avatar: user.avatar || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const updateData: UpdateProfileData = {
        fullName: profile.fullName,
        avatar: profile.avatar
      };

      const updatedUser = await SettingsService.updateProfile(updateData);
      updateUser(updatedUser);
      setSuccess('Profile updated successfully!');

      // Update localStorage with the new user data
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err) {
      setError((err as Error)?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({ ...prev, avatar: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Profile Settings</h2>
        <p>Manage your account information and preferences.</p>
      </div>

      <div className="settings-container">
        <div className="profile-section">
          <div className="avatar-section">
            <div className="avatar-preview">
              {profile.avatar ? (
                <img src={profile.avatar} alt="Profile" className="avatar-image" />
              ) : (
                <div className="avatar-placeholder">
                  {profile.fullName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="avatar-controls">
              <label htmlFor="avatar-upload" className="upload-btn">
                Change Avatar
              </label>
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
              {profile.avatar && (
                <button
                  type="button"
                  className="remove-avatar-btn"
                  onClick={() => setProfile(prev => ({ ...prev, avatar: '' }))}
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={profile.fullName}
                onChange={(e) => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
                required
                disabled
              />
            </div>

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

            <button type="submit" disabled={loading} className="save-btn">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
