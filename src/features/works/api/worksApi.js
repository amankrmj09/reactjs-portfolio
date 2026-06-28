import { apiClient } from '../../../lib/axios';

export const getWorks = async (page = 0, size = 9) => {
  const res = await apiClient.get(`/works?page=${page}&size=${size}`);
  return res.data;
};

export const getRecentWorks = async () => {
  const res = await apiClient.get('/works/recent');
  return res.data;
};

export const getWorkDetail = async (id) => {
  const res = await apiClient.get(`/works/${id}`);
  return res.data;
};
