import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
// import axios from "axios";
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

// Khởi tạo giá trị của một cái slice ban đầu trong Redux
const initialState = {
  currentUser: null
}

// Các hành động gọi api bất đồng bộ và cập nhật dữ liệu vào redux dùng Middleware createAsyncThunk đi kèm với extraReducers
// https://redux-toolkit.js.org/api/createAsyncThunk
export const loginUserAPI = createAsyncThunk(
  'user/login',
  async (userData) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/login`, userData)
    // return response.data;
    // eslint-disable-next-line no-unused-vars
    const { accessToken, refreshToken, ...userInfo } = response.data
    return userInfo
  }
)

export const updateUserAPI = createAsyncThunk(
  'user/update',
  async (userData) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/update`, userData)
    // return response.data;
    return response.data
  }
)

export const logoutUserAPI = createAsyncThunk(
  'user/logout',
  async (showNotification = true) => {
    const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/users/logout`)
    if (showNotification) {
      toast.success('You have been logged out successfully!', { theme: 'colored' })
    }
    return response.data
  }
)
// Khởi tạo một slice trong kho lưu trữ Redux Store
export const userSlice = createSlice({
  name: 'user',
  initialState,
  // reducers là nơi xử lí dữ liệu đồng bộ
  reducers: {
  },
  // extraReducers là nơi xử lí dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      const user = action.payload
      // action.payload là dữ liệu trả về từ API (response.data)
      state.currentUser = user
    })
    builder.addCase(logoutUserAPI.fulfilled, (state) => {
      // action.payload là dữ liệu trả về từ API (response.data)
      state.currentUser = null
    })
    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      // action.payload là dữ liệu trả về từ API (response.data)
      state.currentUser = action.payload
    })
  }
})

// Actions: là nơi dành cho các component bên dưới gọi bằng dispatch() tới nó để cập nhật dữ liệu thông qua reducer chạy đồng bộ
// actions là các hàm được tạo ra từ reducers bên trên, mỗi hàm tương ứng với một action
// export const {} = userSlice.actions

//Selectors: là nơi dành cho các component bên dưới gọi bằng hook userSelector để lấy dữ liệu từ state (trong kho Redux Store) về
export const selectCurrentUser = (state) => {
  return state.user.currentUser
}

// Export default reducer để kho lưu trữ Redux Store có thể sử dụng
// export default activeBoardSlice.reducer

export const userReducer = userSlice.reducer