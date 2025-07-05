import ToggleTheme from "../../components/ModeSelect/ToggleTheme";
import Box from "@mui/material/Box";

function AppBar() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "primary.light",
          height: (theme) => theme.trello.appBarHeight,
          width: "100%",
          display: "flex",
          alignItems: "center",
          paddingY: 1,
        }}
      >
        <ToggleTheme />
      </Box>
    </>
  );
}

export default AppBar;
