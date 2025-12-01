import axiosClient from './axiosClient';

export interface AuthResponse {
  token: string;
  user: { id: string; username: string; email: string };
}

export interface ContentItem {
  _id: string;
  userId: string;
  promptUsed: string;
  generatedText: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export const registerUser = async (username: string, email: string, password: string): Promise<AuthResponse> => {
  const res = await axiosClient.post('/auth/register', { username, email, password });
  return res.data;
};

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const res = await axiosClient.post('/auth/login', { email, password });
  return res.data;
};

export const generateContent = async (prompt: string): Promise<{ generatedText: string }> => {
  const res = await axiosClient.post('/generate/text', { prompt });
  return res.data;
};

export const saveContent = async (promptUsed: string, generatedText: string, category: string): Promise<{ item: ContentItem }> => {
  const res = await axiosClient.post('/content/save', { promptUsed, generatedText, category });
  return res.data;
};

export const fetchHistory = async (): Promise<{ items: ContentItem[] }> => {
  const res = await axiosClient.get('/content/history');
  return res.data;
};
