import axios from 'axios';

// Vite env variables use import.meta.env
const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8080';
const API_BASE = `${baseUrl}/api`;

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});
