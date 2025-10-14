import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { keyframes } from '@emotion/react'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`

const slideUp = keyframes`
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

function AuthLayout({ children, isLogin = false }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  if (isMobile) {
    // Mobile Layout - Stack vertically
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: isLogin
            ? '#6590f8'
            : 'linear-gradient(to right, #FF4B2B, #FF416C)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isLogin
              ? 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.08"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
              : 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.08"%3E%3Cpath d="M20 20c0-11.046-8.954-20-20-20v20h20z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.4
          }
        }}
      >
        {/* Mobile Header */}
        <Box
          sx={{
            textAlign: 'center',
            color: 'white',
            pt: 8,
            pb: 4,
            px: 3,
            position: 'relative',
            zIndex: 1,
            animation: `${slideUp} 0.6s ease-out`
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              mb: 1,
              fontSize: '2.5rem'
            }}
          >
            {isLogin ? 'Welcome Back!' : 'Join Us!'}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              opacity: 0.9,
              fontSize: '1.1rem',
              fontWeight: 300
            }}
          >
            {isLogin
              ? 'Sign in to continue your journey'
              : 'Create your account to get started'
            }
          </Typography>
        </Box>

        {/* Mobile Form Container */}
        <Box
          sx={{
            flex: 1,
            position: 'relative',
            zIndex: 2
          }}
        >
          <Paper
            elevation={0}
            sx={{
              borderRadius: '32px 32px 0 0',
              minHeight: '100%',
              p: 4,
              backgroundColor: 'white',
              animation: `${slideUp} 0.8s ease-out 0.2s both`
            }}
          >
            <Box sx={{ maxWidth: 400, mx: 'auto' }}>
              {children}

              {/* Mobile Switch Link */}
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {isLogin
                    ? 'Don\'t have an account?'
                    : 'Already have an account?'
                  }
                </Typography>
                <Button
                  component={Link}
                  to={isLogin ? '/register' : '/login'}
                  variant="outlined"
                  sx={{
                    borderColor: isLogin ? '#667eea' : '#f5576c',
                    color: isLogin ? '#667eea' : '#f5576c',
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: isLogin ? 'rgba(102, 126, 234, 0.1)' : 'rgba(245, 87, 108, 0.1)',
                      borderColor: isLogin ? '#667eea' : '#f5576c',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isLogin ? 'Create Account' : 'Sign In'}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    )
  }

  // Desktop Layout (existing code)
  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}
    >
      <Paper
        elevation={20}
        sx={{
          borderRadius: 6,
          overflow: 'hidden',
          width: '100%',
          maxWidth: 900,
          minHeight: 600,
          display: 'flex',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          position: 'relative'
        }}
      >
        {/* Form Section */}
        <Box
          sx={{
            flex: 1,
            p: 6,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'white',
            order: isLogin ? 2 : 1,
            animation: `${isLogin ? slideInRight : slideIn} 0.6s ease-out`
          }}
        >
          {children}
        </Box>

        {/* Welcome Section */}
        <Box
          sx={{
            flex: 1,
            background: isLogin
              // ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              ? '#6590f8'
              : 'linear-gradient(to right, #FF4B2B, #FF416C)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            p: 4,
            textAlign: 'center',
            order: isLogin ? 1 : 2,
            animation: `${isLogin ? slideIn : slideInRight} 0.6s ease-out`,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: isLogin
                ? 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
                : 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M20 20c0-11.046-8.954-20-20-20v20h20z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              opacity: 0.3
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                fontSize: '2.5rem'
              }}
            >
              {isLogin ? 'Hello, Welcome!' : 'Welcome Back!'}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                opacity: 0.9,
                fontWeight: 300,
                fontSize: '1.1rem'
              }}
            >
              {isLogin
                ? 'Don\'t have an account?'
                : 'Already have an account?'
              }
            </Typography>
            <Button
              component={Link}
              to={isLogin ? '/register' : '/login'}
              variant="outlined"
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 1.5,
                borderRadius: 3,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: 'white',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              {isLogin ? 'Register' : 'Login'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default AuthLayout