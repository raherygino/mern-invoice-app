const mongoose = require('mongoose')

const subCategorySchema = mongoose.Schema(
    {
        organization: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Organization',
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Category',
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

module.exports = mongoose.model('SubCategory', subCategorySchema)