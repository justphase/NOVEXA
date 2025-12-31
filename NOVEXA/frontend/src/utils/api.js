import axios from 'axios'

const API_BASE = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  }
})

export const issuesAPI = {
  submitReport: (formData) => api.post('/issues/report', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  listReports: (filters = {}) => api.get('/issues/list', { params: filters }),
  getReport: (id) => api.get(`/issues/${id}`),
  verifyBeforeAfter: (id, afterImage) => {
    const formData = new FormData()
    formData.append('after_image', afterImage)
    return api.post(`/issues/${id}/verify`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  upvoteReport: (id) => api.post(`/issues/${id}/upvote`),
}

export const usersAPI = {
  register: (name, email) => api.post('/users/register', { name, email }),
  getUser: (id) => api.get(`/users/${id}`),
  getLeaderboard: (limit = 10) => api.get('/users/leaderboard', { params: { limit } }),
}

export const healthCheck = () => api.get('/health')

export default api
