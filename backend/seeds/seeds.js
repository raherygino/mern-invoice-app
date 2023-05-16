const Organization = require('../models/organizationModel')
const User = require('../models/userModel')
const Category = require('../models/categoryModel')
const SubCategory = require('../models/subCategoryModel')
const Product = require('../models/productModel')

const mongoose  = require('mongoose')
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb://127.0.0.1:27017/db_invoice', {
    useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected')
    })
    .catch((err) => {
        console.log(err)
    })

const organizations = (length) => {
    const organizations = []

    for (let i = 0; i < length; i++) {
        organizations.push({
            name: `Organization ${i+1}`
        })
    }

    return organizations
}

const users = (length) => {
    const users = [
        {
            organization: null,
            lastname: 'Georginot',
            firstname: 'Armelin',
            birth_date: '20/04/1997',
            birth_place: 'IHOSY',
            phone: '034 65 007 00',
            email: 'georgino197@gmail.com',
            password: '',
        }
    ]

    for (let i = 0; i < length; i++) {
        users.push({
            organization: null,
            lastname: `Lastname_${i+1}`,
            firstname: `Firstname_${i+1}`,
            birth_date: '20/04/1997',
            birth_place: `City_${i+1}`,
            phone: '034 65 007 00',
            email: `email_${i+1}@mail.com`,
            password: '',
        })
    }

    return users
}

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

const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const swipeDB = async () => {
    await Organization.deleteMany({})
    await User.deleteMany({})
    await Category.deleteMany({})
    await SubCategory.deleteMany({})
    await Product.deleteMany({})
}

const seedOrganization = async () => {
    await Organization.insertMany(organizations(2))
}

const seedUser = async () => {
    const organizationsCreated = await Organization.find()
    const organization = organizationsCreated[rand(0, organizationsCreated.length - 1)]
    const allUsers = users(5);

    for (let i = 0 ; i < allUsers.length; i++) {
        const salt = await bcrypt .genSalt(10)
        const hashedPassword = await bcrypt.hash('1234567890', salt)
        allUsers[i].organization = organization._id
        allUsers[i].password = hashedPassword
        User.create(allUsers[i])
    }
}

const seedCategory = async () => {
    const organizationsCreated = await Organization.find()
    const allCategories = categories(2)
    for (let i = 0; i < organizationsCreated.length; i++) {
        for (let j = 0; j < allCategories.length; j++) {
            allCategories[j].organization = organizationsCreated[i]
            Category.create(allCategories[j])
        }
    }
}

const seedSubCategory = async () => {
    const organizationsCreated = await Organization.find()
    const categoriesCreated = await Category.find()
    const allSubCategories = subCategories(2)
    for (let i = 0; i < organizationsCreated.length; i++) {
        for (let j = 0; j < categoriesCreated.length; j++) {
            for (let k = 0; k < allSubCategories.length; k++) {
                allSubCategories[k].organization = organizationsCreated[i]
                allSubCategories[k].category = categoriesCreated[j]
                allSubCategories[k].name = `Sub Category ${k+1}_${j+1} `
                SubCategory.create(allSubCategories[k]) ///Verify
            }
        }
    }
}

const seedDB = async () => {
    await seedOrganization()
    await seedUser()
    await seedCategory()
    await seedSubCategory()
}

swipeDB().then(() => {
    console.log("Swiped !!")
})

seedDB().then(() => {
    console.log("Created")
})
