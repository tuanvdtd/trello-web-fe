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

function AppBar() {
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
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <AppsIcon sx={{ color: "primary.main" }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "primary.main",
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
            <Button variant="outlined" startIcon={<LibraryAddIcon />}>
              Create
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            id="outlined-search"
            label="Search ..."
            type="search"
            size="small"
            sx={{ minWidth: "120px" }}
          />
          <ToggleTheme />
          <Tooltip title="Notifications">
            <Badge color="secondary" variant="dot" sx={{ cursor: "pointer" }}>
              <NotificationsNoneIcon sx={{ color: "primary.main" }} />
            </Badge>
          </Tooltip>
          <Tooltip title="Help">
            <HelpOutlineIcon
              sx={{ cursor: "pointer", color: "primary.main" }}
            />
          </Tooltip>
          <Profile />
        </Box>
      </Box>
    </>
  );
}

export default AppBar;
