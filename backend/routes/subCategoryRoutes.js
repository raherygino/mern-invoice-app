const express = require('express')
const router = express.Router()
const {
    getSubCategories,
    setSubCategory,
    getSubCategoriesByCategory,
    updateSubCategory,
    deleteSubCategory,
} = require('../controllers/subCategoryController')

const { protect } = require('../middleware/authMiddleware')

router.get('/:id', getSubCategories)
router.get('/bycategory/:id/:organization', getSubCategoriesByCategory)
router.get('/delete/:id', deleteSubCategory)
router.post('/',protect, setSubCategory)
router.post('/update/:id',protect, updateSubCategory)

module.exports = router
