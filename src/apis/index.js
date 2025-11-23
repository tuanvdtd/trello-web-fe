// import axios from "axios";
import { toast } from 'react-toastify'
import { API_ROOT } from '../utils/constants'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
//----------------Board API------------------------------
// đã move vào redux
// export const fetchBoardDetailsAPI = async (boardId) => {
//   const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);
//   return response.data;
// };
export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return response.data
}

export const moveCardToDiffColumnAPI = async (updateData) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/boards/supports/move_card`, updateData)
  return response.data
}

export const createNewBoardAPI = async (newBoardData) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/boards`, newBoardData)
  toast.success('Board created successfully!', { theme: 'colored' })
  return response.data
}


//----------------Column API------------------------------

export const createNewColumnAPI = async (newColumnData) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}
export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  return response.data
}
export const deleteColumnAPI = async (columnId) => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/columns/${columnId}`)
  return response.data
}

//----------------Card API----------------------------------

export const createNewCardAPI = async (newCardData) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}

export const updateCardDetailsAPI = async (cardId, updateData) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/cards/${cardId}`, updateData)
  // toast.success("Card updated successfully!", { theme: "colored" });
  return response.data
}

//---------verificationAPI----------------------------------

export const verifyUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/verify`, data)
  toast.success('Your account has been verified successfully!', { theme:'colored' })
  return response.data
}

export const forgotPassAPI = async(data) => {
  const res = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/forgot-password`, data)
  return res.data
}

export const resetPasswordAPI = async(data) => {
  const res = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/reset-password`, data)
  // toast.success('Your password has been reset successfully!', { theme:'colored' })
  return res.data
}

export const registerUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/register`, data)
  toast.success('Your account has been registered successfully! Please check your email to verify your account!', { theme:'colored' })
  return response.data
}

export const refreshTokenAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/users/refresh_token`)
  return response.data
}

export const fetchBoardsAPI = async (searchPath) => {
  const res = await authorizedAxiosInstance.get(`${API_ROOT}/v1/boards${searchPath}`)
  return res.data
}

//------------------------------------------
export const inviteUserToBoardAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/invitations/board`, data)
  toast.success('Invitation sent successfully!', { position: 'bottom-left' })
  return response.data
}
//------------------------------------------
export const get2FA_QRCodeAPI = async () => {
  const res = await authorizedAxiosInstance.get(`${API_ROOT}/v1/users/get_2fa_qr_code`)
  return res.data
}

export const setup_2FA_API = async (otpToken) => {
  const res = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/setup_2fa`, { otpToken })
  return res.data
}

export const verify_2FA_API = async (otpToken) => {
  const res = await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/verify_2fa`, { otpToken })
  return res.data
}

//----------------Comment API----------------------------------

export const createNewCommentAPI = async (newCommentData) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/comments`, newCommentData)
  return response.data
}

export const deleteCommentAPI = async (commentId) => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/comments/${commentId}`)
  return response.data
}

export const updateCommentAPI = async (commentId, updateData) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/comments/${commentId}`, { content: updateData })
  return response.data
}

//------------------------------------------