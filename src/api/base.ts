import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const setAuthToken = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const removeAuthToken = () => {
  delete api.defaults.headers.common.Authorization;
};

export { api, removeAuthToken, setAuthToken };
