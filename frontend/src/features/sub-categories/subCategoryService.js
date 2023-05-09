import axios from 'axios'

const API_URL = 'http://127.0.0.1:5000/api/subcategories/'

// Get subcategories
const getSubCategories = async (organization) => {
  const response = await axios.get(`${API_URL}${organization}`)
  return response.data
}

// Get subcategory by category
const getSubCategoriesByCategory = async (category) => {
  const response = await axios.get(`${API_URL}bycategory/${category}`)
  return response.data
}

// Update subcategory
const updateSubCategory = async (subCategoryData) => {
  const response = await axios.post(`${API_URL}update/${subCategoryData._id}`, subCategoryData)
  return response.data
}

// Create new subcategory
const createSubCategory = async (subCategoryData, token) => {/*
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }*/

  const response = await axios.post(API_URL, subCategoryData)
  return response.data
}
const subCategoryService = {
    getSubCategories,
    getSubCategoriesByCategory,
    updateSubCategory,
    createSubCategory
}

export default subCategoryService
