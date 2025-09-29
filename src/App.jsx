import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
import NotFound from '~/pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'
import AccountVerification from '~/pages/Auth/AccountVerification'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Settings from '~/pages/Settings/Settings'
import Boards from '~/pages/Boards/index'

const ProtectedRoute = ({ user }) => {
  if (!user) {
    return <Navigate to="/login" replace={true} />
  }
  else return <Outlet /> // nếu có user trong storage thì chuyển xuống các route con trong route cha
}
export default function App() {
  const currUser = useSelector(selectCurrentUser)

  return (
    <Routes>
      {/* Chưa làm trang home => Tạm thời redirect về trang board đầu tiên */}
      {/* Khi dùng navigate và dùng replace thì sẽ không giữ lại '/' trong history, khi ta back lại bằng mũi tên trên trình duyệt sẽ quay lại trang trước đó, không phải trang '/' nữa */}
      {/* Nếu kh dùng replace thì khi back lại sẽ quay về trang '/' rồi nó lại tự navigate về trang board đầu tiên, nghĩa là luôn luôn ở trang board, không thể back lại */}
      <Route path='/' element={<Navigate to='/boards' replace={true} />} />

      {/* Route này bảo vệ các route con, nếu chưa có user thì không thể vào các route con bên trong */}
      <Route element={<ProtectedRoute user={currUser} />}>
        {/* Nếu đã login thì mới có thể truy cập vào route con này */}
        <Route path='/boards/:boardId' element={<Board />} />
        <Route path='/boards' element={<Boards />} />
        <Route path='/settings/account' element={<Settings />} />
        <Route path='/settings/security' element={<Settings />} />
      </Route>

      {/* Authentication */}
      <Route path='/login' element= {<Auth />} />
      <Route path='/register' element= {<Auth />} />
      <Route path='/account/verification' element= {<AccountVerification />} />
      <Route path='*' element= {<NotFound />} />
    </Routes>
  )
}
