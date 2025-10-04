import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import AddIcon from '@mui/icons-material/Add'
import DashboardIcon from '@mui/icons-material/Dashboard'

const EmptyBoardsState = ({ onCreateBoard, onLearnMore }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        py: 8
      }}
    >
      <Box
        sx={{
          width: { xs: 120, md: 150 },
          height: { xs: 120, md: 150 },
          borderRadius: '50%',
          bgcolor: 'primary.light',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <DashboardIcon
          sx={{
            fontSize: { xs: 60, md: 80 },
            color: 'white'
          }}
        />
      </Box>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          mb: 2,
          fontSize: { xs: '1.5rem', md: '2rem' }
        }}
      >
        No boards yet
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        sx={{
          mb: 4,
          maxWidth: 500,
          fontSize: { xs: '1rem', md: '1.25rem' },
          lineHeight: 1.6
        }}
      >
        Create your first board to get started with organizing your projects and tasks
      </Typography>

      {/* Action Buttons */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems="center"
      >
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={onCreateBoard}
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
          Create your first board
        </Button>

        <Button
          variant="outlined"
          onClick={onLearnMore}
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            borderRadius: 2,
            textTransform: 'none',
            borderColor: 'primary.main',
            color: 'primary.main',
            '&:hover': {
              borderColor: 'primary.dark',
              bgcolor: 'primary.light',
              transform: 'translateY(-1px)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          Learn more about boards
        </Button>
      </Stack>
    </Box>
  )
}

export default EmptyBoardsState