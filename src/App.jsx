import { Routes, Route, Navigate} from 'react-router-dom'
import Board from "./pages/Boards/_id.jsx";
import NotFound from '~/pages/404/NotFound'
import Auth from '~/pages/Auth/Auth.jsx';
export default function App() {
  return (
    <Routes>
      {/* Chưa làm trang home => Tạm thời redirect về trang board đầu tiên */}
      {/* Khi dùng navigate và dùng replace thì sẽ không giữ lại '/' trong history, khi ta back lại bằng mũi tên trên trình duyệt sẽ quay lại trang trước đó, không phải trang '/' nữa */}
      {/* Nếu kh dùng replace thì khi back lại sẽ quay về trang '/' rồi nó lại tự navigate về trang board đầu tiên, nghĩa là luôn luôn ở trang board, không thể back lại */}
      <Route path='/' element={<Navigate to='/boards/6890683a0cef70ebaeac757a' replace={true} />} />
      <Route path='/boards/:boardId' element={<Board />} />
      {/* Authentication */}
      <Route path='/login' element= {<Auth />} />
      <Route path='/register' element= {<Auth />} />
      <Route path='*' element= {<NotFound />} />
    </Routes>
  );
}
