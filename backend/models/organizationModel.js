const mongoose = require('mongoose')

const organizationSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, 'Add name']
        },/*
        
        logo: {
            type: String,
            require: false,
        },

        description: {
            type: String,
            require: false,
        },

        siteweb: {
            type: String,
            require: false,
        },

        email: {
            type: String,
            require: false
        },

        address: {
            type: String,
            require: false,
        },

        phone: {
            type: String,
            require: false
        }*/
    },
    {
      timestamps: true,
    }
)

module.exports = mongoose.model('Organization', organizationSchema)