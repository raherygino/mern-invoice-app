const express = require('express')
const router = express.Router()
const {
    getCategories,
    getCategory,
    setCategory,
    updateCategory,
    deleteCategory,
} = require('../controllers/categoryController')

const { protect } = require('../middleware/authMiddleware')

router.get('/:id', getCategories)
router.get('/show/:organization/:id', getCategory)
router.get('/delete/:id', deleteCategory)
router.post('/',protect, setCategory)
router.post('/update/:id',protect, updateCategory)

module.exports = router
