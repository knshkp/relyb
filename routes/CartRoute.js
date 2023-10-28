const express=require("express")
const cart_route=express()
const bodyParser=require("body-parser")
cart_route.use(bodyParser.json())
cart_route.use(bodyParser.urlencoded({ extended: true }));
const cart_controller=require('../controllers/cartController.js')
cart_route.post('/buy_pro', cart_controller.addCart);
cart_route.get('/get_booked', cart_controller.getCart);
module.exports=cart_route;