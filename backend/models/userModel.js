const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Organization',
    },

    lastname: {
      type: String,
      required: [true, 'Please add a lastname'],
    },

    firstname: {
      type: String,
      required: [true, 'Please add a firstname'],
    },
    
    birth_date: {
      type: String,
      required: [true, 'Please add a birth date'],
    },
    
    birth_place: {
      type: String,
      required: [true, 'Please add a birth place'],
    },

    phone: {
      type: String,
      required: [true, 'Please add a phone'],
    },

    email: {
      type: String,
      required: [true, 'Please add an aemail'],
      unique: true,
    },

    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
