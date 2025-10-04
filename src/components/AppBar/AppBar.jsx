import { useState } from 'react'
import ToggleTheme from '~/components/ModeSelect/ToggleTheme'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import WorkSpace from './Menu/WorkSpace'
import Recent from './Menu/Recent'
import Starred from './Menu/Starred'
import TemPlates from './Menu/Templates'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profile from './Menu/Profile'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { Link } from 'react-router-dom'
import Notifications from './Notifications/Notifications'
import AutoCompleteSearchBoard from './SearchBoards/AutoCompleteSearchBoard'
import CreateBoard from '~/components/CreateBoard/CreateBoard'

function AppBar() {
  const [showCreate, setShowCreate] = useState(false)
  const handleShowCreate = () => {
    setShowCreate(!showCreate)
  }
  return (
    <>
      <Box
        px={2}
        sx={{
          height: (theme) => theme.trello.appBarHeight,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          overflowX: 'auto',
          position: 'sticky',
          zIndex: 1,
          top: 0,
          left: 0,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Link to="/boards" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Tooltip title="Board List">
              <AppsIcon sx={{ color: 'white', verticalAlign: 'middle', fontSize: '1.75rem' }} />
            </Tooltip>
          </Link>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'white'
              }}
            >
              <SvgIcon component={TrelloIcon} inheritViewBox />
              <Typography
                variant="span"
                sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}
              >
                Trello
              </Typography>
            </Box>
          </Link>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1.5 }}>
            <WorkSpace />
            <Recent />
            <Starred />
            <TemPlates />
            <Button
              variant="outlined"
              startIcon={<LibraryAddIcon />}
              sx={{ color: 'white', border: 'none' }}
              onClick={handleShowCreate}
            >
              Create
            </Button>
          </Box>
        </Box>
        {showCreate && (
          <CreateBoard showCreate={handleShowCreate} />
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AutoCompleteSearchBoard />
          {/* Theme */}
          <ToggleTheme />
          <Notifications />
          <Tooltip title="Help">
            <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white' }} />
          </Tooltip>
          <Profile />
        </Box>
      </Box>
    </>
  )
}

export default AppBar
