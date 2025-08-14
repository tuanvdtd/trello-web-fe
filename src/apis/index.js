// import axios from "axios";
import { toast } from "react-toastify";
import{API_ROOT} from "../utils/constants";
import authorizedAxiosInstance from '~/utils/authorizeAxios'
//----------------Board API------------------------------
// đã move vào redux
// export const fetchBoardDetailsAPI = async (boardId) => {
//   const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);
//   return response.data;
// };
export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/boards/${boardId}`, updateData);
  return response.data;
};

export const moveCardToDiffColumnAPI = async (updateData) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/boards/supports/move_card`, updateData);
  return response.data;
};


//----------------Column API------------------------------

export const createNewColumnAPI = async (newColumnData) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/columns`, newColumnData);
  return response.data;
}
export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/columns/${columnId}`, updateData);
  return response.data;
};
export const deleteColumnAPI = async (columnId) => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/columns/${columnId}`);
  return response.data;
};

//----------------Card API----------------------------------

export const createNewCardAPI = async (newCardData) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/cards`, newCardData);
  return response.data;
}

//---------verificationAPI----------------------------------

export const verifyUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/verify`, data);
  toast.success("Your account has been verified successfully!", {theme:"colored"});
  return response.data;
};

export const registerUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/register`, data);
  toast.success("Your account has been registered successfully! Please check your email to verify your account!", {theme:"colored"});
  return response.data;
};

export const refreshTokenAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/users/refresh_token`);
  return response.data;
};

export const fetchBoardsAPI = async (searchPath) => {
  const res = await authorizedAxiosInstance.get(`${API_ROOT}/v1/boards${searchPath}`);
  return res.data;
}