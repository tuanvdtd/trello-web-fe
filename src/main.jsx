import * as React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import theme from "./theme";
import './main.css'
import { ToastContainer } from 'react-toastify';
import { ConfirmProvider } from "material-ui-confirm";
import { Provider } from 'react-redux';
import { store } from '~/redux/store';
import { BrowserRouter } from 'react-router-dom'

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { injectStore } from '~/utils/authorizeAxios';

// persistor is used to persist the Redux store across page reload
let persistor = persistStore(store);
injectStore(store);

// // cấu hình socketio => chuyển ra file riêng tránh render lại root
// import { io } from "socket.io-client";
// import { API_ROOT } from "./utils/constants";
// export const socketIoInstance = io(API_ROOT)

const rootElement = document.getElementById("root");
// Tránh tạo lại khi reload
if (!rootElement._reactRoot) {
  rootElement._reactRoot = createRoot(rootElement);
}

const root = rootElement._reactRoot;

root.render(
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/" future={{ v7_startTransition: true , v7_relativeSplatPath: true}}>
          <ThemeProvider theme={theme}>
            <ConfirmProvider defaultOptions ={{confirmationButtonProps: { color:"error", variant: "contained" },
            cancellationButtonProps: { color: "inherit", variant: "outlined" },
            allowClose: false}}>
              <CssBaseline />
              <App />
              <ToastContainer theme="colored" />
            </ConfirmProvider>
          </ThemeProvider>
      </BrowserRouter>
      </PersistGate>
    </Provider>
);
