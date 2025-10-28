import axios from '../../api/axios';

export interface LogStatus {
  status: 'pending' | 'sent' | 'failed' | 'verified';
  timestamp: string;
  error?: string;
}

export interface SendLog {
  id: string;
  recipient: string;
  provider: string;
  type: 'otp' | 'email';
  subject: string;
  otp?: string;
  statuses: LogStatus[];
  currentStatus: 'pending' | 'sent' | 'failed' | 'verified';
  createdAt: string;
  updatedAt: string;
}

export interface LogStats {
  smtpCount: number;
  templateCount: number;
  apiKeyCount: number;
  sentToday: number;
  failedCount: number;
}

export const getLogs = async (): Promise<SendLog[]> => {
  const response = await axios.get('/api/logs');
  return response.data;
};

export const getLogStats = async (): Promise<LogStats> => {
  const response = await axios.get('/api/logs/stats');
  return response.data;
};

export const getLogById = async (id: string): Promise<SendLog> => {
  const response = await axios.get(`/api/logs/${id}`);
  return response.data;
};
