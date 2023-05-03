const express = require('express')
const router = express.Router()
const {
    setCategory,
} = require('../controllers/categoryController')

router.post('/', setCategory)

module.exports = router
