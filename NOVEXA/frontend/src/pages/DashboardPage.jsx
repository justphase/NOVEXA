import React, { useState, useEffect } from 'react'
import { issuesAPI, usersAPI } from '../utils/api'
import ReportCard from '../components/ReportCard'
import KarmaDisplay from '../components/KarmaDisplay'

function DashboardPage({ userId, userName }) {
  const [reports, setReports] = useState([])
  const [userStats, setUserStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [zone, setZone] = useState('all')

  useEffect(() => {
    loadData()
  }, [userId])

  const loadData = async () => {
    try {
      // Load user stats
      if (userId) {
        const userRes = await usersAPI.getUser(userId)
        setUserStats(userRes.data.user)
      }

      // Load reports
      const filters = {}
      if (filter !== 'all') filters.status = filter
      if (zone !== 'all') filters.zone = zone

      const reportsRes = await issuesAPI.listReports(filters)
      setReports(reportsRes.data.reports)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpvote = async (reportId) => {
    try {
      await issuesAPI.upvoteReport(reportId)
      loadData()
    } catch (error) {
      alert('Failed to upvote: ' + error.message)
    }
  }

  const handleViewDetails = (reportId) => {
    // In production, navigate to detail page
    alert('Report ID: ' + reportId)
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-8">Your civic engagement overview</p>

      {/* Karma Stats */}
      {userStats && (
        <KarmaDisplay
          karma={userStats.karma_points}
          reportCount={userStats.reports_count}
          verifiedCount={userStats.verified_count}
        />
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-2">Filter by Status</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="input"
            >
              <option value="all">All Issues</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Filter by Zone</label>
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="input"
            >
              <option value="all">All Zones</option>
              <option value="Heritage">Heritage Zone</option>
              <option value="Greater">Greater Jaipur Zone</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Loading reports...</p>
        </div>
      ) : reports.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">No reports found</p>
          <p className="text-gray-500">Be the first to report an issue!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onUpvote={handleUpvote}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default DashboardPage
