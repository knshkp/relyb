const mongoose=require("mongoose");
const storeSchema=new mongoose.Schema({
    vendor_id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    logo:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    DOB:{
        type:String,
        required:true
    },
    BusinessName:{
        type:String,
        required:true
    },
    BusinessEmail:{
        type:String,
        required:true
    },
    BusinessDesc:{
        type:String,
        required:true
    },
    BusinessLocation:{
        type:String,
        required:true
    },
    pin:{
        type:String,
        required:true
    },
    ServiceLocation:{
        type:{type:String,required:true},
        coordinates:[]
    },

});
storeSchema.index({ ServiceLocation: "2dsphere" });
module.exports = mongoose.model("Store", storeSchema);
