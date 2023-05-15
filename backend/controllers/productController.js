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
// @route   GET /api/products/get/:organization
// @access  Private
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ organization: req.params.organization })
    res.status(200).json(products)
})

// @desc    Get categories
// @route   GET /api/products/show/:id
// @access  Private
const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.status(200).json(product)
})


// @desc    Delete products
// @route   DELETE /api/products/delete/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)

    if (!product) {
      res.status(400)
      throw new Error('Product not found')
    }

    await product.remove()
    res.status(200).json({ id: req.params.id })
  })

module.exports = {
    setProduct,
    getProduct,
    getProducts,
    deleteProduct,
}