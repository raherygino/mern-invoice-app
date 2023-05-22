const express = require('express')
const router = express.Router()

const { uploadImageProduct } = require('../controllers/file.controller')

const { protect } = require('../middleware/authMiddleware')
const path = require('path')

router.post('/upload-image-product',protect, uploadImageProduct)

module.exports = router