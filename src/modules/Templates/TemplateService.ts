import axios from '../../api/axios';

export interface Template {
  id: string;
  name: string;
  subject: string;
  headerText: string;
  bodyText: string;
  footerText: string;
  styles?: {
    header?: {
      backgroundColor?: string;
      textColor?: string;
      fontSize?: string;
      fontFamily?: string;
      borderRadius?: string;
      borderColor?: string;
      borderWidth?: string;
    };
    body?: {
      backgroundColor?: string;
      textColor?: string;
      fontSize?: string;
      fontFamily?: string;
    };
    otp?: {
      backgroundColor?: string;
      textColor?: string;
      fontSize?: string;
      padding?: string;
      borderRadius?: string;
      borderColor?: string;
      borderWidth?: string;
    };
    footer?: {
      backgroundColor?: string;
      textColor?: string;
      fontSize?: string;
      fontFamily?: string;
    };
  };
  createdAt: string;
}

export const getTemplates = async (): Promise<Template[]> => {
  const response = await axios.get('/api/templates');
  return response.data;
};

export const createTemplate = async (data: Omit<Template, 'id' | 'createdAt'>): Promise<Template> => {
  const response = await axios.post('/api/templates', data);
  return response.data;
};

export const updateTemplate = async (id: string, data: Partial<Omit<Template, 'id' | 'createdAt'>>): Promise<Template> => {
  const response = await axios.put(`/api/templates/${id}`, data);
  return response.data;
};

export const deleteTemplate = async (id: string): Promise<void> => {
  await axios.delete(`/api/templates/${id}`);
};
