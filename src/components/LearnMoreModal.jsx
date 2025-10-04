import { useState } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Chip from '@mui/material/Chip'
import Fade from '@mui/material/Fade'
import Slide from '@mui/material/Slide'

import CloseIcon from '@mui/icons-material/Close'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ViewColumnIcon from '@mui/icons-material/ViewColumn'
import AssignmentIcon from '@mui/icons-material/Assignment'
import GroupIcon from '@mui/icons-material/Group'
import TimelineIcon from '@mui/icons-material/Timeline'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SecurityIcon from '@mui/icons-material/Security'
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'


const LearnMoreModal = ({ open, onClose, onGetStarted }) => {
  const [activeStep, setActiveStep] = useState(0)

  const features = [
    {
      icon: <ViewColumnIcon sx={{ fontSize: 40, color: '#2196F3' }} />,
      title: 'Organize with Lists',
      description: 'Create lists to organize your workflow: To Do, In Progress, Done',
      details: 'Break down your project into manageable stages and track progress visually.'
    },
    {
      icon: <AssignmentIcon sx={{ fontSize: 40, color: '#4CAF50' }} />,
      title: 'Manage Tasks with Cards',
      description: 'Add cards to lists with descriptions, due dates, and attachments',
      details: 'Each card represents a task or idea that can be enriched with details, files, and comments.'
    },
    {
      icon: <GroupIcon sx={{ fontSize: 40, color: '#FF9800' }} />,
      title: 'Collaborate in Real-time',
      description: 'Invite team members and work together seamlessly',
      details: 'Assign tasks, mention teammates, and see updates in real-time as your team collaborates.'
    },
    {
      icon: <TimelineIcon sx={{ fontSize: 40, color: '#9C27B0' }} />,
      title: 'Track Progress',
      description: 'Monitor project progress with visual indicators and analytics',
      details: 'Get insights into team productivity and project timelines with built-in tracking tools.'
    }
  ]

  const steps = [
    {
      label: 'Create your board',
      content: 'Start by creating a new board for your project or workflow.'
    },
    {
      label: 'Add lists',
      content: 'Create lists to represent different stages of your workflow (e.g., To Do, In Progress, Done).'
    },
    {
      label: 'Create cards',
      content: 'Add cards to your lists to represent tasks, ideas, or any work items.'
    },
    {
      label: 'Invite your team',
      content: 'Collaborate by inviting team members to join your board and work together.'
    },
    {
      label: 'Start organizing',
      content: 'Move cards between lists as work progresses and watch your project come to life!'
    }
  ]

  const benefits = [
    'Visual project management',
    'Real-time collaboration',
    'Flexible workflow organization',
    'Progress tracking',
    'Team productivity insights',
    'Mobile and desktop access'
  ]

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Fade in={open}>
        <Paper
          sx={{
            width: { xs: '95vw', sm: '90vw', md: '80vw', lg: '70vw' },
            maxWidth: '1000px',
            maxHeight: '90vh',
            overflow: 'auto',
            borderRadius: 3,
            position: 'relative'
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              px: 3,
              py: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'sticky',
              top: 0,
              zIndex: 1
            }}
          >
            <IconButton
              onClick={onClose}
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                color: 'white',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              <CloseIcon />
            </IconButton>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <DashboardIcon sx={{ fontSize: 48 }} />
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  Learn About Boards
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  Your visual project management solution
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Content */}
          <Box sx={{ p: 3 }}>
            {/* Introduction */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                What are Boards?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                Boards are visual tools that help you organize projects, track progress, and collaborate with your team.
                Think of them as digital whiteboards where you can organize your work in a flexible, visual way.
              </Typography>
            </Box>

            {/* Features Grid */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
                Key Features
              </Typography>
              <Grid container spacing={3}>
                {features.map((feature, index) => (
                  <Grid item size={{ xs: 12, sm: 6 }} key={index}>
                    <Card
                      sx={{
                        height: '100%',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 4
                        }
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          {feature.icon}
                          <Typography variant="h6" fontWeight="bold">
                            {feature.title}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {feature.description}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {feature.details}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* How It Works */}
            <Grid container spacing={4} sx={{ mb: 4 }}>
              <Grid item size={{ xs: 12, md: 6 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  How It Works
                </Typography>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((step, index) => (
                    <Step key={index}>
                      <StepLabel
                        sx={{ cursor: 'pointer' }}
                        onClick={() => setActiveStep(index)}
                      >
                        <Typography variant="subtitle1" fontWeight="medium">
                          {step.label}
                        </Typography>
                      </StepLabel>
                      <StepContent>
                        <Typography variant="body2" color="text.secondary">
                          {step.content}
                        </Typography>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </Grid>

              <Grid item size={{ xs: 12, md: 6 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Why Choose Boards?
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {benefits.map((benefit, index) => (
                    <Chip
                      key={index}
                      icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
                      label={benefit}
                      variant="outlined"
                      color="primary"
                      sx={{
                        '& .MuiChip-icon': { color: 'success.main' }
                      }}
                    />
                  ))}
                </Box>

                {/* Demo Preview */}
                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    bgcolor: 'grey.50',
                    borderRadius: 2,
                    border: '2px dashed',
                    borderColor: 'grey.300',
                    textAlign: 'center'
                  }}
                >
                  <PlayArrowIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Interactive demo coming soon!
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Additional Features */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
                Advanced Features
              </Typography>
              <Grid container spacing={2}>
                <Grid item size={{ xs: 12, sm: 4 }}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <NotificationsIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                    <Typography variant="subtitle1" fontWeight="medium">
                      Smart Notifications
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Stay updated with real-time notifications
                    </Typography>
                  </Box>
                </Grid>
                <Grid item size={{ xs: 12, sm: 4 }}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <SecurityIcon sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
                    <Typography variant="subtitle1" fontWeight="medium">
                      Secure & Private
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Enterprise-grade security for your data
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <IntegrationInstructionsIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                    <Typography variant="subtitle1" fontWeight="medium">
                      Integrations
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Connect with your favorite tools
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Call to Action */}
            <Box
              sx={{
                textAlign: 'center',
                p: 4,
                bgcolor: 'primary.light',
                borderRadius: 2,
                background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(156, 39, 176, 0.1) 100%)'
              }}
            >
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Ready to Get Started?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Create your first board and start organizing your projects today!
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<DashboardIcon />}
                onClick={() => {
                  onClose()
                  onGetStarted?.()
                }}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(33, 150, 243, 0.4)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Create Your First Board
              </Button>
            </Box>
          </Box>
        </Paper>
      </Fade>
    </Modal>
  )
}

export default LearnMoreModal