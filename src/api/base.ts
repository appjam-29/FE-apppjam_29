import axios from 'axios';

const api = (auth: boolean) => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });

  if (auth) {
    instance.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  return instance;
};

export { api };
