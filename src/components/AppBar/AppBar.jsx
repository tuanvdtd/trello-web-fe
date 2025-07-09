import { useState } from "react";
import ToggleTheme from "~/components/ModeSelect/ToggleTheme";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppsIcon from "@mui/icons-material/Apps";
import { ReactComponent as TrelloIcon } from "~/assets/trello.svg";
import SvgIcon from "@mui/material/SvgIcon";
import WorkSpace from "./Menu/WorkSpace";
import Recent from "./Menu/Recent";
import Starred from "./Menu/Starred";
import TemPlates from "./Menu/Templates";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Tooltip from "@mui/material/Tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Profile from "./Menu/Profile";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

function AppBar() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      <Box
        px={2}
        sx={{
          height: (theme) => theme.trello.appBarHeight,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          overflowX: "auto",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#2c3e50" : "#1565c0",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <AppsIcon sx={{ color: "white" }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "white",
            }}
          >
            <SvgIcon component={TrelloIcon} inheritViewBox />
            <Typography
              variant="span"
              sx={{ fontSize: "1.25rem", fontWeight: "bold" }}
            >
              Trello
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1.5 }}>
            <WorkSpace />
            <Recent />
            <Starred />
            <TemPlates />
            <Button
              variant="outlined"
              startIcon={<LibraryAddIcon />}
              sx={{ color: "white", border: "none" }}
            >
              Create
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            id="outlined-search"
            label="Search ..."
            type="text"
            size="small"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "white" }} />
                  </InputAdornment>
                ),
                endAdornment: searchValue && (
                  <CloseIcon
                    fontSize="small"
                    onClick={() => setSearchValue("")}
                    sx={{
                      color: "white",
                      cursor: "pointer",
                    }}
                  />
                ),
              },
            }}
            sx={{
              minWidth: "120px",
              maxWidth: "180px",
              "& label": {
                color: "white",
              },
              "& input": { color: "white" },
              "& label.Mui-focused": { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            }}
          />
          <ToggleTheme />
          <Tooltip title="Notifications">
            <Badge color="warning" variant="dot" sx={{ cursor: "pointer" }}>
              <NotificationsNoneIcon sx={{ color: "white" }} />
            </Badge>
          </Tooltip>
          <Tooltip title="Help">
            <HelpOutlineIcon sx={{ cursor: "pointer", color: "white" }} />
          </Tooltip>
          <Profile />
        </Box>
      </Box>
    </>
  );
}

export default AppBar;
