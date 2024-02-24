const express=require("express")
const product_route=express()
const multer=require("multer")

const path = require("path");
const bodyParser=require("body-parser")
product_route.use(bodyParser.json())
product_route.use(bodyParser.urlencoded({ extended: true }));
product_route.use(express.static('public'));
const product_controller=require('../controllers/productController')
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
product_route.post('/add_product', upload.single('productImage'), product_controller.addProduct);
product_route.get('/get_product',product_controller.getProduct)
product_route.get('/search_product',product_controller.searchProduct)
product_route.get('/get_product_price',product_controller.getProductViaPrice)
product_route.get('/get_product_discount',product_controller.getProductViaDiscount)

module.exports=product_route;