import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import axios from "axios";
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import{API_ROOT} from "~/utils/constants";
// import { isEmpty} from "lodash"

// Khởi tạo giá trị của một cái slice ban đầu trong Redux
const initialState = {
  currentNotifications: null
}

// Các hành động gọi api bất đồng bộ và cập nhật dữ liệu vào redux dùng Middleware createAsyncThunk đi kèm với extraReducers 
// https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchNotificationsAPI = createAsyncThunk(
  'activeNotification/fetchNotifications',
  async () => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/invitations`);
    return response.data;
  }
)

export const updateNotificationStatusAPI = createAsyncThunk(
  'activeNotification/updateNotificationStatus',
  async ({invitationId, status}) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/invitations/${invitationId}`, { status });
    return response.data;
  }
)

// Khởi tạo một slice trong kho lưu trữ Redux Store
export const activeNotificationSlice = createSlice({
  name: 'activeNotification',
  initialState,
  // reducers là nơi xử lí dữ liệu đồng bộ
  reducers: {
    updateCurrentNotifications: (state, action) => {

      // action.payload là chuẩn đặt tên nhận dữ liệu vào reducer, đặt tên biến fullBoard cho rõ nghĩa
      const full = action.payload
      
      // Xử lí dữ liệu
      // ...

      // update lại dữ liệu currentNotifications trong state
      // state.currentNotifications = action.payload
      state.currentNotifications = full
    },

    clearCurrentNotifications: (state) => {
      state.currentNotifications = null
    },

    addNotification: (state, action) => {
      const newNotification = action.payload;
      // state.currentNotifications = Array.isArray(state.currentNotifications) ? state.currentNotifications : [];
      state.currentNotifications.unshift(newNotification);
    }
  },
  // extraReducers là nơi xử lí dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchNotificationsAPI.fulfilled, (state, action) => {
      let notifications = action.payload;
      state.currentNotifications = Array.isArray(notifications) ? notifications.reverse() : [];
    })

    builder.addCase(updateNotificationStatusAPI.fulfilled, (state, action) => {
      const incomingInvitation = action.payload;
      const getInvitation = state.currentNotifications.find(notification => notification._id === incomingInvitation._id);
      getInvitation.boardInvitation = incomingInvitation.boardInvitation;
    })
  }
})

// Actions: là nơi dành cho các component bên dưới gọi bằng dispatch() tới nó để cập nhật dữ liệu thông qua reducer chạy đồng bộ
// actions là các hàm được tạo ra từ reducers bên trên, mỗi hàm tương ứng với một action
export const { updateCurrentNotifications, clearCurrentNotifications, addNotification } = activeNotificationSlice.actions

//Selectors: là nơi dành cho các component bên dưới gọi bằng hook userSelector để lấy dữ liệu từ state (trong kho Redux Store) về
export const selectCurrentNotifications = (state) => {
  return state.activeNotification.currentNotifications
}

// Export default reducer để kho lưu trữ Redux Store có thể sử dụng
// export default activeBoardSlice.reducer

export const activeNotificationReducer = activeNotificationSlice.reducer