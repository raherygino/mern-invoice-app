const asyncHandler = require('express-async-handler')
const UploadFile = require('../services/uploadFile')

const uploadImageProduct = asyncHandler(async (req, res) => {
  try {
    await UploadFile(req, res);
    res.status(200).send({"filename": req.file.filename})
  } catch (error) {
    console.log(error)
  }
})

module.exports = {
    uploadImageProduct,
}