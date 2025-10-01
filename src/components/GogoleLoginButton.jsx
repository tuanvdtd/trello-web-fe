// components/GoogleLoginButton.jsx
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

function GoogleLoginButton({ onClick, fullWidth = true, disabled = false }) {
  return (
    <Button
      fullWidth={fullWidth}
      variant="outlined"
      size="large"
      onClick={onClick}
      disabled={disabled}
      sx={{
        textTransform: 'none',
        borderColor: '#dadce0',
        color: '#3c4043',
        backgroundColor: 'white',
        fontSize: '14px',
        fontWeight: 500,
        height: '50px',
        border: '1px solid #dadce0',
        '&:hover': {
          backgroundColor: '#f8f9fa',
          borderColor: '#d2d3d4',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        },
        '&:focus': {
          backgroundColor: '#f8f9fa',
          outline: 'none'
        },
        '&:disabled': {
          backgroundColor: '#f8f9fa',
          color: '#9aa0a6'
        }
      }}
      startIcon={
        <Box
          component="img"
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google"
          sx={{ width: 20, height: 20 }}
        />
      }
    >
      Continue with Google
    </Button>
  )
}

export default GoogleLoginButton