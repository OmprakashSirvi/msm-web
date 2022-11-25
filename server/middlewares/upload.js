/**
 * /*
 * Middleware to uplad images via multer
 *
 * @format
 */

const path = require('path');
const multer = require('multer');

//Setting storage engine
const storageEngine = multer.diskStorage({
  destination: './public/images',
  filename: (req, file, cb) => {
    cb(null, `./${req.body.category}/${Date.now()}--${file.originalname}`);
  },
});

const checkFileType = function (file, cb) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png|gif|svg/;
  console.log('checking file type');

  //check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb('Error: You can Only Upload Images!!');
  }
};

//initializing multer
const upload = multer({
  storage: storageEngine,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

module.exports = upload;
