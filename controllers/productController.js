const Product=require("../models/ProductModel")
const addProduct=async(req,res)=>{
    try {
        var product=new Product({
            vendor_id:req.body.vendor_id,
            name:req.body.name,
            price:req.body.price,
            discount:req.body.discount,
            category_id:req.body.category_id
        })
        const productData=await product.save();
        res.status(200).send({success:true,msg:"Product Details",data:productData})

    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
}
module.exports={
    addProduct
}