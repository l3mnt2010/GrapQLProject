import axios, { AxiosInstance } from 'axios'

export const URL: AxiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
      'Content-Type': 'application/json'
  },
});