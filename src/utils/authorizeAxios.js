import axios from 'axios';
import { toast } from 'react-toastify';
import { interceptorLoadingElements } from '~/utils/formatter'
import { refreshTokenAPI } from '~/apis/index'
import { logoutUserAPI } from "~/redux/user/userSlice";

// Lệnh này để gọi hàm trong main.jsx => giúp file js này có thể gọi dispatch() của redux (bình thường chỉ có thể gọi trong jsx)
let axiosReduxStore
export const injectStore = mainStore => {
  axiosReduxStore = mainStore
}

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

let requestTokenPromise = null;

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

    if(error.response?.status === 401) {
      axiosReduxStore.dispatch(logoutUserAPI(false));
    }

    const originalRequest = error.config;

    if(error.response?.status === 410 && originalRequest) {
      if(!requestTokenPromise) {
        requestTokenPromise = refreshTokenAPI()
        .then((data) => {
          return data?.accessToken;
        })
        .catch((error) => {
          // console.error('Error refreshing token:', error);
          // Nếu refresh token không thành công, logout user
          axiosReduxStore.dispatch(logoutUserAPI(false));
          return Promise.reject(error);
        })
        .finally(() => {
          requestTokenPromise = null;
        });
      }
      return requestTokenPromise.then(() => {
        // Sau khi refresh token thành công, gửi lại request ban đầu bị lỗi do token hết hạn
        return authorizedAxiosInstance(originalRequest);
      });
    }

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