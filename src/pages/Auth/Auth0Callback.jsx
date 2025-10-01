import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginAuth0API } from '~/redux/user/userSlice'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

export default function Auth0Callback() {
  const { user, isAuthenticated, isLoading } = useAuth0()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (!sent && isAuthenticated && user && !isLoading) {
      setSent(true)
      const payload = { email: user.email, name: user.name, picture: user.picture }
      dispatch(loginAuth0API(payload)).then(res => {
        navigate(res.error ? '/login' : '/boards', { replace: true })
      })
    }
  }, [sent, isAuthenticated, user, isLoading, dispatch, navigate])

  return (
    <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'60vh', gap:2 }}>
      <CircularProgress />
      <Typography>Signing you in…</Typography>
    </Box>
  )
}