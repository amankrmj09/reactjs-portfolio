import { apiClient } from '../../../lib/axios';

export const getCertificates = async (page = 0, size = 8) => {
  const res = await apiClient.get(`/certificates?page=${page}&size=${size}`);
  return res.data;
};

export const getRecentCertificates = async () => {
  const res = await apiClient.get('/certificates/recent');
  return res.data;
};

export const getCertificateDetail = async (id) => {
  const res = await apiClient.get(`/certificates/${id}`);
  return res.data;
};
