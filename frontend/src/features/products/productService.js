import axios from 'axios'

const API_URL = 'http://127.0.0.1:5000/api/products/'

const setConfig = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return config
}

// Create new product
const createProduct = async (productData, token) => {
  const response = await axios.post(API_URL, productData, setConfig(token))
  return response.data
}

// Upload image
const uploadImageProduct = async(formData, token) => {
  const response = await axios.post('http://localhost:5000/api/files/upload-image-product', formData, setConfig(token))
  return response.data
}

// Get products
const getProducts = async (organization) => {
  const response = await axios.get(`${API_URL}get/${organization}`)
  return response.data
}

// Get product
const getProduct = async (id) => {
  const response = await axios.get(`${API_URL}show/${id}`)
  return response.data
}

const productService = {
    createProduct,
    getProduct,
    getProducts,
    uploadImageProduct
}

export default productService