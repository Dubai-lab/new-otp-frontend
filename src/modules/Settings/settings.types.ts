export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'user' | 'admin';
  avatar?: string;
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  loginNotifications: boolean;
  recoveryEmail?: string;
  recoveryPhone?: string;
  createdAt: string;
  updatedAt: string;
}

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
