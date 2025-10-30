import axios from "../../api/axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  planName?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  otp: string;
  newPassword: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

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
  plan?: {
    id: string;
    name: string;
    otpLimit: number;
    smtpLimit: number;
    templateLimit: number;
    apiKeyLimit: number;
    price: number;
    currency: string;
  };
}

class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    console.log('Attempting login with:', credentials.email);
    const response = await axios.post<AuthResponse>('/api/auth/login', credentials);
    console.log('Login response:', response.data);
    const { accessToken, user } = response.data;

    // Fetch user plan after login
    try {
      const planResponse = await axios.get('/api/plans/current');
      user.plan = planResponse.data;
    } catch (error) {
      console.error('Failed to fetch user plan:', error);
    }

    localStorage.setItem('token', accessToken);
    localStorage.setItem('user', JSON.stringify(user));
    console.log('Stored token and user in localStorage');
    return response.data;
  }

  async register(userData: RegisterRequest): Promise<{ message: string; user: User }> {
    const response = await axios.post<{ message: string; user: User }>('/api/auth/register', userData);

    // After successful registration, fetch the user's plan (should be the default Free plan)
    try {
      const planResponse = await axios.get('/api/plans/current');
      response.data.user.plan = planResponse.data;
    } catch (error) {
      console.error('Failed to fetch user plan after registration:', error);
    }

    return response.data;
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<{ message: string; success: boolean }> {
    const response = await axios.post<{ message: string; success: boolean }>('/api/auth/forgot-password', data);
    return response.data;
  }

  async resetPassword(data: ResetPasswordRequest): Promise<{ message: string; success: boolean }> {
    const response = await axios.post<{ message: string; success: boolean }>('/api/auth/reset-password', data);
    return response.data;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr || userStr === 'undefined' || userStr === '') return null;
    try {
      return JSON.parse(userStr);
    } catch (err) {
      console.error('Failed to parse stored user:', err);
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export default new AuthService();
