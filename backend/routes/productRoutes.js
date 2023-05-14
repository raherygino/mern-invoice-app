const express = require('express')
const router = express.Router()

const {
    setProduct, getProducts,
} = require('../controllers/productController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, setProduct)
router.get('/:organization', getProducts)

module.exports = router