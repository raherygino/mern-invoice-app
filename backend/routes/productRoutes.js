const express = require('express')
const router = express.Router()

const {
    setProduct
} = require('../controllers/productController')

const { product } = require('../middleware/authMiddleware')

router.post('/', product, setProduct)