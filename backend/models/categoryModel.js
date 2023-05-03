const mongoose = require('mongoose')

const organizationSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, 'Add name']
        },
    },
    {
      timestamps: true,
    }
)

module.exports = mongoose.model('Category', organizationSchema)