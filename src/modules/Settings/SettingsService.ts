import axios from '../../api/axios';

export interface UpdateProfileData {
  fullName?: string;
  avatar?: string;
}

export interface UpdateSecurityData {
  twoFactorEnabled?: boolean;
  sessionTimeout?: number;
  loginNotifications?: boolean;
  recoveryEmail?: string;
  recoveryPhone?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

class SettingsService {
  async updateProfile(data: UpdateProfileData) {
    const response = await axios.put('/api/users/profile', data);
    return response.data;
  }

  async updateSecurity(data: UpdateSecurityData) {
    const response = await axios.put('/api/users/security', data);
    return response.data;
  }

  async changePassword(data: ChangePasswordData) {
    const response = await axios.post('/api/users/change-password', data);
    return response.data;
  }

  async getCurrentUser() {
    const response = await axios.get('/api/users/me');
    return response.data;
  }
}

export default new SettingsService();
