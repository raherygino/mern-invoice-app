const Organization = require('../models/organizationModel')

const organizations = (length) => {
    const organizations = []

    for (let i = 0; i < length; i++) {
        organizations.push({
            name: `Organization ${i+1}`
        })
    }

    return organizations
}



const seedOrganization = async (length) => {
    await Organization.insertMany(organizations(length))
}

module.exports = seedOrganization