const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const Category = require('../models/categoryModel')
const SubCategory = require('../models/subCategoryModel')

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

    for (let i = 0 ; i < products.length; i++) {
        const newCategory = await Category.findById(products[i].category)
        const newSubCategory = await SubCategory.findById(products[i].sub_category)
        
        products[i].category = newCategory
        products[i].sub_category = newSubCategory
    }

    res.status(200).json(products)
})

// @desc    Get delete more products
// @route   GET /api/delete_more
// @access  Private
const deleteMore = asyncHandler(async (req, res) => {
    const query = req.query
    const id = Object.keys(req.query)

    for (let i = 0; i < id.length; i++) {
        const product = await Product.findById(query[id[i]])
        await product.remove()
    }

    res.status(200).json({ message : "Deleted !" })
})

// @desc    Get product
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
    deleteMore,
    getProducts,
    deleteProduct,
}