const asyncHandler = require('express-async-handler')

const Organization = require('../models/organizationModel')

// @desc    Get Organization
// @route   GET /api/organizations
// @access  Private
const getOrganizations = asyncHandler(async (req, res) => {
  const organization = await Organization.findById(req.params.id)

  res.status(200).json(organization)
})

// @desc    Set organization
// @route   POST /api/organizations
// @access  Private
const setOrganization = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400)
    throw new Error('Fill field')
  }

  const organization = await Organization.create({
    name: req.body.name,
  })

  res.status(200).json(organization)
})

// @desc    Update organization
// @route   PUT /api/organization/:id
// @access  Private
const updateOrganization = asyncHandler(async (req, res) => {
  const organization = await Organization.findById(req.params.id)

  if (!organization) {
    res.status(400)
    throw new Error('Organization not found')
  }

  const updatedOrganization = await Organization.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedOrganization)
})

// @desc    Delete organization
// @route   DELETE /api/organizations/:id
// @access  Private
const deleteOrganization = asyncHandler(async (req, res) => {
  const organization = await Organization.findById(req.params.id)

  if (!organization) {
    res.status(400)
    throw new Error('Organization not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  await organization.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getOrganizations,
  setOrganization,
  updateOrganization,
  deleteOrganization,
}
