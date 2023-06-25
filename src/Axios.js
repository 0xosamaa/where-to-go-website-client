import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8001',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
});

const axiosInstanceFormData = axios.create({
  baseURL: 'http://localhost:8001',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'multipart/form-data',
  },
});

// Function to check if the error is from axios
const isAxiosError = (error) => {
  return axios.isAxiosError(error);
};

export { axiosInstance, axiosInstanceFormData, isAxiosError };
export default axiosInstance;
