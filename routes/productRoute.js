const express=require("express")
const product_route=express()
const bodyParser=require("body-parser")
product_route.use(bodyParser.json())
product_route.use(bodyParser.urlencoded({ extended: true }));
const product_controller=require('../controllers/productController')
product_route.post('/add_product',product_controller.addProduct)
module.exports=product_route;