import axios from 'axios'

const API_URL = 'http://127.0.0.1:5000/api/users/info/644ed0fa3fcf52360278c0c6'

// Get user
const getUserData = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)
  return response.data
}

const goalService = {
  getUserData,
}

export default goalService
