import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'
import theme from './theme'
import './main.css'
import { ToastContainer } from 'react-toastify'
import { ConfirmProvider } from 'material-ui-confirm'
import { Provider } from 'react-redux'
import { store } from '~/redux/store'
import { BrowserRouter } from 'react-router-dom'

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { injectStore } from '~/utils/authorizeAxios'
import { Auth0Provider } from '@auth0/auth0-react'

// persistor is used to persist the Redux store across page reload
let persistor = persistStore(store)
injectStore(store)

// // cấu hình socketio => chuyển ra file riêng tránh render lại root
// import { io } from "socket.io-client";
// import { API_ROOT } from "./utils/constants";
// export const socketIoInstance = io(API_ROOT)

const rootElement = document.getElementById('root')
// Tránh tạo lại khi reload
if (!rootElement._reactRoot) {
  rootElement._reactRoot = createRoot(rootElement)
}

const root = rootElement._reactRoot

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename="/" future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ThemeProvider theme={theme}>
          <ConfirmProvider defaultOptions ={{ confirmationButtonProps: { color:'error', variant: 'contained' },
            cancellationButtonProps: { color: 'inherit', variant: 'outlined' },
            allowClose: false }}>
            <CssBaseline />
            <Auth0Provider
              domain="dev-ggltcktr3ae4vxn5.us.auth0.com"
              clientId="oiwRwsBn42i54z1usGVrQNhk8bMxvsyZ"
              authorizationParams={{
                redirect_uri: `${window.location.origin}/callback`,
                // audience: API_ROOT

              }}
              cacheLocation="localstorage" // Hoặc "memory" để không persist
              useRefreshTokens={false}
              // cacheLocation= 'localstorage' // nếu kh có dòng này thì mặc định sẽ là memory
              // refreshToken={true}
              // useRefreshTokens={true}
              // useRefreshTokensFallback={true}
              // cookieDomain='.dtt.local'
            >
              <App />
            </Auth0Provider>
            <ToastContainer theme="colored" />
          </ConfirmProvider>
        </ThemeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
