const express = require('express')
const router = express.Router()
const {
    getOrganizations,
    setOrganization,
    updateOrganization,
    deleteOrganization,
} = require('../controllers/organizationController')

const { protect } = require('../middleware/authMiddleware')

//router.route('/').get(protect, getOrganizations).post(protect, setOrganization)

router.post('/', setOrganization)
router.get('/show/:id', getOrganizations)
//router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)

module.exports = router
