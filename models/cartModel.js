const mongoose=require("mongoose")
const cartSchema=mongoose.Schema({
    customer_phone:{
        type:Number,
        required:true
    },
    product_name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }

});
module.exports=mongoose.model("Cart",cartSchema);