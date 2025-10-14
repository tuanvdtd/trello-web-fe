import { Link } from 'react-router-dom'
import InputAdornment from '@mui/material/InputAdornment'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Google from '@mui/icons-material/Google'
import GitHub from '@mui/icons-material/GitHub'
import Facebook from '@mui/icons-material/Facebook'
import LinkedIn from '@mui/icons-material/LinkedIn'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FIELD_REQUIRED_MESSAGE, EMAIL_RULE, EMAIL_RULE_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUserAPI } from '~/redux/user/userSlice'
import { toast } from 'react-toastify'
import { useAuth0 } from '@auth0/auth0-react'
import AuthLayout from '~/pages/Auth/AuthLayout'

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [showPassword, setShowPassword] = useState(false)
  let [searchParams] = useSearchParams()
  const registeredEmail = searchParams.get('registeredEmail')
  const verifiedEmail = searchParams.get('verifiedEmail')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loginWithRedirect } = useAuth0()

  const handleGoogleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        prompt: 'select_account',
        connection: 'google-oauth2'
      }
    })
  }

  const submitLogIn = (data) => {
    const { email, password } = data
    toast.promise(
      dispatch(loginUserAPI({ email, password })),
      { pending: 'Logging in...' }
    ).then((res) => {
      if (!res.error) {
        navigate('/boards', { replace: true })
      }
    })
  }
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <AuthLayout isLogin={true}>
      <Box sx={{ width: '100%' }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            mb: { xs: 3, md: 1 },
            color: '#333',
            fontSize: { xs: '1.5rem', md: '2rem' },
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          Login
        </Typography>

        {/* Mobile subtitle */}
        <Typography
          variant="body1"
          sx={{
            display: { xs: 'block', md: 'none' },
            textAlign: 'center',
            color: 'text.secondary',
            mb: 4,
            fontSize: '0.95rem'
          }}
        >
          Enter your credentials to access your account
        </Typography>

        {/* Alerts - responsive */}
        {verifiedEmail && (
          <Alert
            severity="success"
            sx={{
              mb: 2,
              borderRadius: 2,
              fontSize: { xs: '0.875rem', md: '1rem' }
            }}
          >
            Your email <strong>{verifiedEmail}</strong> has been verified!
          </Alert>
        )}
        {registeredEmail && (
          <Alert
            severity="info"
            sx={{
              mb: 2,
              borderRadius: 2,
              fontSize: { xs: '0.875rem', md: '1rem' }
            }}
          >
            Please check <strong>{registeredEmail}</strong> to verify your account!
          </Alert>
        )}

        <form onSubmit={handleSubmit(submitLogIn)}>
          {/* Email Field - Mobile optimized */}
          <TextField
            fullWidth
            placeholder="Email"
            variant="outlined"
            autoComplete="email"
            sx={{
              mb: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: { xs: 3, md: 2 },
                backgroundColor: '#e9ecef',
                height: { xs: 56, md: 48 },
                '& fieldset': { border: 'none' },
                '&:hover': { backgroundColor: '#dee2e6' },
                '&.Mui-focused': {
                  backgroundColor: 'white',
                  boxShadow: { xs: '0 0 0 3px #667eea40', md: '0 0 0 2px #667eea' }
                }
              },
              '& .MuiInputBase-input': {
                fontSize: { xs: '16px', md: '14px' }
              }
            }}
            error={!!errors['email']}
            {...register('email', {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: { value: EMAIL_RULE, message: EMAIL_RULE_MESSAGE }
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box
                    component="img"
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23999' viewBox='0 0 16 16'%3E%3Cpath d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'/%3E%3C/svg%3E"
                    sx={{ width: { xs: 18, md: 16 }, height: { xs: 18, md: 16 }, opacity: 0.6 }}
                  />
                </InputAdornment>
              )
            }}
          />
          <FieldErrorAlert errors={errors} fieldName="email" />

          {/* Password Field - Mobile optimized */}
          <TextField
            fullWidth
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            autoComplete="current-password"
            sx={{
              mb: 1,
              mt:1,
              '& .MuiOutlinedInput-root': {
                borderRadius: { xs: 3, md: 2 },
                backgroundColor: '#e9ecef',
                height: { xs: 56, md: 48 },
                '& fieldset': { border: 'none' },
                '&:hover': { backgroundColor: '#dee2e6' },
                '&.Mui-focused': {
                  backgroundColor: 'white',
                  boxShadow: { xs: '0 0 0 3px #667eea40', md: '0 0 0 2px #667eea' }
                }
              },
              '& .MuiInputBase-input': {
                fontSize: { xs: '16px', md: '14px' }
              }
            }}
            error={!!errors['password']}
            {...register('password', {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: { value: PASSWORD_RULE, message: PASSWORD_RULE_MESSAGE }
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box
                    component="img"
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23999' viewBox='0 0 16 16'%3E%3Cpath d='M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z'/%3E%3C/svg%3E"
                    sx={{ width: { xs: 18, md: 16 }, height: { xs: 18, md: 16 }, opacity: 0.6 }}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size={isMobile ? 'medium' : 'small'}
                    sx={{ mr: { xs: 1, md: 0 } }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <FieldErrorAlert errors={errors} fieldName="password" />

          {/* Forgot Password - Mobile centered */}
          <Box sx={{
            textAlign: { xs: 'center', md: 'right' },
            mb: { xs: 4, md: 3 }
          }}>
            <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
              <Typography
                variant="body2"
                sx={{
                  display: 'inline-block',
                  color: '#667eea',
                  fontSize: { xs: '0.9rem', md: '0.875rem' },
                  fontWeight: { xs: 500, md: 400 }
                }}
              >
                Forgot Password?
              </Typography>
            </Link>
          </Box>

          {/* Login Button - Mobile optimized */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              py: { xs: 2, md: 1.8 },
              mb: { xs: 4, md: 3 },
              borderRadius: { xs: 3, md: 2 },
              textTransform: 'none',
              fontSize: { xs: '1.1rem', md: '1rem' },
              fontWeight: 600,
              // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              background: '#6590f8',
              '&:hover': {
                // background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                transform: 'translateY(-1px)',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
              },
              transition: 'all 0.3s ease'
            }}
            className="interceptor-loading"
          >
            Login
          </Button>

          {/* Social Login Divider - Mobile friendly */}
          <Box sx={{ position: 'relative', mb: { xs: 4, md: 3 } }}>
            <Divider />
            <Typography
              variant="body2"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                px: 2,
                color: 'text.secondary',
                fontSize: { xs: '0.9rem', md: '0.875rem' }
              }}
            >
              or sign with socials
            </Typography>
          </Box>

          {/* Social Login Buttons - Mobile bigger */}
          <Box sx={{
            display: 'flex',
            gap: { xs: 2, md: 1 },
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {[
              { icon: Google, color: '#0077b5', onClick: handleGoogleLogin },
              { icon: Facebook, color: '#4267B2' },
              { icon: GitHub, color: '#333' },
              { icon: LinkedIn, color: '#0077b5' }
            // eslint-disable-next-line no-unused-vars
            ].map(({ icon: Icon, color, onClick }, index) => (
              <IconButton
                key={index}
                onClick={onClick}
                sx={{
                  width: { xs: 56, md: 48 },
                  height: { xs: 56, md: 48 },
                  borderRadius: { xs: 3, md: 2 },
                  border: '1px solid #e0e0e0',
                  color: color,
                  '&:hover': {
                    backgroundColor: `${color}15`,
                    borderColor: color,
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <Icon sx={{ fontSize: { xs: 24, md: 20 } }} />
              </IconButton>
            ))}
          </Box>
        </form>
      </Box>
    </AuthLayout>
  )
}

export default LoginForm


// import { Link } from 'react-router-dom'
// import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'
// import Avatar from '@mui/material/Avatar'
// import LockIcon from '@mui/icons-material/Lock'
// import Typography from '@mui/material/Typography'
// // import { Card as MuiCard } from '@mui/material'
// import MuiCard from '@mui/material/Card'
// import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
// import CardActions from '@mui/material/CardActions'
// import TextField from '@mui/material/TextField'
// import Zoom from '@mui/material/Zoom'
// import Alert from '@mui/material/Alert'
// import Divider from '@mui/material/Divider'
// import { useForm } from 'react-hook-form'
// import { FIELD_REQUIRED_MESSAGE,
//   EMAIL_RULE, EMAIL_RULE_MESSAGE,
//   PASSWORD_RULE, PASSWORD_RULE_MESSAGE,
//   PASSWORD_CONFIRMATION_MESSAGE
// } from '~/utils/validators'
// import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
// import { useSearchParams, useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { loginUserAPI } from '~/redux/user/userSlice'
// import { toast } from 'react-toastify'
// import { useAuth0 } from '@auth0/auth0-react'


// function LoginForm() {
//   const { register, handleSubmit, formState: { errors } } = useForm()
//   let [searchParams] = useSearchParams()
//   const registeredEmail = searchParams.get('registeredEmail')
//   const verifiedEmail = searchParams.get('verifiedEmail')

//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const { loginWithRedirect } = useAuth0()

//   const handleGoogleLogin = () => {
//     // Redirect to Google OAuth
//     loginWithRedirect({ authorizationParams: {
//       prompt: 'select_account',
//       connection: 'google-oauth2'
//       // Force Google hiện account picker
//     } }) // ép dùng Google SSO
//   }


//   const submitLogIn = (data) => {
//     const { email, password } = data
//     toast.promise(
//       dispatch(loginUserAPI({ email, password })),
//       {
//         pending: 'Logging in...'
//       }
//     ).then((res) => {
//       // console.log(res)
//       if (!res.error) {
//         navigate('/boards', { replace: true })
//       }
//     })
//   }

//   // const handleGoogleLogin = () => {
//   //   // Redirect to Google OAuth
//   //   loginWithRedirect({ authorizationParams: {
//   //     prompt: 'select_account',
//   //     connection: 'google-oauth2'
//   //     // Force Google hiện account picker
//   //   } }) // ép dùng Google SSO
//   // }


//   return (
//     // <form>
//     <form onSubmit={handleSubmit(submitLogIn)}>
//       <Zoom in={true} style={{ transitionDelay: '200ms' }}>
//         <MuiCard sx={{ minWidth: 380, maxWidth: 380, marginTop: '6em' }}>
//           <Box sx={{
//             margin: '1em',
//             display: 'flex',
//             justifyContent: 'center',
//             gap: 1
//           }}>
//             <Avatar sx={{ bgcolor: 'primary.main' }}><LockIcon /></Avatar>
//             <Avatar sx={{ bgcolor: 'primary.main' }}><TrelloIcon /></Avatar>
//           </Box>
//           <Box sx={{ marginTop: '1em', display: 'flex', justifyContent: 'center', color: theme => theme.palette.grey[500] }}>
//             Trello Web
//           </Box>
//           <Box sx={{ marginTop: '1em', display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '0 1em' }}>
//             {verifiedEmail &&
//               <Alert severity="success" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
//                 Your email&nbsp;
//                 <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{verifiedEmail}</Typography>
//                 &nbsp;has been verified.<br />Now you can login to enjoy our services! Have a good day!
//               </Alert>
//             }
//             {registeredEmail &&
//               <Alert severity="info" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
//                 An email has been sent to&nbsp;
//                 <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{registeredEmail}</Typography>
//                 <br />Please check and verify your account before logging in!
//               </Alert>
//             }
//           </Box>
//           <Box sx={{ padding: '1em 1em 1em 1em' }}>
//             <Button
//               fullWidth
//               variant="outlined"
//               size="large"
//               onClick={handleGoogleLogin}
//               sx={{
//                 textTransform: 'none',
//                 borderColor: '#dadce0',
//                 color: '#3c4043',
//                 backgroundColor: 'white',
//                 fontSize: '14px',
//                 fontWeight: 500,
//                 height: '50px',
//                 '&:hover': {
//                   backgroundColor: '#f8f9fa',
//                   borderColor: '#dadce0',
//                   boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
//                 },
//                 '&:focus': {
//                   backgroundColor: '#f8f9fa'
//                 }
//               }}
//               startIcon={
//                 <Box
//                   component="img"
//                   src="https://developers.google.com/identity/images/g-logo.png"
//                   alt="Google"
//                   sx={{ width: 20, height: 20 }}
//                 />
//               }
//             >
//               Continue with Google
//             </Button>
//           </Box>
//           {/* Divider */}
//           <Box sx={{ padding: '1em' }}>
//             <Divider sx={{ position: 'relative' }}>
//               <Typography
//                 variant="body2"
//                 sx={{
//                   position: 'absolute',
//                   top: '50%',
//                   left: '50%',
//                   transform: 'translate(-50%, -50%)',
//                   backgroundColor: 'white',
//                   padding: '0 16px',
//                   color: 'text.secondary',
//                   fontSize: '12px'
//                 }}
//               >
//                 OR
//               </Typography>
//             </Divider>
//           </Box>
//           <Box sx={{ padding: '0 1em 1em 1em' }}>
//             <Box sx={{ marginTop: '1em' }}>
//               <TextField
//                 // autoComplete="nope"
//                 autoFocus
//                 fullWidth
//                 label="Enter Email..."
//                 type="text"
//                 variant="outlined"
//                 error={!!errors['email']}
//                 {...register('email', {
//                   required: FIELD_REQUIRED_MESSAGE,
//                   pattern: {
//                     value: EMAIL_RULE,
//                     message: EMAIL_RULE_MESSAGE
//                   }
//                 })}
//               />
//               <FieldErrorAlert errors={errors} fieldName="email" />
//             </Box>
//             <Box sx={{ marginTop: '1em' }}>
//               <TextField
//                 fullWidth
//                 label="Enter Password..."
//                 type="password"
//                 variant="outlined"
//                 error={!!errors['password']}
//                 {...register('password', {
//                   required: FIELD_REQUIRED_MESSAGE,
//                   pattern: {
//                     value: PASSWORD_RULE,
//                     message: PASSWORD_RULE_MESSAGE
//                   }
//                 })}
//               />
//               <FieldErrorAlert errors={errors} fieldName="password" />
//             </Box>
//           </Box>
//           <CardActions sx={{ padding: '0 1em 1em 1em' }}>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               size="large"
//               fullWidth
//               className="interceptor-loading"
//             >
//               Login
//             </Button>
//           </CardActions>
//           <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
//             <Typography>New to Trello MERN Stack?</Typography>
//             <Link to="/register" style={{ textDecoration: 'none' }}>
//               <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}>Create account!</Typography>
//             </Link>
//           </Box>
//         </MuiCard>
//       </Zoom>
//     </form>
//   )
// }

// export default LoginForm
