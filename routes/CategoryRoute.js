const express=require("express")
const category_route=express()
const bodyParser=require("body-parser")
category_route.use(bodyParser.json())
category_route.use(bodyParser.urlencoded({ extended: true }));
const category_controller=require('../controllers/categoryController')
category_route.post('/add_category',category_controller.addCategory)
module.exports=category_route;