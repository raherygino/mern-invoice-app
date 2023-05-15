const express = require('express')
const router = express.Router()

const {
    setProduct, getProducts, deleteProduct, getProduct, deleteMore,
} = require('../controllers/productController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, setProduct)
router.get('/get/:organization', getProducts)
router.get('/delete/:id', deleteProduct)
router.get('/show/:id', getProduct)
router.get('/delete_more', deleteMore)

module.exports = router