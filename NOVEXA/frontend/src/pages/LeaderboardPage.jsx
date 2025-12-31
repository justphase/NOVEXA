import React, { useState, useEffect } from 'react'
import { usersAPI } from '../utils/api'
import LeaderboardRow from '../components/LeaderboardRow'

function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentUserId, setCurrentUserId] = useState(null)

  useEffect(() => {
    loadLeaderboard()
    const stored = localStorage.getItem('novexa_user')
    if (stored) {
      setCurrentUserId(JSON.parse(stored).id)
    }
  }, [])

  const loadLeaderboard = async () => {
    try {
      const response = await usersAPI.getLeaderboard(50)
      setLeaderboard(response.data.leaderboard)
    } catch (error) {
      console.error('Failed to load leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-2">Karma Leaderboard</h1>
      <p className="text-gray-600 mb-8">Top civic contributors in Jaipur</p>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading leaderboard...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-primary to-secondary text-white">
              <tr>
                <th className="px-4 py-4 text-left">Rank</th>
                <th className="px-4 py-4 text-left">User</th>
                <th className="px-4 py-4 text-center">Reports</th>
                <th className="px-4 py-4 text-center">Verified</th>
                <th className="px-4 py-4 text-right">Karma Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, index) => (
                <LeaderboardRow
                  key={user.user_id}
                  rank={index + 1}
                  user={user}
                  isHighlight={user.user_id === currentUserId}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Badges Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Achievement Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white p-6 rounded-lg text-center">
            <p className="font-bold">Champion</p>
            <p className="text-xs">100 karma points</p>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 text-white p-6 rounded-lg text-center">
            <p className="font-bold">Reporter</p>
            <p className="text-xs">10 reports</p>
          </div>
          <div className="bg-gradient-to-br from-green-400 to-green-500 text-white p-6 rounded-lg text-center">
            <p className="font-bold">Verifier</p>
            <p className="text-xs">5 verified</p>
          </div>
          <div className="bg-gradient-to-br from-purple-400 to-purple-500 text-white p-6 rounded-lg text-center">
            <p className="font-bold">Legend</p>
            <p className="text-xs">500 karma</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaderboardPage
