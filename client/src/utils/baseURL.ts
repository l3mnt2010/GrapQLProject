import axios, { AxiosInstance } from 'axios'

export const URL: AxiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
      'Content-Type': 'application/json'
  },
});


// URL.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If the error status is 401 and there is no originalRequest._retry flag,
//     // it means the token has expired and we need to refresh it
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = localStorage.getItem('refreshToken');
//         const response = await axios.post('/api/refresh-token', { refreshToken });
//         const { token } = response.data;

//         localStorage.setItem('token', token);

//         // Retry the original request with the new token
//         originalRequest.headers.Authorization = `Bearer ${token}`;
//         return axios(originalRequest);
//       } catch (error) {
//         // Handle refresh token error or redirect to login
//       }
//     }

//     return Promise.reject(error);
//   }
// );