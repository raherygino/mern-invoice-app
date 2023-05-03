const asyncHandler = require('express-async-handler')
const Category = require('../models/categoryModel')
const User = require('../models/userModel')

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
    setCategory,
}