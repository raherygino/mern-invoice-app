const User = require('../models/userModel')
const Category = require('../models/categoryModel')
const SubCategory = require('../models/subCategoryModel')
const Product = require('../models/productModel')
const { rand } = require('../utils/functions')

const products = (length) => {
    const products = []

    for (let i = 0; i < length; i++) {
        products.push({
            organization: '',
            user: null,
            name: `Products ${i+1}`,
            category: '',
            sub_category: '',
            price: rand(1000, 9999),
            description: `Description ${i}`,
            image: '',
        })
    }

    return products
}

const seedProduct = async (length) => {
    
    const categoriesCreated = await Category.find()
    const subCategoriesCreated = await SubCategory.find()
    const user = await User.find({email: 'georgino197@gmail.com'})
    const allProducts = products(length)

    for (let i = 0; i < allProducts.length; i++) {
        const randCat = rand(0, categoriesCreated.length - 1)
        const randSubCat = rand(0, subCategoriesCreated.length - 1)

        allProducts[i].organization = user[0].organization
        allProducts[i].user = user[0]._id
        allProducts[i].category = categoriesCreated[randCat]._id
        allProducts[i].sub_category = subCategoriesCreated[randSubCat]._id

        Product.create(allProducts[i])
    }
}

module.exports = seedProduct