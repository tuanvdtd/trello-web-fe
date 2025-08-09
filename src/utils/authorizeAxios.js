import axios from 'axios';
import { toast } from 'react-toastify';
import { interceptorLoadingElements } from '~/utils/formatter'

let authorizedAxiosInstance = axios.create();

// Set thời gian tối đa của 1 request
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10;

// withCredentials: cho phép axios tự động gửi cookie trong mỗi request lên BE phục vụ lưu JWT tokens trong httpOnly Cookie của trình duyệt
authorizedAxiosInstance.defaults.withCredentials = true;

// Cấu hình interceptor:
// Add a request interceptor: can thiệp vào giữa các request
authorizedAxiosInstance.interceptors.request.use((config) => {
    // Do something before request is sent
    // Chặn user click vào các phần tử có class 'interceptor-loading'
    interceptorLoadingElements(true);
    return config;
  }, (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
  // { synchronous: true, runWhen: () => /* This function returns true */ }
);

// Add a response interceptor
authorizedAxiosInstance.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    interceptorLoadingElements(false);
    return response;
  }, (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    interceptorLoadingElements(false);
    let errorMessage = error?.message;
    if(error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    // Hiển thị thông báo lỗi, ngoại trừ lỗi 410
    if(error.response?.status !== 410) {
      toast.error(errorMessage);
    }
    // console.error('Response error:', error);
    return Promise.reject(error);
  });

export default authorizedAxiosInstance;