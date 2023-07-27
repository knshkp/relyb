const express = require("express");
const store_route = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

store_route.use(bodyParser.json());
store_route.use(bodyParser.urlencoded({ extended: true }));
store_route.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/storeImages'));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const upload = multer({ storage: storage });
const auth = require('../middleware/auth');
const store_controller = require('../controllers/storeController');

store_route.post('/create_store', auth, upload.single('logo'), store_controller.create_store);

module.exports = store_route;
