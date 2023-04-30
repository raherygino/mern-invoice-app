const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Please add name"]
        },
        
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
        }
    }
)