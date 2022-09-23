import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import store from './store'
import {Provider} from 'react-redux'
import {ThemeProvider} from '@mui/material/styles'
import themePokedex from './themePokedex'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={themePokedex}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
