const mongoose  = require('mongoose')

const Organization = require('../models/organizationModel')
const User = require('../models/userModel')
const Category = require('../models/categoryModel')
const SubCategory = require('../models/subCategoryModel')
const Product = require('../models/productModel')

const seedOrganization = require('./OrganizationSeed')
const seedUser = require('./UserSeed')

const COUNT_ORG = 6
const COUNT_USER = 8

mongoose.connect('mongodb://127.0.0.1:27017/db_invoice', {
    useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected')
    })
    .catch((err) => {
        console.log(err)
})

const swipeDB = async () => {
    await Organization .deleteMany({})
    await User.deleteMany({})
    await Category.deleteMany({})
    await SubCategory.deleteMany({})
    await Product.deleteMany({})
}

const seedDB = async () => {
    await seedOrganization(COUNT_ORG)
    await seedUser(COUNT_USER)
}

swipeDB().then(() => {
    console.log("Swiped !!")
})

seedDB().then(() => {
    console.log("Created")
})
