import axios from 'axios';

const baseURL = "http://localhost:6060/api/v1";
const axiosInstance = axios.create({
  baseURL: `${baseURL}`,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;
    const responseData = error.response?.data;
    const responseStatus = error.response?.status;
    // check for token expired error
    if (responseStatus === 401 && responseData.errors[0].code === 1006) {
      if (!originalConfig._retry) {
        originalConfig._retry = true;
        try {
          await axiosInstance.post('/refresh', {}, { withCredentials: true });
          return axiosInstance(originalConfig);
        } catch (error) {
          if (window.location.pathname !== '/login') {
            console.log(`Your session has expired!`);
          }
          window.localStorage.removeItem('isLoggedIn');
          window.localStorage.removeItem('profile');
          setTimeout(() => {
            if (window.location.pathname !== '/login') {
              window.location.href = '/login';
            }
          }, 2000);
          return;
          // return Promise.reject(error);
        }
      }
      return {
        ...originalConfig,
        cancelToken: new axios.CancelToken((cancel) => cancel('Cancel repeated request')),
      };
    } else if (responseStatus === 401 && responseData.errors[0].code === 1005) {
      // send to login page
      window.localStorage.removeItem('sessionmessage');
      window.localStorage.removeItem('isLoggedIn');
      window.localStorage.removeItem('profile');
      window.location.href = '/login';
    } else if (responseStatus === 403 && responseData.errors[0].code === 1017) {
      //otp Required
      window.localStorage.setItem('otpRequired', 'true');
      window.location.href = '/';
    } else if (responseStatus === 403) {
      window.location.href = '/403';
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
