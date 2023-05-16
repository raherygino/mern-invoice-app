import axios from 'axios'

const API_URL = 'http://127.0.0.1:5000/api/subcategories/'


const setConfig = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return config
}

// Get subcategories
const getSubCategories = async (organization) => {
  const response = await axios.get(`${API_URL}${organization}`) /// <- Verify
  //console.log(response.data) 64636f2425cc66d6802202c4
  return response.data
}

// Get subcategory by category
const getSubCategoriesByCategory = async (category, organization) => {
  const response = await axios.get(`${API_URL}bycategory/${category}/${organization}`)
  return response.data
}

// Update subcategory
const updateSubCategory = async (subCategoryData, token) => {
  const response = await axios.post(`${API_URL}update/${subCategoryData._id}`, subCategoryData, setConfig(token))
  return response.data
}

// Create new subcategory
const createSubCategory = async (subCategoryData, token) => {
  const response = await axios.post(API_URL, subCategoryData, setConfig(token))
  return response.data
}

const subCategoryService = {
    getSubCategories,
    getSubCategoriesByCategory,
    updateSubCategory,
    createSubCategory
}

export default subCategoryService
