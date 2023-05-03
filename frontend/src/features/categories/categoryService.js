import axios from 'axios'

const API_URL = 'http://127.0.0.1:5000/api/categories/'

// Get categories
const getCategories = async (organization) => {
  const response = await axios.get(`${API_URL}${organization}`)
  return response.data
}

// Create new category
const createCategory = async (categoryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, categoryData)
  return response.data
}
const categoryService = {
    getCategories,
    createCategory
}

export default categoryService
