import axios from 'axios'

const API_URL = 'http://127.0.0.1:5000/api/users/info/'

// Get user
const getUserData = async (id) => {
  const response = await axios.get(`${API_URL}${id}`)
  return response.data
}

const userService = {
  getUserData,
}

export default userService
