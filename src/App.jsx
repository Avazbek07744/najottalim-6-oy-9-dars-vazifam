import React, { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Register from './pages/form/Register'
import Home from './pages/Home'
import Login from './pages/form/Login'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()

  function himoya(token, child) {
    if (!token) {
      navigate('/login')
    }
    return child
  }
  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={
            <himoya token={!!token}>
              <Home></Home>
            </himoya>
          }>

        </Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
      </Routes>
    </div>
  )
}

export default App
