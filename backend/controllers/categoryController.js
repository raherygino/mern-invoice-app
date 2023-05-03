const asyncHandler = require('express-async-handler')
const Category = require('../models/categoryModel')
const User = require('../models/userModel')

// @desc    Get categories
// @route   GET /api/categories
// @access  Private
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({ organization: req.params.id })
    res.status(200).json(categories)
})

// @desc    set category
// @route   POST /api/categories
// @access  Private
const setCategory = asyncHandler(async (req, res) => {

    if (!req.body.name) {
      res.status(400)
      throw new Error('Name required')
    }
  
    const category = await Category.create({
        name: req.body.name,
        organization: req.body.organization,
    })
  
    res.status(200).json(category)
})

module.exports = {
    getCategories,
    setCategory,
}