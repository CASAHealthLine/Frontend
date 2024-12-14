import axios from 'axios';

// Tạo một instance của Axios
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true, // Tự động gửi cookie trong mọi yêu cầu
  timeout: 5000, // Timeout 5 giây cho mỗi yêu cầu
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để xử lý request trước khi gửi đi
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('access_token');
    const virtual_ip = localStorage.getItem('virtual_ip');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['X-Client-IP'] = virtual_ip;
    }
    return config;
  },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (originalRequest.url.includes('/token/refresh/')) {
        localStorage.removeItem('access_token');
        navigator('/login');
        return Promise.reject(error);
      }

      try {
        const { data } = await api.post('/token/refresh/');

        localStorage.setItem('access_token', data.access);

        originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
        return api(originalRequest);
      } catch (_error) {
        localStorage.removeItem('access_token');
        navigator('/login');
        return Promise.reject(_error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
