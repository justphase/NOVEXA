import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ReportPage from './pages/ReportPage'
import DashboardPage from './pages/DashboardPage'
import LeaderboardPage from './pages/LeaderboardPage'
import { clearUserCache } from './utils/cache'
import './index.css'

function App() {
  const [userId, setUserId] = useState(null)
  const [userName, setUserName] = useState('Anonymous')

  useEffect(() => {
    // Clear user cache on app startup to ensure fresh start for new users
    clearUserCache()
    console.log('User cache cleared on app startup')
  }, [])

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar userName={userName} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage userId={userId} setUserId={setUserId} setUserName={setUserName} />} />
            <Route path="/report" element={<ReportPage userId={userId} userName={userName} />} />
            <Route path="/dashboard" element={<DashboardPage userId={userId} userName={userName} />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
