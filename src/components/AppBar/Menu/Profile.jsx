import { useState, Fragment } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import Switch from '@mui/material/Switch'
import Chip from '@mui/material/Chip'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser, updateCurrentUser } from '~/redux/user/userSlice'
import { logoutUserAPI } from '~/redux/user/userSlice'
import { useConfirm } from 'material-ui-confirm'
import { Link } from 'react-router-dom'
import Setup2FA from '~/components/2FA/Setup2FA'
import Require2FA from '~/components/2FA/Require2FA'


export default function Profile() {

  const currUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const [openSetup2FA, setOpenSetup2FA] = useState(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const [checked, setChecked] = useState(currUser?.require_2fa || false)

  const handleChange = async (event) => {
    const isChecked = event.target.checked

    if (isChecked) {
      setChecked(true)
      setOpenSetup2FA(true)
      handleClose()
    } else {
      // Confirm trước khi disable 2FA
      const { confirmed } = await confirm({
        title: 'Disable 2FA?',
        description: 'Are you sure you want to disable two-factor authentication?',
        confirmationText: 'Disable',
        cancellationText: 'Cancel'
      })

      if (confirmed) {
        // Call API to disable 2FA
        // dispatch(disable2FAAPI())
        setChecked(false)
      }
    }
  }

  const confirm = useConfirm()
  const handleLogout = async () => {
    const { confirmed } = await confirm({
      title: 'Are you sure you want to log out?',
      confirmationText: 'Log out',
      cancellationText: 'Cancel'
      // confirmationButtonProps: { color:"error", variant: "contained" },
      // cancellationButtonProps: { color: "inherit", variant: "outlined" },
      // allowClose: false,

    })

    if (confirmed) {
      // Call the API to log out the user
      dispatch(logoutUserAPI(false))
      // toast.success("Logged out successfully!");
      return
    }
    else {
      () => {}
    }
  }
  const updateSuccessSetup2FA = (updatedUser) => {
    dispatch(updateCurrentUser(updatedUser))
    setOpenSetup2FA(false)
  }

  const updateSuccessVerify2FA = (updatedUser) => {
    dispatch(updateCurrentUser(updatedUser))
  }
  // Hàm này dùng để đóng modal Setup2FA khi người dùng hủy bỏ việc thiết lập 2FA
  const handleCloseSetup2FA = () => {
    setOpenSetup2FA(false)
    setChecked(currUser?.require_2fa || false) // Reset switch về trạng thái ban đầu
  }

  return (
    <Fragment>
      <Setup2FA
        isOpen={openSetup2FA}
        toggleOpen={handleCloseSetup2FA}
        updateSuccessSetup2FA={updateSuccessSetup2FA}
      />

      {/* Modal yêu cầu xác thực 2FA */}
      {/* Với điều kiện user đã bật tính năng 2FA, và user chưa xác thực 2FA ngay sau khi đăng nhập ở lần tiếp theo */}
      {currUser.require_2fa && !currUser.is_2fa_verified &&
      <Require2FA updateSuccessVerify2FA={updateSuccessVerify2FA} />
      }

      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 34, height: 34 }} src={currUser?.avatar} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
              }
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link to="/settings/account" style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem sx={{
            '&:hover': { color: 'primary.main', '& .avatar_profile': { color: 'primary.main' } }
          }} >
            <Avatar src={currUser?.avatar} className="avatar_profile" /> Profile
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem >
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <Link to="/settings/account" style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
        </Link>
        { currUser?.authProvider === 'local' &&
        <MenuItem sx={{
          '&:hover': { color: 'primary.main', '& .twofa_icon': { color: 'primary.main' } }
        }}>
          <ListItemIcon>
            <AdminPanelSettingsIcon fontSize="small" className="twofa_icon" />
          </ListItemIcon>
          2 Factor Authentication
          <Switch color="primary" checked={checked}
            onChange={handleChange}
            disabled={currUser?.require_2fa}
            slotProps={{ input: { 'aria-label': 'controlled' } }} />
        </MenuItem>
        }
        <MenuItem onClick={handleLogout} sx = {{
          '&:hover' : { color : 'warning.dark', '& .logout_icon' : { color: 'warning.dark' } }
        }} >
          <ListItemIcon>
            <Logout fontSize="small" className="logout_icon" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  )
}
