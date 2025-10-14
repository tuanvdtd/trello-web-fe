import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Divider from '@mui/material/Divider'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Google from '@mui/icons-material/Google'
import Facebook from '@mui/icons-material/Facebook'
import GitHub from '@mui/icons-material/GitHub'
import LinkedIn from '@mui/icons-material/LinkedIn'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FIELD_REQUIRED_MESSAGE, EMAIL_RULE, EMAIL_RULE_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE, PASSWORD_CONFIRMATION_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { registerUserAPI } from '~/apis/index'
import { toast } from 'react-toastify'
import AuthLayout from '~/pages/Auth/AuthLayout'

function RegisterForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const submitRegister = (data) => {
    const { email, password } = data
    toast.promise(
      registerUserAPI({ email, password }),
      { pending: 'Registering...' }
    ).then((user) => {
      navigate(`/login?registeredEmail=${user.email}`)
    })
  }

  return (
    <AuthLayout isLogin={false}>
      <Box sx={{ width: '100%', maxWidth: 400 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            mb: 1,
            color: '#333',
            fontSize: { xs: '1.75rem', md: '2rem' }
          }}
        >
          Registration
        </Typography>

        <form onSubmit={handleSubmit(submitRegister)}>
          {/* Username Field */}

          {/* Email Field */}
          <TextField
            fullWidth
            placeholder="Email"
            variant="outlined"
            error={!!errors['email']}
            {...register('email', {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: {
                value: EMAIL_RULE,
                message: EMAIL_RULE_MESSAGE
              }
            })}
            sx={{
              mb: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#e9ecef',
                '& fieldset': { border: 'none' },
                '&:hover': { backgroundColor: '#dee2e6' },
                '&.Mui-focused': { backgroundColor: 'white', boxShadow: '0 0 0 2px #f5576c' }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box
                    component="img"
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23999' viewBox='0 0 16 16'%3E%3Cpath d='M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2H2Zm-2 9.8V4.698l5.803 3.546L0 11.801Zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8.761 8.83Z'/%3E%3C/svg%3E"
                    sx={{ width: 16, height: 16, opacity: 0.6 }}
                  />
                </InputAdornment>
              )
            }}
          />
          <FieldErrorAlert errors={errors} fieldName="email" />

          {/* Password Field */}
          <TextField
            fullWidth
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            sx={{
              mb: 1,
              mt: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#e9ecef',
                '& fieldset': { border: 'none' },
                '&:hover': { backgroundColor: '#dee2e6' },
                '&.Mui-focused': { backgroundColor: 'white', boxShadow: '0 0 0 2px #f5576c' }
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
                    sx={{ width: 16, height: 16, opacity: 0.6 }}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <FieldErrorAlert errors={errors} fieldName="password" />

          {/* Confirm Password Field */}
          <TextField
            fullWidth
            placeholder="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            variant="outlined"
            sx={{
              mb: 3,
              mt:1,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#e9ecef',
                '& fieldset': { border: 'none' },
                '&:hover': { backgroundColor: '#dee2e6' },
                '&.Mui-focused': { backgroundColor: 'white', boxShadow: '0 0 0 2px #f5576c' }
              }
            }}
            error={!!errors['password_confirmation']}
            {...register('password_confirmation', {
              validate: (value) => {
                if (value !== watch('password')) {
                  return PASSWORD_CONFIRMATION_MESSAGE
                }
                return true
              }
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box
                    component="img"
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23999' viewBox='0 0 16 16'%3E%3Cpath d='M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z'/%3E%3C/svg%3E"
                    sx={{ width: 16, height: 16, opacity: 0.6 }}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    size="small"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <FieldErrorAlert errors={errors} fieldName="password_confirmation" />

          {/* Register Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              py: 1.8,
              mb: 3,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              // background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              background: '#FF4B2B',
              '&:hover': {
                // background: 'linear-gradient(135deg, #e085f0 0%, #f04659 100%)',
                transform: 'translateY(-1px)',
                boxShadow: '0 8px 25px rgba(240, 147, 251, 0.4)'
              },
              transition: 'all 0.3s ease'
            }}
            className="interceptor-loading"
          >
            Register
          </Button>

          {/* Social Login Divider */}
          <Box sx={{ position: 'relative', mb: 3 }}>
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
                fontSize: '0.875rem'
              }}
            >
              or register with socials
            </Typography>
          </Box>

          {/* Social Login Buttons */}
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
            {[
              { icon: Google, color: '#0077b5' },
              { icon: Facebook, color: '#4267B2' },
              { icon: GitHub, color: '#333' },
              { icon: LinkedIn, color: '#0077b5' }
            // eslint-disable-next-line no-unused-vars
            ].map(({ icon: Icon, color }, index) => (
              <IconButton
                key={index}
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
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
                <Icon />
              </IconButton>
            ))}
          </Box>
        </form>
      </Box>
    </AuthLayout>
  )
}

export default RegisterForm

// import { Link, useNavigate } from 'react-router-dom'
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
// import { useForm } from 'react-hook-form'
// import { FIELD_REQUIRED_MESSAGE,
//   EMAIL_RULE, EMAIL_RULE_MESSAGE,
//   PASSWORD_RULE, PASSWORD_RULE_MESSAGE,
//   PASSWORD_CONFIRMATION_MESSAGE
// } from '~/utils/validators'
// import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
// import { registerUserAPI } from '~/apis/index'
// import { toast } from 'react-toastify'

// function RegisterForm() {
//   const { register, handleSubmit, formState: { errors }, watch } = useForm()
//   const navigate = useNavigate()

//   const submitRegister = (data) => {
//     // console.log('thanh cong', data);
//     const { email, password } = data
//     toast.promise(
//       registerUserAPI({ email, password }),
//       {
//         pending: 'Registering...'
//       }
//     ).then((user) => {
//       navigate(`/login?registeredEmail=${user.email}`)
//     })
//   }
//   // console.log(errors)
//   return (
//     // <form>
//     <form onSubmit={handleSubmit(submitRegister)}>
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
//             <Box sx={{ marginTop: '1em' }}>
//               <TextField
//                 fullWidth
//                 label="Enter Password Confirmation..."
//                 type="password"
//                 variant="outlined"
//                 error={!!errors['password_confirmation']}
//                 {...register('password_confirmation', {
//                   validate: (value) => {
//                     if (value !== watch('password')) {
//                       return PASSWORD_CONFIRMATION_MESSAGE
//                     } else return true
//                   }
//                 })}
//               />
//               <FieldErrorAlert errors={errors} fieldName="password_confirmation" />
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
//               Register
//             </Button>
//           </CardActions>
//           <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
//             <Typography>Already have an account?</Typography>
//             <Link to="/login" style={{ textDecoration: 'none' }}>
//               <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}>Log in!</Typography>
//             </Link>
//           </Box>
//         </MuiCard>
//       </Zoom>
//     </form>
//   )
// }

// export default RegisterForm