import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  trello: {
    appBarHeight: "48px",
    boardBarHeight: "68px",
  },
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: {
          main: "#1976d2", // Example primary color
        },
      },
    },
    dark: {
      palette: {
        mode: "dark",
        primary: {
          main: "#bb86fc", // Example primary color
        },
      },
    },
  },
});

export default theme;
