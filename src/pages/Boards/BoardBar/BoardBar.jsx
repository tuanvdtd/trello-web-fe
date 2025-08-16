import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { capitalizeFirstLetter } from "~/utils/formatter";
import BoardUserGroup from "./BoardUserGroup";

const MenuStyle = {
  color: "white",
  backgroundColor: "transparent",
  border: "none",
  paddingX: "5px",
  borderRadius: "4px",
  ".MuiSvgIcon-root": {
    color: "white",
  },
  "&:hover": {
    bgcolor: "primary.50",
  },
};

function BoardBar({ board }) {
  return (
    <>
      <Box
        px={2}
        sx={{
          height: (theme) => theme.trello.boardBarHeight,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          overflowX: "auto",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
          borderBottom: "1px solid white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Tooltip title={board?.description}>
          <Chip
            icon={<DashboardIcon />}
            label={board?.title}
            clickable
            sx={MenuStyle}
          />
          </Tooltip>

          <Chip
            icon={<VpnLockIcon />}
            label={capitalizeFirstLetter(board?.type)}
            clickable
            sx={MenuStyle}
          />

          <Chip
            icon={<AddToDriveIcon />}
            label="Add to Google Drive"
            clickable
            sx={MenuStyle}
          />

          <Chip
            icon={<BoltIcon />}
            label="Automation"
            clickable
            sx={MenuStyle}
          />
          <Chip
            icon={<FilterListIcon />}
            label="Filter"
            clickable
            sx={MenuStyle}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<PersonAddIcon />}
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": {
                borderColor: "white",
              },
            }}
          >
            Invite
          </Button>
          {/* <AvatarGroup
            max={4}
            sx={{
              "& .MuiAvatar-root": {
                width: 34,
                height: 34,
                fontSize: "16px",
                border: "none",
                cursor: "pointer",
                "&:first-of-type": { bgcolor: "#a4b0de" },
              },
            }}
          >
            <Tooltip title="Tuan">
              <Avatar
                alt="tuan"
                src="https://mui.com/static/images/avatar/1.jpg"
              />
            </Tooltip>
            <Tooltip title="Tuan">
              <Avatar
                alt="tuan"
                src="https://mui.com/static/images/avatar/2.jpg"
              />
            </Tooltip>
            <Tooltip title="Tuan">
              <Avatar
                alt="tuan"
                src="https://mui.com/static/images/avatar/2.jpg"
              />
            </Tooltip>
            <Tooltip title="Tuan">
              <Avatar alt="tuan" src="/static/images/avatar/1.jpg" />
            </Tooltip>
            <Tooltip title="Tuan">
              <Avatar alt="tuan" src="/static/images/avatar/1.jpg" />
            </Tooltip>
          </AvatarGroup> */}
          <BoardUserGroup />

        </Box>
      </Box>
    </>
  );
}

export default BoardBar;
