import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { issuesAPI } from '../utils/api'
import { getGeoLocation } from '../utils/helpers'

function ReportPage({ userId, userName }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [coordinates, setCoordinates] = useState(null)
  const [geoLoading, setGeoLoading] = useState(false)
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  const handleGetLocation = async () => {
    setGeoLoading(true)
    try {
      const geo = await getGeoLocation()
      setCoordinates(geo)
      setLocation(`Lat: ${geo.latitude.toFixed(4)}, Lng: ${geo.longitude.toFixed(4)}`)
      setError('')
    } catch (err) {
      setError('Failed to get location. Please enable GPS and try again.')
    } finally {
      setGeoLoading(false)
    }
  }

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
      setError('')
    }
  }

  const handleCameraCapture = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        // Simplified - in production, show camera UI
        alert('Camera feature requires custom implementation. Use file upload instead.')
      } catch (err) {
        setError('Camera access denied')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!image) {
      setError('Please select an image')
      return
    }
    
    if (!coordinates) {
      setError('Please enable location')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('user_id', userId || 'anonymous')
      formData.append('user_name', userName)
      formData.append('latitude', coordinates.latitude)
      formData.append('longitude', coordinates.longitude)
      formData.append('description', description || location)

      const response = await issuesAPI.submitReport(formData)
      
      setSuccess('Issue reported successfully!')
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
    } catch (err) {
      setError('Failed to submit report: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Report an Issue</h1>
        <p className="text-gray-600 mb-8">Help Jaipur! Report civic issues and earn karma points.</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="card">
            <label className="block text-lg font-bold mb-4">Step 1: Capture Issue Image</label>
            
            <div className="space-y-3">
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
              )}
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 btn btn-primary"
                >
                  Choose from Gallery
                </button>
                <button
                  type="button"
                  onClick={handleCameraCapture}
                  className="flex-1 btn btn-secondary"
                >
                  Take Photo
                </button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              
              {image && (
                <p className="text-sm text-green-600">Image selected: {image.name}</p>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="card">
            <label className="block text-lg font-bold mb-4">Step 2: Enable GPS Location</label>
            
            <button
              type="button"
              onClick={handleGetLocation}
              disabled={geoLoading}
              className="w-full btn btn-secondary mb-4"
            >
              {geoLoading ? 'Getting location...' : 'Get Current Location'}
            </button>
            
            {coordinates && (
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <p className="text-green-700 font-semibold">Location detected</p>
                <p className="text-sm text-gray-600 mt-1">{location}</p>
                <p className="text-xs text-gray-500 mt-1">Accuracy: ±{coordinates.accuracy.toFixed(0)}m</p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="card">
            <label className="block text-lg font-bold mb-4">Step 3: Describe the Issue</label>
            
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue in detail (optional)..."
              className="input h-28"
            />
            
            <p className="text-xs text-gray-500 mt-2">
              Tip: Detailed descriptions help authorities fix issues faster
            </p>
          </div>

          {/* Submit */}
          <div className="card bg-blue-50 border border-blue-200">
            <div className="flex items-start gap-3">
              <div>
                <p className="font-bold">You'll earn 10 karma points for this report!</p>
                <p className="text-sm text-gray-600">Plus bonus points if your issue gets verified.</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !image || !coordinates}
            className="w-full btn btn-primary text-lg font-bold py-3"
          >
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ReportPage
