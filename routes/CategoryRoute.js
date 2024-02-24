const express=require("express")
const multer=require("multer")
const path = require("path");
const category_route=express()
const bodyParser=require("body-parser")
category_route.use(bodyParser.json())
category_route.use(bodyParser.urlencoded({ extended: true }));
category_route.use(express.static('public'));
const category_controller=require('../controllers/categoryController')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/categoryImages'));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});
const upload = multer({ storage: storage });
category_route.post(
    '/add_category',
    upload.fields([
      { name: 'categoryImage', maxCount: 1 }, // Handle single file upload for 'categoryImage'
      { name: 'bannerImage', maxCount: 1 },   // Handle single file upload for 'bannerImage'
      // Add more fields as needed
    ]),
    category_controller.addCategory
  );
  category_route.get('/get_category',category_controller.getCategoryResult)
module.exports=category_route;