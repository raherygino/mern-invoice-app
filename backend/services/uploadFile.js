const util = require("util")
const multer = require("multer")
const path = require('path')
const maxSize = 2 * 1024 * 1024;

const storage = (location) => { return multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,location);
  },
  filename: (req, file, cb) => {
    cb(null, `IMG_${Date.now()+path.extname(file.originalname)}`);
  },
})
}

let uploadFile = multer({
  storage: storage("./backend/uploads/"),
  limits: { fileSize: maxSize },
});

let uploadFileMiddleware = util.promisify(uploadFile.single("image"));
module.exports = uploadFileMiddleware;
