import { createSlice } from '@reduxjs/toolkit'
// import axios from "axios";
// import authorizedAxiosInstance from '~/utils/authorizeAxios'
// import{API_ROOT} from "~/utils/constants";

// Khởi tạo giá trị của một cái slice ban đầu trong Redux
const initialState = {
  currentActiveCard: null,
  isShowActiveCardModal: false
}

// Các hành động gọi api bất đồng bộ và cập nhật dữ liệu vào redux dùng Middleware createAsyncThunk đi kèm với extraReducers 
// https://redux-toolkit.js.org/api/createAsyncThunk
// export const fetchCardDetailsAPI = createAsyncThunk(
//   'activeCard/fetchCardDetails',
//   async (cardId) => {
//     const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/cards/${cardId}`);
//     return response.data;
//   }
// )

// Khởi tạo một slice trong kho lưu trữ Redux Store
export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  // reducers là nơi xử lí dữ liệu đồng bộ
  reducers: {
    hideAndClearCurrentActiveCard: (state) => {
      state.currentActiveCard = null,
      state.isShowActiveCardModal = false
    },
    updateCurrentActiveCard: (state, action) => {

      // action.payload là chuẩn đặt tên nhận dữ liệu vào reducer, đặt tên biến fullCard cho rõ nghĩa
      const fullCard = action.payload
      // Xử lí dữ liệu
      // ...

      // update lại dữ liệu currentActiveCard trong state
      // state.currentActiveCard = action.payload
      state.currentActiveCard = fullCard
    },
    showActiveCardModal: (state) => {
      state.isShowActiveCardModal = true
    }
  }
  // extraReducers là nơi xử lí dữ liệu bất đồng bộ
  // extraReducers: (builder) => {
  // }
})

// Actions: là nơi dành cho các component bên dưới gọi bằng dispatch() tới nó để cập nhật dữ liệu thông qua reducer chạy đồng bộ
// actions là các hàm được tạo ra từ reducers bên trên, mỗi hàm tương ứng với một action
export const { updateCurrentActiveCard, hideAndClearCurrentActiveCard, showActiveCardModal } = activeCardSlice.actions

//Selectors: là nơi dành cho các component bên dưới gọi bằng hook userSelector để lấy dữ liệu từ state (trong kho Redux Store) về
export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard
}

export const selectShowActiveCardModal = (state) => {
  return state.activeCard.isShowActiveCardModal
}

// Export default reducer để kho lưu trữ Redux Store có thể sử dụng
// export default activeBoardSlice.reducer

export const activeCardReducer = activeCardSlice.reducer