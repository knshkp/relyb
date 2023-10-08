const mongoose = require("mongoose");
const CategorySchema = mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    categoryImage:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model("category",CategorySchema)