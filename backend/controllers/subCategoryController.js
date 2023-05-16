const asyncHandler = require('express-async-handler')
const SubCategory = require('../models/subCategoryModel')

// @desc    Get categories
// @route   GET /api/subcategories
// @access  Private
const getSubCategories = asyncHandler(async (req, res) => {
    const subCategories = await SubCategory.find({ organization: req.params.id })
    res.status(200).json(subCategories)
})

// @desc    Get subcategories
// @route   GET /api/subcategories/bycategory/:id/:organization
// @access  Private
const getSubCategoriesByCategory = asyncHandler(async (req, res) => {
    const subCategories = await SubCategory.find({ category: req.params.id, organization: req.params.organization })
    res.status(200).json(subCategories)
})

// @desc    Update subcategories
// @route   PUT /api/subcategories/update/:id
// @access  Private
const updateSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await SubCategory.findById(req.params.id)

  if (!subCategory) {
    res.status(400)
    throw new Error('Category not found')
  }

  const updatedSubCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedSubCategory)
})

// @desc    set subcategory
// @route   POST /api/subcategories
// @access  Private
const setSubCategory = asyncHandler(async (req, res) => {

    if (!req.body.name) {
      res.status(400)
      throw new Error('Name required')
    }

    const subCategory = await SubCategory.create(req.body)
  
    res.status(200).json(subCategory)
})


// @desc    Delete subCategory
// @route   DELETE /api/subcategories/delete/:id
// @access  Private
const deleteSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await SubCategory.findById(req.params.id)

  if (!subCategory) {
    res.status(400)
    throw new Error('SubCategory not found')
  }

  await subCategory.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
    getSubCategories,
    setSubCategory,
    getSubCategoriesByCategory,
    updateSubCategory,
    deleteSubCategory,
}