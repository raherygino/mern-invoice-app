const express = require('express')
const router = express.Router()

const {
    setProduct, getProducts, deleteProduct,
} = require('../controllers/productController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, setProduct)
router.get('/get/:organization', getProducts)
router.get('/delete/:id', deleteProduct)

module.exports = router