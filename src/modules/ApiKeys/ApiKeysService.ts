import axios from '../../api/axios';

export interface ApiKey {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateApiKeyData {
  smtpId: string;
  label?: string;
}

export interface ApiKeyResponse {
  message: string;
  apiKey: string;
  id: string;
}

export const getApiKeys = async (): Promise<ApiKey[]> => {
  const response = await axios.get('/api/apikeys');
  return response.data;
};

export const createApiKey = async (data: CreateApiKeyData): Promise<ApiKeyResponse> => {
  try {
    const response = await axios.post('/api/apikeys', data);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as { response?: { status?: number; data?: { message?: string } } };
    if (axiosError.response?.status === 400) {
      throw new Error(axiosError.response?.data?.message || 'Failed to generate API key');
    }
    throw error;
  }
};

export const deleteApiKey = async (id: string): Promise<void> => {
  await axios.delete(`/api/apikeys/${id}`);
};
