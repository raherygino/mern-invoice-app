const User = require('../models/userModel')
const Organization = require('../models/organizationModel')
const bcrypt = require('bcryptjs')
const { rand } = require('../utils/functions')

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

const seedUser = async (length) => {
    const organizationsCreated = await Organization.find()
    const allUsers = users(length);

    for (let i = 0 ; i < allUsers.length; i++) {
        const salt = await bcrypt .genSalt(10)
        const hashedPassword = await bcrypt.hash('1234567890', salt)
        const organization = organizationsCreated[rand(0, organizationsCreated.length - 1)]

        allUsers[i].organization = organization._id
        allUsers[i].password = hashedPassword
        User.create(allUsers[i])
    }
}

module.exports = seedUser