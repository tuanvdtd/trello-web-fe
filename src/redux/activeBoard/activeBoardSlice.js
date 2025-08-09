import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import axios from "axios";
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import{API_ROOT} from "~/utils/constants";
import { mapOrder } from "~/utils/sort";
import { generatePlaceholderCard } from '~/utils/formatter'
import { isEmpty} from "lodash"

// Khởi tạo giá trị của một cái slice ban đầu trong Redux
const initialState = {
  currentActiveBoard: null
}

// Các hành động gọi api bất đồng bộ và cập nhật dữ liệu vào redux dùng Middleware createAsyncThunk đi kèm với extraReducers 
// https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetails',
  async (boardId) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`);
    return response.data;
  }
)

// Khởi tạo một slice trong kho lưu trữ Redux Store
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  // reducers là nơi xử lí dữ liệu đồng bộ
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      
      // action.payload là chuẩn đặt tên nhận dữ liệu vào reducer, đặt tên biến fullBoard cho rõ nghĩa
      const fullBoard = action.payload
      
      // Xử lí dữ liệu
      // ...

      // update lại dữ liệu currentActiveBoard trong state
      // state.currentActiveBoard = action.payload
      state.currentActiveBoard = fullBoard
    }
  },
  // extraReducers là nơi xử lí dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      let board = action.payload;
      // Xử lí dữ liệu
      // Sắp xếp thứ tự column theo columnOrderIds từ trên root cao nhất
      board.columns =  mapOrder(
            board?.columns,
            board?.columnOrderIds,
            "_id"
          );
      board.columns.forEach((column) => {
        //Nếu column không có cards thì tạo một card giả để phục vụ kéo thả dnd
        if(isEmpty(column.cards)) {
          const card = generatePlaceholderCard(column._id);
          column.cards = [card];
          column.cardOrderIds = [card._id];
        } else {
          // Nếu column có cards thì sắp xếp thứ tự cards theo cardOrderIds ngay từ trên root
          column.cards = mapOrder(column?.cards, column?.cardOrderIds, "_id");
        }
      });
      // action.payload là dữ liệu trả về từ API (response.data)
      state.currentActiveBoard = board;
    })
  }
})

// Actions: là nơi dành cho các component bên dưới gọi bằng dispatch() tới nó để cập nhật dữ liệu thông qua reducer chạy đồng bộ
// actions là các hàm được tạo ra từ reducers bên trên, mỗi hàm tương ứng với một action
export const { updateCurrentActiveBoard } = activeBoardSlice.actions

//Selectors: là nơi dành cho các component bên dưới gọi bằng hook userSelector để lấy dữ liệu từ state (trong kho Redux Store) về
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}

// Export default reducer để kho lưu trữ Redux Store có thể sử dụng
// export default activeBoardSlice.reducer

export const activeBoardReducer = activeBoardSlice.reducer