import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Switch from '@mui/material/Switch';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "~/redux/user/userSlice";
import { logoutUserAPI } from "~/redux/user/userSlice";
import { useConfirm } from 'material-ui-confirm';
import { Link } from 'react-router-dom'

export default function Profile() {

  const currUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const confirm = useConfirm();
  const handleLogout = async () => {
    const { confirmed } = await confirm({
      title: "Are you sure you want to log out?",
      confirmationText: "Log out",
      cancellationText: "Cancel",
      // confirmationButtonProps: { color:"error", variant: "contained" },
      // cancellationButtonProps: { color: "inherit", variant: "outlined" },
      // allowClose: false,

    });

    if (confirmed) {
      // Call the API to log out the user
      dispatch(logoutUserAPI())
      // toast.success("Logged out successfully!");
      return;
    }
    else {
      () => {}
    }
  }
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
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
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to="/settings/account" style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem sx={{
            '&:hover': { color: 'primary.main', '& .avatar_profile': { color: 'primary.main' } },
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
        <MenuItem sx={{
            '&:hover': { color: 'primary.main', '& .twofa_icon': { color: 'primary.main' } },
          }}>
          <ListItemIcon>
            <AdminPanelSettingsIcon fontSize="small" className="twofa_icon" />
          </ListItemIcon>
          2 Factor Authentication
          <Switch color="primary" />
        </MenuItem>
        <MenuItem onClick={handleLogout} sx = {{
          '&:hover' : { color : 'warning.dark', '& .logout_icon' : {color: 'warning.dark'} },
        }} >
          <ListItemIcon>
            <Logout fontSize="small" className="logout_icon" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
