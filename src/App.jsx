import React from 'react'
import './App.css'
import LandingPage from './vendorDashboard/Components/Pages/LandingPage'
import { Routes, Route } from 'react-router-dom'
import PageNotFound from './vendorDashboard/Components/PageNotFound'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/*' element={<PageNotFound/>}/>
      </Routes>
      {/* <LandingPage/> */}
    </div>
  )
}

export default App
