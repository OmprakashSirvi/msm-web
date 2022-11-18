/**
 * /*
 * Middleware to uplad images via multer
 *
 * @format
 */

const multer = require('multer');

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      console.log(`./public/${req.body.category}`);
      cb(null, `./public/${req.body.category}`);
   },
   filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg');
   },
});

const upload = multer({ storage: storage });

module.exports = upload;
