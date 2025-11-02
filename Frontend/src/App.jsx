import './App.css'

import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Home from './Pages/Home/Home'
import Login from './Pages/Auth-Page/Login'
import Signup from './Pages/Auth-Page/Signup'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Protected>
          <Route>

          </Route>
        </Protected>
      </Routes>

    </BrowserRouter>
    </>
  )
}

export default App


export function Protected(){
 
}