import axios from 'axios'

const API_URL = 'http://127.0.0.1:5000/api/users/'



const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}info/${id}`)
  return response.data
}

// Register user
const register = async (userData) => {

  const response = await axios.post(API_URL, userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
  getUserById,
}

export default authService
