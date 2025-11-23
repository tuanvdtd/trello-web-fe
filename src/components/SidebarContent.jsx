import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import ListAltIcon from '@mui/icons-material/ListAlt'
import HomeIcon from '@mui/icons-material/Home'
import { styled } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import SidebarCreateBoardModal from '~/pages/Boards/create'
import CreateBoard from '~/components/CreateBoard/CreateBoard'

const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  cursor: 'pointer',
  padding: '12px 16px',
  borderRadius: '12px',
  margin: '4px 0',
  transition: 'all 0.2s ease',
  fontSize: '0.95rem',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#2A3441' : '#f1f5f9',
    transform: 'translateX(4px)'
  },
  '&.active': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#e8f4fd',
    fontWeight: 600,
    borderLeft: `3px solid ${theme.palette.primary.main}`,
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main
    }
  }
}))

const SidebarContent = ({
  onItemClick,
  handleCreateBoardSuccess,
  isCreateModalOpen,
  onCloseCreateModal
}) => {
  const currentUser = useSelector(selectCurrentUser)
  const [showCreate, setShowCreate] = useState(false)
  const handleShowCreate = () => {
    setShowCreate(!showCreate)
  }

  return (
    <Box sx={{
      px: 3,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    }}>
      {/* User Profile Section */}
      <Box sx={{ mb: 3, p: 2, borderRadius: 2, borderColor:'#34495e', borderWidth: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar
            sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}
            alt={currentUser?.displayName || 'JD'}
            src={currentUser?.avatar || ''}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {currentUser?.displayName || 'John Doe'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {currentUser?.email || 'john.doe@example.com'}
            </Typography>
          </Box>
        </Box>
        <Chip
          label="Pro Plan"
          size="small"
          color="primary"
          sx={{ fontSize: '0.75rem' }}
        />
      </Box>
      <Divider sx={{ mb: 3 }} />

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="overline"
          sx={{
            px: 2,
            color: 'text.secondary',
            fontWeight: 600,
            letterSpacing: 1
          }}
        >
          Workspace
        </Typography>
        <Stack direction="column" spacing={0.5} sx={{ mt: 1 }}>
          <SidebarItem className="active" onClick={onItemClick}>
            <SpaceDashboardIcon fontSize="small" />
            Boards
          </SidebarItem>
          <SidebarItem onClick={handleShowCreate}>
            <ListAltIcon fontSize="small" />
            Templates
          </SidebarItem>
          <SidebarItem onClick={onItemClick}>
            <HomeIcon fontSize="small" />
            Home
          </SidebarItem>
        </Stack>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="overline"
          sx={{
            px: 2,
            color: 'text.secondary',
            fontWeight: 600,
            letterSpacing: 1
          }}
        >
          Quick Actions
        </Typography>
        <Box sx={{ mt: 1 }}>
          <SidebarCreateBoardModal
            handleCreateBoardSuccess={handleCreateBoardSuccess}
            handleOpen={isCreateModalOpen}
            onClose={onCloseCreateModal}
          />
        </Box>
      </Box>

      {/* Recent Boards */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="overline"
          sx={{
            px: 2,
            color: 'text.secondary',
            fontWeight: 600,
            letterSpacing: 1
          }}
        >
          Recent Boards
        </Typography>
        <Stack spacing={1} sx={{ mt: 1 }}>
          {['Project Alpha', 'Marketing Campaign', 'Development Tasks'].map((board, index) => (
            <Box
              key={index}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.paper',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'action.hover',
                  transform: 'translateY(-1px)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: 1,
                    bgcolor: ['#ff6b6b', '#4ecdc4', '#45b7d1'][index]
                  }}
                />
                <Typography variant="body2" fontWeight="medium">
                  {board}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
      {showCreate && (
        <CreateBoard showCreate={handleShowCreate} />
      )}
    </Box>

  )
}

export default SidebarContent