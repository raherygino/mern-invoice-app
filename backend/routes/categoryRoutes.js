const express = require('express')
const router = express.Router()
const {
    getCategories,
    getCategory,
    setCategory,
    updateCategory,
    deleteCategory,
} = require('../controllers/categoryController')


router.get('/:id', getCategories)
router.get('/show/:organization/:id', getCategory)
router.get('/delete/:id', deleteCategory)
router.post('/', setCategory)
router.post('/update/:id', updateCategory)

module.exports = router
