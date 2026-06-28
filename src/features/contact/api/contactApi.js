import { apiClient } from '../../../lib/axios';

export const submitContactForm = async (data) => {
  const res = await apiClient.post('/contact', data);
  return res.data;
};
