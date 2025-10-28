import axios from '../../api/axios';

export interface SMTPConfig {
  id: string;
  name: string;
  host: string;
  port: number;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSMTPData {
  name: string;
  host: string;
  port: number;
  email: string;
  password: string;
}

export const getSMTPConfigs = async (): Promise<SMTPConfig[]> => {
  const response = await axios.get('/api/smtp');
  return response.data;
};

export const createSMTPConfig = async (data: CreateSMTPData): Promise<SMTPConfig> => {
  const response = await axios.post('/api/smtp', data);
  return response.data;
};

export const updateSMTPConfig = async (id: string, data: Partial<CreateSMTPData>): Promise<SMTPConfig> => {
  const response = await axios.put(`/api/smtp/${id}`, data);
  return response.data;
};

export const deleteSMTPConfig = async (id: string): Promise<void> => {
  await axios.delete(`/api/smtp/${id}`);
};
