const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

// @desc   set product
// @route  POST /api/products
// @access Private

const setProduct = asyncHandler(async (req, res) => {
    const product = await Product.create(req.body)
    res.status(200).json(product)
})

module.exports = {
    setProduct,
}