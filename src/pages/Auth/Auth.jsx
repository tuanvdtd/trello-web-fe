import { useLocation, Navigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import BackGroundAuth2 from '~/assets/auth/bg.jpg'
import ForgotPassForm from './ForgotPassForm'
import ResetPasswordForm from './ResetPasswordForm'

function Auth() {
  const location = useLocation()
  // console.log(location)
  const isLogin = location.pathname === '/login'
  const isRegister = location.pathname === '/register'
  const isForgotPass = location.pathname === '/forgot-password'
  const isResetPassword = location.pathname === '/account/reset-password'
  // console.log('isReset', isResetPassword)
  // Nếu vẫn còn thông tin user trong storage thì không cần phải vào trang đăng nhập hay đăng ký nữa mà vào thẳng trang / luôn
  const currUser = useSelector(selectCurrentUser)
  if (currUser) {
    // If user is logged in, redirect to home page
    return <Navigate to="/boards" replace={true} />
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundImage: `url(${BackGroundAuth2})`,
        // backgroundColor: 'hsl(86, 85%, 95%)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.2)'
      }}>
      {isLogin && <LoginForm />}
      {isRegister && <RegisterForm />}
      {isForgotPass && <ForgotPassForm />}
      {isResetPassword && <ResetPasswordForm />}
    </Box>
  )
}

export default Auth