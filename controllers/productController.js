const Product=require("../models/ProductModel")
const categoryController=require("../controllers/categoryController")
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your API credentials
cloudinary.config({
  cloud_name: "dyukjqemj",
  api_key: "975334944781146",
  api_secret: "USmTRR4C6ly_RDh-82Y8rhMIMzc",
});
const addProduct=async(req,res)=>{
  const cloudinaryUpload = await cloudinary.uploader.upload(req.file.path);
    try {
        var product=new Product({
            name:req.body.name,
            price:req.body.price,
            productImage: cloudinaryUpload.secure_url,
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
      var cat_data = await categoryController.getCategory();
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
                "description":cat_pro[j]['description'],
                "productImage":cat_pro[j]['productImage']
              });
            }
          }
          send_data.push({
            "category": cat_data[i]['category'],
            "categoryImage":cat_data[i]['categoryImage'],
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
  const getProductViaPrice = async (req, res) => {
    try {
        const maxPrice = req.query.maxPrice; // Assuming maxPrice is passed as a query parameter
        var send_data = [];
        var cat_data = await categoryController.getCategory();

        if (cat_data.length > 0) {
            for (let i = 0; i < cat_data.length; i++) {
                var product_data = [];
                var cat_id = cat_data[i]['_id'].toString();
                var cat_pro = await Product.find({ category_id: cat_id, price: { $lte: maxPrice } }); // Filter by price

                if (cat_pro.length > 0) {
                    for (let j = 0; j < cat_pro.length; j++) {
                        product_data.push({
                            "product_name": cat_pro[j]['name'],
                            "product_price": cat_pro[j]['price'],
                            "discount": cat_pro[j]['discount'],
                            "description": cat_pro[j]['description'],
                            "productImage": cat_pro[j]['productImage']
                        });
                    }
                }
                send_data.push({
                    "category": cat_data[i]['category'],
                    "categoryImage": cat_data[i]['categoryImage'],
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
const getProductViaDiscount = async (req, res) => {
  try {
      const maxDiscount = req.query.discount; // Assuming maxPrice is passed as a query parameter
      var send_data = [];
      var cat_data = await categoryController.getCategory();

      if (cat_data.length > 0) {
          for (let i = 0; i < cat_data.length; i++) {
              var product_data = [];
              var cat_id = cat_data[i]['_id'].toString();
              var cat_pro = await Product.find({ category_id: cat_id, discount: maxDiscount }); // Filter by price

              if (cat_pro.length > 0) {
                  for (let j = 0; j < cat_pro.length; j++) {
                      product_data.push({
                          "product_name": cat_pro[j]['name'],
                          "product_price": cat_pro[j]['price'],
                          "discount": cat_pro[j]['discount'],
                          "description": cat_pro[j]['description'],
                          "productImage": cat_pro[j]['productImage']
                      });
                  }
              }
              send_data.push({
                  "category": cat_data[i]['category'],
                  "categoryImage": cat_data[i]['categoryImage'],
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
    searchProduct,
    getProductViaPrice,
    getProductViaDiscount
}