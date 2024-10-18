import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LoginPage } from './components/LoginPage.jsx'
import { RegisterPage } from './components/RegisterPage.jsx'
import { BrowserRouter } from 'react-router-dom'
import { App } from './components/App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
