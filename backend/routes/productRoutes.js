const express = require('express')
const router = express.Router()

const {
    setProduct,
} = require('../controllers/productController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, setProduct)

module.exports = router