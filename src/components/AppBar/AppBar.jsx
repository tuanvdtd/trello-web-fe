import { useState } from 'react'
import ToggleTheme from '~/components/ModeSelect/ToggleTheme'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Tooltip from '@mui/material/Tooltip'
import Profile from './Menu/Profile'
import { Link } from 'react-router-dom'
import Notifications from './Notifications/Notifications'
import AutoCompleteSearchBoard from './SearchBoards/AutoCompleteSearchBoard'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import SidebarContent from '~/components/SidebarContent'
import {
  Menu
} from 'lucide-react'
import { useColorScheme } from '@mui/material/styles'


function AppBar() {
  const { mode } = useColorScheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const DRAWER_WIDTH = 280
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
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
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            // Make drawer available on all screen sizes when open
            display: 'block',
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRight: '1px solid',
              borderColor: 'divider'
            }
          }}
          anchor="left"
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, mb: 1, alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: '#0984e3',
                ml: 2
              }}
            >
              <SvgIcon component={TrelloIcon} inheritViewBox />
              <Typography
                variant="span"
                sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}
              >
                Trello
              </Typography>
            </Box>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          <SidebarContent onItemClick={handleDrawerToggle} />
        </Drawer>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, ml:1 }}>
          <button
            onClick={handleDrawerToggle}
            className={` p-2 rounded-lg cursor-pointer ${
              mode === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'text-white border border-white '
            } transition-colors`}
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Tooltip title="Home">
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
            </Tooltip>
          </Link>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 15, mr: 1 }}>
          {/* <AutoCompleteSearchBoard /> */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1.5 }}>
            {/* <WorkSpace />
            <Recent />
            <Starred />
            <TemPlates /> */}
            {/* <Button
              variant="outlined"
              startIcon={<LibraryAddIcon />}
              sx={{ color: 'white', border: 'none' }}
              onClick={handleShowCreate}
            >
            Create
            </Button> */}
            <AutoCompleteSearchBoard />
          </Box>
          {/* Theme */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ToggleTheme />
            <Notifications />
            {/* <Tooltip title="Help">
              <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white' }} />
            </Tooltip> */}
            <Profile />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default AppBar
