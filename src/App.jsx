import React from 'react'
import { BrowserRouter, Route, Routes, useLocation} from "react-router-dom"
import Home from "./Pages/Home"
import Login from './Pages/Login'
import Register from './Pages/Register'
import Profile from './Pages/Profile'
import UpdateUser from './Admin/UpdateUser'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import './index.css'
import './App.css'

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </HelmetProvider>
  );
}

function MainLayout() {

  return (
    <>
        <Helmet>
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "CAN 2025",
            "url": "https://www.can2025.site",
            "logo": "https://www.can2025.site/vite.svg"
          }
          `}
        </script>
      </Helmet>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/users' element={<Profile />} />
        <Route path="/updateuser/:userId" element={<UpdateUser />} />
      </Routes>

    </>
  );
}

export default App
