const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
    {
        organization: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Organization',
        },
        name: {
            type: String,
            require: [true, 'Name required']
        },
    },
    {
      timestamps: true,
    }
)

module.exports = mongoose.model('Category', categorySchema)