import React from "react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from "./context/AuthContext";
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import { store } from './redux/Store'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "react-hot-toast";


createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <AuthProvider>
      <BrowserRouter>
        <Toaster />
        <App />
      </BrowserRouter>
    </AuthProvider>
  </Provider>
)
