const Product=require("../models/ProductModel")
const categoryController=require("../controllers/categoryController")
const addProduct=async(req,res)=>{
    try {
        var product=new Product({
            vendor_id:req.body.vendor_id,
            name:req.body.name,
            price:req.body.price,
            discount:req.body.discount,
            category_id:req.body.category_id,
            description:req.body.description
        })
        const productData=await product.save();
        res.status(200).send({success:true,msg:"Product Details",data:productData})

    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
}
const getProduct = async (req, res) => {
    try {
      var send_data = [];
      var cat_data = await categoryController.getCategory(); // Await the getCategory function call
      console.log(cat_data.length);
  
      if (cat_data.length > 0) {
        for (let i = 0; i < cat_data.length; i++) {
          var product_data = [];
          var cat_id = cat_data[i]['_id'].toString();
          var cat_pro = await Product.find({ category_id: cat_id });
  
          if (cat_pro.length > 0) {
            for (let j = 0; j < cat_pro.length; j++) {
              product_data.push({
                "product_name": cat_pro[j]['name'],
                "product_price": cat_pro[j]['price'],
                "discount": cat_pro[j]['discount'],
                "description":cat_pro[j]['description']
              });
            }
          }
          send_data.push({
            "category": cat_data[i]['category'],
            "product": product_data,
          });
        }
        res.status(200).send({ success: true, msg: "Product Details", data: send_data });
      } else {
        res.status(200).send({ success: false, msg: "No categories found", data: send_data });
      }
    } catch (error) {
      res.status(500).send({ success: false, msg: "Internal server error", data: send_data });
    }
  };
  const searchProduct=async(req,res)=>{
    try {
        var search=req.body.search;
        var productData=await Product.find({
            "name":{"$regex":".*"+search+".*"}
        })
        if(productData.length>0){
            res.status(200).send({ success: true, msg: "Data found", data: productData });

        }
        else{
            res.status(200).send({ success: true, msg: "Data not found" });
        }
    } catch (error) {
        res.status(500).send({ success: false, msg: "Internal server error", data: send_data });
    }
    }
module.exports={
    addProduct,
    getProduct,
    searchProduct
}