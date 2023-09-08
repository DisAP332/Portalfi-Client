import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'react-bootstrap'
import React from 'react'
import { Login } from './App/Login/Login'
import './App/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { App } from './App/Index'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    > 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='profile' element={<App />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
