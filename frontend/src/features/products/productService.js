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

// Create new subcategory
const createProduct = async (productData, token) => {
  const response = await axios.post(API_URL, productData, setConfig(token))
  return response.data
}

const productService = {
    createProduct,
}

export default productService