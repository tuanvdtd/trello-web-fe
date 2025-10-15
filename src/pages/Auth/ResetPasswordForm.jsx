// pages/Auth/ResetPasswordForm.jsx
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import InputAdornment from '@mui/material/InputAdornment'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE, PASSWORD_CONFIRMATION_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { toast } from 'react-toastify'
import AuthLayout from '~/pages/Auth/AuthLayout'
import { resetPasswordAPI } from '~/apis'

function ResetPasswordForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isTokenValid, setIsTokenValid] = useState(null) // null = loading, true = valid, false = invalid
  const [isResetSuccess, setIsResetSuccess] = useState(false)

  const token = searchParams.get('token')
  const email = searchParams.get('email')


  // Validate token khi component mount
  useEffect(() => {
    setTimeout(() => {
      if (!token || !email) {
        setIsTokenValid(false)
        return
      }
      // console.log('token: ', token)
      // console.log('email: ', email)
      // console.log('isTokenValid', isTokenValid)
      setIsTokenValid(true)
    }, 1000)

  }, [token, email])

  const handleResetPassword = async (data) => {
    const { password } = data
    try {
      await resetPasswordAPI({ email, token, password })
      toast.success('Password reset successfully!')
      setIsResetSuccess(true)
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login?message=password-reset-success')
      }, 2000)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Reset password error:', error)
      // toast.error('Failed to reset password. Please try again.')
    }
  }

  // Loading state
  if (isTokenValid === null) {
    return (
      <AuthLayout isLogin={false}>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Box
            sx={{
              width: { xs: 100, md: 80 },
              height: { xs: 100, md: 80 },
              borderRadius: '50%',
              backgroundColor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
              animation: 'pulse 1.5s ease-in-out infinite'
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                border: '3px solid #f5576c',
                borderTop: '3px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                '@keyframes spin': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' }
                }
              }}
            />
          </Box>
          <Typography variant="h6" color="text.secondary">
            Validating reset link...
          </Typography>
        </Box>
      </AuthLayout>
    )
  }

  // Invalid token
  if (isTokenValid === false) {
    return (
      <AuthLayout isLogin={false}>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Box
            sx={{
              width: { xs: 100, md: 80 },
              height: { xs: 100, md: 80 },
              borderRadius: '50%',
              backgroundColor: '#ffebee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3
            }}
          >
            <ErrorIcon sx={{ fontSize: { xs: 50, md: 40 }, color: '#f44336' }} />
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: '#333',
              fontSize: { xs: '1.5rem', md: '2rem' }
            }}
          >
            Invalid Reset Link
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 3,
              color: 'text.secondary',
              lineHeight: 1.6,
              px: { xs: 2, md: 0 }
            }}
          >
            This password reset link is invalid or has expired.
            <br />
            Please request a new password reset.
          </Typography>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            px: { xs: 1, md: 0 }
          }}>
            <Button
              component={Link}
              to="/forgot-password"
              variant="contained"
              sx={{
                py: { xs: 2, md: 1.8 },
                borderRadius: { xs: 3, md: 2 },
                textTransform: 'none',
                fontSize: { xs: '1.1rem', md: '1rem' },
                fontWeight: 600,
                background: '#FF4B2B',
                '&:hover': {
                  // background: 'linear-gradient(135deg, #e085f0 0%, #f04659 100%)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 8px 25px rgba(240, 147, 251, 0.4)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Request New Reset Link
            </Button>

            <Button
              component={Link}
              to="/login"
              variant="outlined"
              sx={{
                py: { xs: 2, md: 1.8 },
                borderRadius: { xs: 3, md: 2 },
                textTransform: 'none',
                fontSize: { xs: '1.1rem', md: '1rem' },
                fontWeight: 500,
                borderColor: '#f5576c',
                color: '#f5576c',
                '&:hover': {
                  backgroundColor: 'rgba(245, 87, 108, 0.1)',
                  borderColor: '#f5576c'
                }
              }}
            >
              Back to Login
            </Button>
          </Box>
        </Box>
      </AuthLayout>
    )
  }

  // Success state
  if (isResetSuccess) {
    return (
      <AuthLayout isLogin={false}>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Box
            sx={{
              width: { xs: 100, md: 80 },
              height: { xs: 100, md: 80 },
              borderRadius: '50%',
              backgroundColor: '#e8f5e8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3
            }}
          >
            <CheckCircleIcon sx={{ fontSize: { xs: 50, md: 40 }, color: '#4caf50' }} />
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: '#333',
              fontSize: { xs: '1.5rem', md: '2rem' }
            }}
          >
            Password Reset Successfully!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 3,
              color: 'text.secondary',
              lineHeight: 1.6,
              px: { xs: 2, md: 0 }
            }}
          >
            Your password has been reset successfully.
            <br />
            You will be redirected to login in a few seconds.
          </Typography>

          <Button
            component={Link}
            to="/login"
            variant="contained"
            sx={{
              py: { xs: 2, md: 1.8 },
              px: 4,
              borderRadius: { xs: 3, md: 2 },
              textTransform: 'none',
              fontSize: { xs: '1.1rem', md: '1rem' },
              fontWeight: 600,
              background: '#FF4B2B',
              '&:hover': {
                // background: 'linear-gradient(135deg, #e085f0 0%, #f04659 100%)',
                transform: 'translateY(-1px)',
                boxShadow: '0 8px 25px rgba(240, 147, 251, 0.4)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Continue to Login
          </Button>
        </Box>
      </AuthLayout>
    )
  }

  // Reset form
  return (
    <AuthLayout isLogin={false}>
      <Box sx={{ width: '100%', maxWidth: 400 }}>
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
          Set New Password
        </Typography>

        {/* Mobile subtitle */}
        <Typography
          variant="body1"
          sx={{
            display: { xs: 'block', md: 'none' },
            textAlign: 'center',
            color: 'text.secondary',
            mb: 4,
            fontSize: '0.95rem',
            px: 1
          }}
        >
          Create a strong password for your account
        </Typography>

        {/* Desktop subtitle */}
        <Typography
          variant="body1"
          sx={{
            display: { xs: 'none', md: 'block' },
            color: 'text.secondary',
            mb: 4,
            fontSize: '1rem',
            lineHeight: 1.6
          }}
        >
          Your new password should be different from previous used passwords.
        </Typography>

        <form onSubmit={handleSubmit(handleResetPassword)}>
          {/* New Password Field */}
          <TextField
            fullWidth
            placeholder="New Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            autoComplete="new-password"
            sx={{
              mb: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: { xs: 3, md: 2 },
                backgroundColor: '#e9ecef',
                height: { xs: 56, md: 56 },
                '& fieldset': { border: 'none' },
                '&:hover': { backgroundColor: '#dee2e6' },
                '&.Mui-focused': {
                  backgroundColor: 'white',
                  boxShadow: { xs: '0 0 0 3px #f5576c40', md: '0 0 0 2px #f5576c' }
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
                    size="small"
                    sx={{ mr: { xs: 1, md: 0 } }}
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
            placeholder="Confirm New Password"
            type={showConfirmPassword ? 'text' : 'password'}
            variant="outlined"
            autoComplete="new-password"
            sx={{
              mb: 5,
              mt: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: { xs: 3, md: 2 },
                backgroundColor: '#e9ecef',
                height: { xs: 56, md: 56 },
                '& fieldset': { border: 'none' },
                '&:hover': { backgroundColor: '#dee2e6' },
                '&.Mui-focused': {
                  backgroundColor: 'white',
                  boxShadow: { xs: '0 0 0 3px #f5576c40', md: '0 0 0 2px #f5576c' }
                }
              },
              '& .MuiInputBase-input': {
                fontSize: { xs: '16px', md: '14px' }
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
                    sx={{ width: { xs: 18, md: 16 }, height: { xs: 18, md: 16 }, opacity: 0.6 }}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    size="small"
                    sx={{ mr: { xs: 1, md: 0 } }}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <FieldErrorAlert errors={errors} fieldName="password_confirmation" />

          {/* Password Requirements */}
          {/* <Alert
            severity="info"
            sx={{
              mb: 4,
              borderRadius: { xs: 3, md: 2 },
              backgroundColor: '#e3f2fd',
              '& .MuiAlert-icon': { color: '#1976d2' }
            }}
          >
            <Typography variant="body2" sx={{ fontSize: { xs: '0.9rem', md: '0.875rem' }, mb: 1 }}>
              <strong>Password must contain:</strong>
            </Typography>
            <Typography component="ul" sx={{ fontSize: { xs: '0.85rem', md: '0.8rem' }, pl: 2, mb: 0 }}>
              <li>At least 8 characters</li>
              <li>At least one uppercase letter</li>
              <li>At least one lowercase letter</li>
              <li>At least one number</li>
              <li>At least one special character</li>
            </Typography>
          </Alert> */}

          {/* Reset Password Button */}
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
            Update Password
          </Button>

          {/* Back to Login Link */}
          {/* <Box sx={{ textAlign: 'center' }}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Typography
                variant="body2"
                sx={{
                  color: '#f5576c',
                  fontSize: { xs: '1rem', md: '0.9rem' },
                  fontWeight: 500,
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Back to Login
              </Typography>
            </Link>
          </Box> */}
        </form>
      </Box>
    </AuthLayout>
  )
}

export default ResetPasswordForm