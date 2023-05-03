import axios from 'axios'

const API_URL = 'http://127.0.0.1:5000/api/categories/'

// Get categories
const getCategories = async (organization) => {
  const response = await axios.get(`${API_URL}${organization}`)
  return response.data
}

const categoryService = {
    getCategories,
}

export default categoryService
