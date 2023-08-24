import axios from 'axios';
import { CookieKeys } from '../enum';
import cookies from 'js-cookie';

const baseURL = process.env.REACT_APP_API_BASE_URI;
const axiosInstance = axios.create({
  baseURL: `${baseURL}`,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${cookies.get(CookieKeys.ACCESS_TOKEN)}`
    },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
