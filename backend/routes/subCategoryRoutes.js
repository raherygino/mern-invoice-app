const express = require('express')
const router = express.Router()
const {
    getSubCategories,
    setSubCategory,
    getSubCategoriesByCategory,
    updateSubCategory,
    deleteSubCategory,
} = require('../controllers/subCategoryController')


router.get('/:id', getSubCategories)
router.get('/bycategory/:id', getSubCategoriesByCategory)
router.get('/delete/:id', deleteSubCategory)
router.post('/', setSubCategory)
router.post('/update/:id', updateSubCategory)

module.exports = router
