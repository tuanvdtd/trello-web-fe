import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { useNavigate } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

function Home() {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/login')
  }

  const handleLogin = () => {
    navigate('/login')
  }

  const handleSignUp = () => {
    navigate('/register')
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{
          py: 2,
          px: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #e0e0e0',
          position: 'sticky',
          top: 0,
          bgcolor: 'white',
          zIndex: 1000
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                bgcolor: '#0079bf',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '18px'
              }}
            >
              T
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#172b4d' }}>
              Trello
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="text"
              onClick={handleLogin}
              sx={{
                color: '#0079bf',
                textTransform: 'none',
                fontSize: '16px'
              }}
            >
              Log in
            </Button>
            <Button
              variant="contained"
              onClick={handleSignUp}
              sx={{
                bgcolor: '#0079bf',
                textTransform: 'none',
                fontSize: '16px',
                borderRadius: 2,
                px: 3
              }}
            >
              Sign up
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 'bold',
                  color: '#172b4d',
                  mb: 3,
                  fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2,
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                Trello helps teams move work forward.
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: '#5e6c84',
                  mb: 4,
                  lineHeight: 1.6,
                  fontSize: { xs: '16px', sm: '18px' },
                  fontWeight: 400
                }}
              >
                Collaborate, manage projects, and reach new productivity peaks.
                From high rises to the home office, the way your team works is
                unique - accomplish it all with Trello.
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleGetStarted}
                sx={{
                  bgcolor: '#0079bf',
                  color: 'white',
                  textTransform: 'none',
                  fontSize: { xs: '16px', sm: '18px' },
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: '#005a8b'
                  }
                }}
              >
                Get started - it's free!
              </Button>
            </motion.div>
          </Grid>

          <Grid item size = {{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px'
              }}>
                <Paper
                  elevation={8}
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    height: 350,
                    borderRadius: 3,
                    overflow: 'hidden',
                    position: 'relative',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  }}
                >
                  {/* Board Content Mockup */}
                  <Box sx={{ p: 3, height: '100%', display: 'flex', gap: 2 }}>
                    <Box sx={{
                      flex: 1,
                      bgcolor: 'rgba(255,255,255,0.9)',
                      borderRadius: 2,
                      p: 2,
                      height: 'fit-content'
                    }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                        To Do
                      </Typography>
                      <Box sx={{
                        bgcolor: '#e3f2fd',
                        p: 1,
                        borderRadius: 1,
                        mb: 1,
                        height: 40
                      }} />
                      <Box sx={{
                        bgcolor: '#fff3e0',
                        p: 1,
                        borderRadius: 1,
                        mb: 1,
                        height: 40
                      }} />
                      <Box sx={{
                        bgcolor: '#f3e5f5',
                        p: 1,
                        borderRadius: 1,
                        height: 40
                      }} />
                    </Box>

                    <Box sx={{
                      flex: 1,
                      bgcolor: 'rgba(255,255,255,0.9)',
                      borderRadius: 2,
                      p: 2,
                      height: 'fit-content'
                    }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                        In Progress
                      </Typography>
                      <Box sx={{
                        bgcolor: '#e8f5e8',
                        p: 1,
                        borderRadius: 1,
                        mb: 1,
                        height: 40
                      }} />
                      <Box sx={{
                        bgcolor: '#fce4ec',
                        p: 1,
                        borderRadius: 1,
                        height: 40
                      }} />
                    </Box>

                    <Box sx={{
                      flex: 1,
                      bgcolor: 'rgba(255,255,255,0.9)',
                      borderRadius: 2,
                      p: 2,
                      height: 'fit-content'
                    }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Done
                      </Typography>
                      <Box sx={{
                        bgcolor: '#e0f2f1',
                        p: 1,
                        borderRadius: 1,
                        mb: 1,
                        height: 40
                      }} />
                      <Box sx={{
                        bgcolor: '#fff8e1',
                        p: 1,
                        borderRadius: 1,
                        mb: 1,
                        height: 40
                      }} />
                      <Box sx={{
                        bgcolor: '#f1f8e9',
                        p: 1,
                        borderRadius: 1,
                        height: 40
                      }} />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: -20,
                      right: 20,
                      width: 60,
                      height: 80,
                      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                      bgcolor: '#4285f4',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 10,
                        left: 20,
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        bgcolor: '#fdd835'
                      }
                    }}
                  />

                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: -10,
                      left: 30,
                      width: 50,
                      height: 70,
                      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                      bgcolor: '#34a853',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 8,
                        left: 15,
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        bgcolor: '#ea4335'
                      }
                    }}
                  />
                </Paper>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ bgcolor: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h3"
              align="center"
              sx={{
                fontWeight: 'bold',
                color: '#172b4d',
                mb: 6
              }}
            >
              It's more than work. It's a way of working together.
            </Typography>
          </motion.div>
          <Grid container spacing={4}>
            {[
              {
                title: 'Boards',
                description: 'Trello boards keep tasks organized and work moving forward.',
                color: '#0079bf'
              },
              {
                title: 'Lists',
                description: 'The different stages of a task. Start as simple as To Do, Doing or Done.',
                color: '#70b500'
              },
              {
                title: 'Cards',
                description: 'The building blocks of Trello. Move cards across lists to show progress.',
                color: '#ff9f1a'
              }
            ].map((feature, index) => (
              <Grid item size={{ xs: 12, md: 4 }} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Box sx={{ textAlign: 'center', p: 3 }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: feature.color,
                        mx: 'auto',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '24px',
                        fontWeight: 'bold'
                      }}
                    >
                      {feature.title[0]}
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#172b4d' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#5e6c84', lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#f8f9fa', py: 4, borderTop: '1px solid #e0e0e0' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" align="center" sx={{ color: '#5e6c84' }}>
            © 2025 Trello Clone. Built with ❤️ using React & Material-UI
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default Home