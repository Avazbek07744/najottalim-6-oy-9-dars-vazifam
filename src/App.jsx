import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Register from './pages/form/Register'
import Home from './pages/Home'
import Login from './pages/form/Login'
import Mainleout from './pages/layout/Mainleout'
import About from './pages/About'
import Error from './pages/Error'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }
    else {
      if (!location.pathname.includes('/register')) {
        navigate('/login')
      }
    }
  }, [navigate])

  function Peoportiy({ aser, children }) {
    if (!aser) {
      navigate('/login')
    }
    return children
  } 

  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={
            <Peoportiy aser={!!token}>
              <Mainleout>
                <Home />
              </Mainleout>
            </Peoportiy>
          }
        />
        <Route
          path='/about'
          element={
            <Peoportiy aser={!!token}>
              <Mainleout>
                <About />
              </Mainleout>
            </Peoportiy>
          }
        />

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
