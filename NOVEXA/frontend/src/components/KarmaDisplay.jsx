import React from 'react'

function KarmaDisplay({ karma, reportCount, verifiedCount }) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white p-4 rounded-lg shadow-lg">
        <p className="text-sm opacity-90">Karma Points</p>
        <p className="text-3xl font-bold">{karma}</p>
      </div>
      
      <div className="bg-gradient-to-br from-blue-400 to-blue-500 text-white p-4 rounded-lg shadow-lg">
        <p className="text-sm opacity-90">Reports</p>
        <p className="text-3xl font-bold">{reportCount}</p>
      </div>
      
      <div className="bg-gradient-to-br from-green-400 to-green-500 text-white p-4 rounded-lg shadow-lg">
        <p className="text-sm opacity-90">Verified</p>
        <p className="text-3xl font-bold">{verifiedCount}</p>
      </div>
    </div>
  )
}

export default KarmaDisplay
