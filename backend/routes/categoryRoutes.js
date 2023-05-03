const express = require('express')
const router = express.Router()
const {
    getCategories,
    setCategory,
} = require('../controllers/categoryController')


router.get('/:id', getCategories)
router.post('/', setCategory)

module.exports = router
