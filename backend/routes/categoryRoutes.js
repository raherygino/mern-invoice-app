const express = require('express')
const router = express.Router()
const {
    getCategories,
    setCategory,
    deleteCategory,
} = require('../controllers/categoryController')


router.get('/:id', getCategories)
router.get('/delete/:id', deleteCategory)
router.post('/', setCategory)

module.exports = router
