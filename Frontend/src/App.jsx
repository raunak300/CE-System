import './App.css'
import { useEffect, useState } from 'react'
import { Outlet, BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'

import Home from './Pages/Home/Home'
import Login from './Pages/Auth-Page/Login'
import Signup from './Pages/Auth-Page/Signup'

import { CHECK_URL } from './API/authAPI'
import userStore from './Store/store'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<FirstFill />}>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<Protected />}>
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App


// 🔹 Checks user session on app load / refresh
export function FirstFill() {
  const setUserData = userStore((state) => state.setuserData)
  const setLoggedIn = userStore((state) => state.setLoggedIn)
  const setLoggedOut = userStore((state) => state.setLoggedOut)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true)
      try {
        const response = await axios.get(CHECK_URL, { withCredentials: true })
        if (response.status === 200 && response.data?.data) {
          setUserData(response.data.data)
          setLoggedIn()
        } else {
          throw new Error('not authorized')
        }
      } catch (error) {
        console.error(error)
        setUserData({})
        setLoggedOut()
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  if (loading) return <div>Loading...</div>

  return <Outlet />
}


// 🔹 Protects specific routes after login
export function Protected() {
  const navigate = useNavigate()
  const logged = userStore((state) => state.loggedIn)

  useEffect(() => {
    if (!logged) {
      navigate('/login')
    }
  }, [logged, navigate])

  if (!logged) return null

  return <Outlet />
}
