import React from 'react'
import { getSeverityIcon, getSeverityColor, getIssueIcon, formatDate } from '../utils/helpers'

function ReportCard({ report, onUpvote, onViewDetails }) {
  return (
    <div className="card border border-gray-200">
      {report.image_path && (
        <img src={`/${report.image_path}`} alt="Issue" className="w-full h-48 object-cover rounded-lg mb-3" />
      )}
      
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getIssueIcon(report.issue_type)}</span>
            <h3 className="font-bold text-lg capitalize">{report.issue_type.replace('_', ' ')}</h3>
          </div>
          <p className="text-gray-600 text-sm mt-1">{report.location}</p>
        </div>
        <span className={`badge border ${getSeverityColor(report.severity)}`}>
          {getSeverityIcon(report.severity)} {report.severity.toUpperCase()}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
        <div className="bg-gray-50 p-2 rounded">
          <span className="text-gray-600">Zone:</span>
          <p className="font-semibold">{report.zone || 'Detecting...'}</p>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <span className="text-gray-600">Status:</span>
          <p className="font-semibold capitalize">{report.status}</p>
        </div>
      </div>
      
      <div className="text-xs text-gray-500 mb-3">
        {formatDate(report.created_at)}
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => onUpvote(report.id)}
          className="flex-1 btn btn-outline text-sm"
        >
          {report.votes || 0}
        </button>
        <button
          onClick={() => onViewDetails(report.id)}
          className="flex-1 btn btn-primary text-sm"
        >
          Details
        </button>
      </div>
    </div>
  )
}

export default ReportCard
