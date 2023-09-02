import ReactDOM from 'react-dom/client'
import App from './App/Index'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'react-bootstrap'
import React from 'react'
import { Profile } from './App/Pages/Site/Profile'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    > 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App/>} />
          <Route path='profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
