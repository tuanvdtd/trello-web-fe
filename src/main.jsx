import * as React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import theme from "./theme";
import { ToastContainer } from 'react-toastify';
import { ConfirmProvider } from "material-ui-confirm";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ConfirmProvider defaultOptions ={{confirmationButtonProps: { color:"error", variant: "contained" },
      cancellationButtonProps: { color: "inherit", variant: "outlined" },
      allowClose: false}}>
        <CssBaseline />
        <App />
        <ToastContainer theme="colored" />
      </ConfirmProvider>
    </ThemeProvider>
  </React.StrictMode>
);
