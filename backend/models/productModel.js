const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        organization: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Organization',
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
        name: {
            type: String,
            require: [true, 'Name required']
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Category',
        },
        sub_category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubCategory',
        },
        price: {
            type: Number,
            require: [true, 'Price required']
        },
        description:  {
            type: String,
            require: false,
        },
        image:  {
            type: String,
            require: false,
        }
    },
    {
      timestamps: true,
    }
)

module.exports = mongoose.model('Product', productSchema)