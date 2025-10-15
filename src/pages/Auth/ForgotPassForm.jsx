// ForgotPassForm.jsx - Update responsive cho mobile
import { Link } from 'react-router-dom'
import InputAdornment from '@mui/material/InputAdornment'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EmailIcon from '@mui/icons-material/Email'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FIELD_REQUIRED_MESSAGE, EMAIL_RULE, EMAIL_RULE_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { toast } from 'react-toastify'
import AuthLayout from '~/pages/Auth/AuthLayout'
import { forgotPassAPI } from '~/apis'

function ForgotPassForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')

  const handleForgotPassword = async (data) => {
    const { email } = data
    try {
      await forgotPassAPI(data)
      toast.success('Reset link sent successfully!')
      setSubmittedEmail(email)
      setIsSubmitted(true)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Forgot password error:', error)
      // toast.error('Failed to send reset link. Please try again.')
    }
  }

  if (isSubmitted) {
    return (
      <AuthLayout isLogin={false}>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          {/* Success Icon */}
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
              mb: { xs: 4, md: 3 }
            }}
          >
            <EmailIcon sx={{ fontSize: { xs: 50, md: 40 }, color: '#4caf50' }} />
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
            Check Your Email
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 3,
              color: 'text.secondary',
              lineHeight: 1.6,
              px: { xs: 2, md: 0 },
              fontSize: { xs: '1rem', md: '1rem' }
            }}
          >
            We've sent a password reset link to
            <br />
            <strong>{submittedEmail}</strong>
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mb: { xs: 5, md: 4 },
              color: 'text.secondary',
              fontSize: { xs: '0.95rem', md: '0.9rem' },
              px: { xs: 1, md: 0 }
            }}
          >
            Didn't receive the email? Check your spam folder or try again.
          </Typography>

          {/* Action Buttons */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 3, md: 2 },
            px: { xs: 1, md: 0 }
          }}>
            <Button
              onClick={() => setIsSubmitted(false)}
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
              Try Another Email
            </Button>

            <Button
              component={Link}
              to="/login"
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              sx={{
                display: { xs: 'none', md: 'flex' },
                py: { xs: 2, md: 1.8 },
                borderRadius: { xs: 3, md: 2 },
                textTransform: 'none',
                fontSize: { xs: '1.1rem', md: '1rem' },
                fontWeight: 500,
                borderColor: '#f5576c',
                color: '#f5576c',
                '&:hover': {
                  backgroundColor: 'rgba(245, 87, 108, 0.1)',
                  borderColor: '#f5576c',
                  transform: 'translateY(-1px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Back to Login
            </Button>
          </Box>
        </Box>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout isLogin={false}>
      <Box sx={{ width: '100%', maxWidth: 400 }}>
        {/* Back Button */}
        <Button
          component={Link}
          to="/login"
          startIcon={<ArrowBackIcon />}
          sx={{
            mb: { xs: 2, md: 3 },
            color: 'text.secondary',
            textTransform: 'none',
            fontSize: { xs: '0.95rem', md: '0.9rem' },
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.04)',
              color: '#f5576c'
            }
          }}
        >
          Back to Login
        </Button>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            mb: { xs: 2, md: 1 },
            color: '#333',
            fontSize: { xs: '1.5rem', md: '2rem' },
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          Forgot Password?
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
          Enter your email to reset your password
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
          No worries! Enter your email address and we'll send you a link to reset your password.
        </Typography>

        <form onSubmit={handleSubmit(handleForgotPassword)}>
          {/* Email Field - Mobile responsive */}
          <TextField
            fullWidth
            placeholder="Enter your email address"
            variant="outlined"
            autoComplete="email"
            autoFocus
            sx={{
              mb: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: { xs: 3, md: 2 },
                backgroundColor: '#e9ecef',
                height: { xs: 56, md: 56 }, // Consistent height
                '& fieldset': { border: 'none' },
                '&:hover': { backgroundColor: '#dee2e6' },
                '&.Mui-focused': {
                  backgroundColor: 'white',
                  boxShadow: { xs: '0 0 0 3px #f5576c40', md: '0 0 0 2px #f5576c' }
                }
              },
              '& .MuiInputBase-input': {
                fontSize: { xs: '16px', md: '14px' } // Prevent iOS zoom
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
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23999' viewBox='0 0 16 16'%3E%3Cpath d='M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2H2Zm-2 9.8V4.698l5.803 3.546L0 11.801Zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8.761 8.83Z'/%3E%3C/svg%3E"
                    sx={{ width: { xs: 18, md: 16 }, height: { xs: 18, md: 16 }, opacity: 0.6 }}
                  />
                </InputAdornment>
              )
            }}
          />
          <FieldErrorAlert errors={errors} fieldName="email" />

          {/* Info Alert - Mobile responsive */}
          <Alert
            severity="info"
            sx={{
              mb: { xs: 4, md: 4 },
              borderRadius: { xs: 3, md: 2 },
              backgroundColor: '#e3f2fd',
              '& .MuiAlert-icon': { color: '#1976d2' },
              '& .MuiAlert-message': {
                fontSize: { xs: '0.9rem', md: '0.875rem' }
              }
            }}
          >
            <Typography variant="body2" sx={{ fontSize: { xs: '0.9rem', md: '0.875rem' } }}>
              We'll send you a secure link to reset your password. The link will expire in 1 hour for security.
            </Typography>
          </Alert>

          {/* Send Reset Link Button - Mobile responsive */}
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
            Send Reset Link
          </Button>

          {/* Remember Password Link - Mobile responsive */}
          <Box sx={{ textAlign: 'center', display: { xs: 'none', md: 'block' } }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 1,
                fontSize: { xs: '0.95rem', md: '0.875rem' }
              }}
            >
              Remember your password?
            </Typography>
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
          </Box>
        </form>
      </Box>
    </AuthLayout>
  )
}

export default ForgotPassForm