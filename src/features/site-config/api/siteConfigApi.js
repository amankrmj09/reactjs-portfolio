import { apiClient } from '../../../lib/axios';

export const incrementStats = async () => {
  const res = await apiClient.post('/site-config/increment-visitor');
  return res.data;
};

export const getSiteConfig = async () => {
  const res = await apiClient.get('/site-config/');
  return res.data;
};
