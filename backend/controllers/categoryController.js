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

// @desc    Get category
// @route   GET /api/categories
// @access  Private
const getCategory = asyncHandler(async (req, res) => {
    const categories = await Category.find({ 
        organization: req.params.organization,
        _id: req.params.id
    })

    var category = {}
    if (categories.length > 0) {
      category = categories[0]
    }
    
    res.status(200).json(category)
})

// @desc    Update category
// @route   PUT /api/categories/update/:id
// @access  Private
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (!category) {
    res.status(400)
    throw new Error('Category not found')
  }

  const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedCategory)
})

// @desc    set category
// @route   POST /api/categories
// @access  Private
const setCategory = asyncHandler(async (req, res) => {

    if (!req.body.name) {
      res.status(400)
      throw new Error('Name required')
    }

    const category = await Category.create(req.body)
  
    res.status(200).json(category)
})


// @desc    Delete category
// @route   DELETE /api/categories/delete/:id
// @access  Private
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (!category) {
    res.status(400)
    throw new Error('Category not found')
  }
/*
  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }*/

  await category.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
    getCategories,
    getCategory,
    setCategory,
    updateCategory,
    deleteCategory,
}