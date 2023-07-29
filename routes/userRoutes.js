const express = require("express");
const user_route = express();
const bodyParser = require("body-parser");
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));
const multer = require("multer");
const path = require("path");
user_route.use(express.static('public'));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/userImages'));
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname;
    cb(null, name);
  }
});

const upload = multer({ storage: storage });
const user_controller = require("../controllers/userController");

user_route.post('/register', upload.single('image'), user_controller.register_user);
user_route.post('/login', user_controller.user_login);
const auth=require("../middleware/auth")
user_route.get('/test',auth,function(req,res){
  res.status(200).send({success:true,msg:"Authenticated"})
});
// user_route.post('/update-password',auth,user_controller.update_password);
module.exports = user_route;