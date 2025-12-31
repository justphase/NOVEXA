import React from 'react'

function Footer() {
  return (
    <footer className="bg-secondary text-white mt-12">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-4">Jaipur Novexa</h3>
            <p className="text-gray-300">Civic issue reporting for Jaipur citizens</p>
          </div>
          <div>
            <h4 className="font-bold mb-3">Quick Links</h4>
            <ul className="text-gray-300 space-y-2">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/report" className="hover:text-white">Report</a></li>
              <li><a href="/dashboard" className="hover:text-white">Dashboard</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Supported Issues</h4>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>Potholes</li>
              <li>Waterlogging</li>
              <li>Garbage</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Contact</h4>
            <p className="text-gray-300 text-sm">
              Email: support@jaipurnovexa.in<br/>
              Phone: 1800-NOVEXA
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
          <p>&copy; 2025 Jaipur Novexa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
