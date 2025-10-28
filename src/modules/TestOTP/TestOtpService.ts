import axios from '../../api/axios';

export interface SendOtpRequest {
  recipient: string;
  templateName: string;
  apiKeyId: string;
}

export interface SendOtpResponse {
  success: boolean;
  message: string;
  otp?: string;
}

export interface VerifyOtpRequest {
  apiKeyId: string;
  otp: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
}

export const sendTestOtp = async (data: SendOtpRequest): Promise<SendOtpResponse> => {
  const response = await axios.post('/otp/send', data);
  return response.data;
};

export const verifyTestOtp = async (data: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
  const response = await axios.post('/otp/verify', data);
  return response.data;
};
