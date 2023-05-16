const Organization = require('../models/organizationModel')
const Category = require('../models/categoryModel')

const categories = (length) => {
    const categories = []
    for (let i = 0; i < length; i++) {
        categories.push({
            organization: '',
            name: `Category_${i+1}`
        })
    }

    return categories;
}

const seedCategory = async (length) => {
    const organizationsCreated = await Organization.find()
    const allCategories = categories(length)
    
    for (let i = 0; i < organizationsCreated.length; i++) {
        for (let j = 0; j < allCategories.length; j++) {
            allCategories[j].organization = organizationsCreated[i]
            allCategories[j].name = `Category ${j+1}`
            Category.create(allCategories[j])
        }
    }
}

module.exports = seedCategory