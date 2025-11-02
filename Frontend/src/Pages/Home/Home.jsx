import React from 'react'
import Navbar from '../../Componets/Navbar/Navbar'
import HPage from '../../Componets/Content/HPage'
import StickyBar from '../../Componets/StickeyBar/StickyBar'

const Home = () => {
  return (
    <div>
        <Navbar />
        <StickyBar />
        <HPage />
    </div>
  )
}

export default Home