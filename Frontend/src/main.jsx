import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { NextUIProvider } from "@nextui-org/react"
import { Provider } from 'react-redux';

import { store } from './app/store';
import './index.css'
import 'material-icons/iconfont/material-icons.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>


  <NextUIProvider>
    <React.StrictMode >
      
      <App />
    </React.StrictMode>
  </NextUIProvider>  
  </Provider>

)
