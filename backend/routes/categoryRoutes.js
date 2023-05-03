const express = require('express')
const router = express.Router()
const {
    getCategories,
    setCategory,
} = require('../controllers/categoryController')


router.get('/', getCategories)
router.post('/', setCategory)

module.exports = router
