import React from 'react'

function LeaderboardRow({ rank, user, isHighlight }) {
  return (
    <tr className={isHighlight ? 'bg-yellow-50' : 'hover:bg-gray-50 border-b'}>
      <td className="px-4 py-3 font-bold text-lg">
        {rank}
      </td>
      <td className="px-4 py-3">
        <div className="font-semibold">{user.name}</div>
        <div className="text-xs text-gray-500">{user.email}</div>
      </td>
      <td className="px-4 py-3 text-center">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
          {user.reports_count}
        </span>
      </td>
      <td className="px-4 py-3 text-center">
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
          {user.verified_count}
        </span>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="font-bold text-xl">{user.karma_points}</div>
      </td>
    </tr>
  )
}

export default LeaderboardRow
