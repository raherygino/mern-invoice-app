const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

// @desc   set product
// @route  POST /api/products
// @access Private
const setProduct = asyncHandler(async (req, res) => {
    Product.create(req.body).then((result) => {
        res.status(200).json(result)
    }).catch((error) => {
        res.status(400).json(error)
    })
})

// @desc    Get categories
// @route   GET /api/products/:organization
// @access  Private
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ organization: req.params.organization })
    res.status(200).json(products)
})

module.exports = {
    setProduct,
    getProducts,
}