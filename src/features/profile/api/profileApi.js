import { apiClient } from '../../../lib/axios';

export const getProfile = async () => {
  const res = await apiClient.get('/profile');
  return res.data;
};
