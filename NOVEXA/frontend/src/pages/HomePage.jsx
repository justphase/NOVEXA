import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usersAPI } from '../utils/api'
import { setUserInCache, clearUserCache } from '../utils/cache'

function HomePage({ userId, setUserId, setUserName }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (userId) {
      navigate('/report')
    }
  }, [userId, navigate])

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await usersAPI.register(name || 'Anonymous', email || 'anonymous@novexa.local')
      const newUserId = response.data.user_id

      setUserInCache(newUserId, name || 'Anonymous')
      
      setUserId(newUserId)
      setUserName(name || 'Anonymous')
      navigate('/report')
    } catch (error) {
      alert('Registration failed: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Hero Section */}
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Jaipur Novexa
            </h1>
            <p className="text-xl mb-4 opacity-90">
              Empower Jaipur! Report civic issues, earn karma points, and help fix our city.
            </p>
            <ul className="space-y-3 mb-8 text-lg">
              <li><strong>Smart Detection:</strong> AI identifies issue type & severity</li>
              <li><strong>Auto Zone Mapping:</strong> GPS detects JMC zone</li>
              <li><strong>Gamification:</strong> Earn karma points & rank on leaderboards</li>
              <li><strong>Before/After Verification:</strong> AI confirms resolution</li>
              <li><strong>Mobile Optimized:</strong> Report on-the-go</li>
            </ul>
          </div>

          {/* Registration Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-secondary mb-2">Get Started</h2>
            <p className="text-gray-600 mb-6">Join Jaipur Novexa community today</p>
            
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="input"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary text-lg font-bold py-3"
              >
                {loading ? 'Creating account...' : 'Start Reporting'}
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Anonymous reporting available without registration
            </p>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear your user data? This will allow you to register as a new user.')) {
                    clearUserCache()
                    setUserId(null)
                    setUserName('Anonymous')
                    alert('User cache cleared! You can now register as a new user.')
                  }
                }}
                className="w-full text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Clear User Data (Register as New User)
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white bg-opacity-20 text-white p-6 rounded-lg text-center backdrop-blur">
            <h3 className="font-bold text-2xl">1000+</h3>
            <p>Issues Reported</p>
          </div>
          <div className="bg-white bg-opacity-20 text-white p-6 rounded-lg text-center backdrop-blur">
            <h3 className="font-bold text-2xl">500+</h3>
            <p>Active Citizens</p>
          </div>
          <div className="bg-white bg-opacity-20 text-white p-6 rounded-lg text-center backdrop-blur">
            <h3 className="font-bold text-2xl">750+</h3>
            <p>Issues Fixed</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
