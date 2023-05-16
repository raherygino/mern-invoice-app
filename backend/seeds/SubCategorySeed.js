const Organization = require('../models/organizationModel')
const Category = require('../models/categoryModel')
const SubCategory = require('../models/subCategoryModel')

const subCategories = (length) => {
    const subCategories = []
    for (let i = 0; i < length; i++) {
        subCategories.push({
            organization: '',
            category: '',
            name: ''
        })
    }

    return subCategories;
}

const seedSubCategory = async (length) => {
    const organizationsCreated = await Organization.find()
    const categoriesCreated = await Category.find()
    const allSubCategories = subCategories(length)

    for (let i = 0; i < organizationsCreated.length; i++) {
        for (let j = 0; j < categoriesCreated.length; j++) {

            const subCategoryExist = await SubCategory.find({
                organization: categoriesCreated[j].organization, 
                category: categoriesCreated[j]
            })

            if (subCategoryExist.length === 0) {
                for (let k = 0; k < allSubCategories.length; k++) {
                    allSubCategories[k].organization = categoriesCreated[j].organization
                    allSubCategories[k].category = categoriesCreated[j]
                    allSubCategories[k].name = `Sub Category ${k+1}`
                    SubCategory.create(allSubCategories[k])
                }
            }
        }
    }
}

module.exports = seedSubCategory
