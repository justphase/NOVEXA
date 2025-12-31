export const getGeoLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'))
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        })
      },
      (error) => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  })
}

export const getSeverityColor = (severity) => {
  const colors = {
    low: 'bg-green-100 text-green-800 border-green-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    high: 'bg-orange-100 text-orange-800 border-orange-300',
    critical: 'bg-red-100 text-red-800 border-red-300',
  }
  return colors[severity] || colors.medium
}

export const getSeverityIcon = (severity) => {
  const icons = {
    low: '●',
    medium: '●●',
    high: '●●●',
    critical: '●●●●',
  }
  return icons[severity] || '●'
}

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const getIssueIcon = (issueType) => {
  const icons = {
    pothole: 'P',
    waterlogging: 'W',
    garbage: 'G',
    street_light: 'L',
    drainage: 'D',
    tree_cutting: 'T',
    construction: 'C',
    traffic: 'F',
    other: '?'
  }
  return icons[issueType] || '?'
}
