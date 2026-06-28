import { apiClient } from '../../../lib/axios';

export const getResume = async () => {
  const res = await apiClient.get('/resume');
  return res.data;
};
