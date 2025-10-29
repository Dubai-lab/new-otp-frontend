import axios from '../../api/axios';

export interface UserPlan {
  id: string;
  name: string;
  smtpLimit: number;
  templateLimit: number;
  apiKeyLimit: number;
  price: number;
  currency: string;
}

export interface UserUsage {
  smtpCount: number;
  templateCount: number;
  apiKeyCount: number;
  otpRequests: number;
}

export const getUserPlan = async (): Promise<UserPlan> => {
  const response = await axios.get('/api/plans/current');
  return response.data;
};

export const getUserUsage = async (): Promise<UserUsage> => {
  const response = await axios.get('/api/usage/current');
  return response.data;
};

export const getAvailablePlans = async (): Promise<UserPlan[]> => {
  const response = await axios.get('/api/plans');
  return response.data;
};

export const upgradePlan = async (planId: string): Promise<{ message: string }> => {
  const response = await axios.post('/api/payments/create-session', { planId });
  return response.data;
};
