import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

function Navbar({ userName }) {
  return (
    <nav className="bg-gradient-to-r from-primary to-secondary text-white shadow-lg sticky top-0 z-50">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Jaipur Novexa Logo" className="h-12" />
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/report" className="hover:bg-white hover:text-primary px-3 py-2 rounded-lg transition">
            Report Issue
          </Link>
          <Link to="/dashboard" className="hover:bg-white hover:text-primary px-3 py-2 rounded-lg transition">
            Dashboard
          </Link>
          <Link to="/leaderboard" className="hover:bg-white hover:text-primary px-3 py-2 rounded-lg transition">
            Leaderboard
          </Link>
        </div>
        
        <div className="flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-lg font-semibold">
          {userName}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
