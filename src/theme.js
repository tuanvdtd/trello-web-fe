import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  colorSchemes: {
    light: { palette: { mode: "light" } },
    dark: { palette: { mode: "dark" } },
  },
});

export default theme;
