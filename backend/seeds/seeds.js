const mongoose  = require('mongoose')
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('../config/db');

const Organization = require('../models/organizationModel')
const User = require('../models/userModel')
const Category = require('../models/categoryModel')
const SubCategory = require('../models/subCategoryModel')
const Product = require('../models/productModel')

const seedOrganization = require('./OrganizationSeed')
const seedUser = require('./UserSeed')
const seedCategory = require('./CategorySeed')
const seedSubCategory = require('./SubCategorySeed')
const seedProduct = require('./ProductSeed')

const COUNT_ORGANIZATION = 6
const COUNT_USER = 8
const COUNT_CATEGORY = 10
const COUNT_SUB_CATEGORY = 6
const COUNT_PRODUCT = 60

connectDB()

const swipeDB = async () => {
    await Organization .deleteMany({})
    await User.deleteMany({})
    await Category.deleteMany({})
    await SubCategory.deleteMany({})
    await Product.deleteMany({})
}

const seedDB = async () => {
    await seedOrganization(COUNT_ORGANIZATION)
    await seedUser(COUNT_USER)
    await seedCategory(COUNT_CATEGORY)
    await seedSubCategory(COUNT_SUB_CATEGORY)
    await seedProduct(COUNT_PRODUCT)
}

swipeDB().then(() => {
    console.log("Swiped !!".cyan.underline)
})

seedDB().then(() => {
    console.log("Created !!".magenta.underline)
})
