import axios from 'axios';
import { useAuthStore } from '../store/auth'; 
import { useMessage } from 'naive-ui';

const BASE_URL = 'http://localhost:5000';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = useMessage();
    message.error(error.response?.data?.message || '请求失败');
    return Promise.reject(error);
  }
);

export default instance;
