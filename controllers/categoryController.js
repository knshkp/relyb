const Category = require("../models/CategoryModel");
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your API credentials
cloudinary.config({
  cloud_name: "dyukjqemj",
  api_key: "975334944781146",
  api_secret: "USmTRR4C6ly_RDh-82Y8rhMIMzc",
});
const addCategory = async (req, res) => {
    try {
        // Check if the category already exists
        const existingCategory = await Category.findOne({ category: req.body.category.toLowerCase() });

        // Upload images to Cloudinary
        const categoryImageUpload = await cloudinary.uploader.upload(req.files['categoryImage'][0].path);
        const bannerImageUpload = await cloudinary.uploader.upload(req.files['bannerImage'][0].path);

        if (existingCategory) {
            res.status(200).send({ success: true, msg: "This Category is already Found" });
        } else {
            // Create a new category
            const category = new Category({
                category: req.body.category.toLowerCase(),
                categoryImage: categoryImageUpload.secure_url,
                bannerImage: bannerImageUpload.secure_url
            });

            // Save the new category
            const cat_data = await category.save();

            res.status(200).send({ success: true, msg: "Category Data", data: cat_data });
        }
    } catch (error) {
        console.error("Error adding category:", error);
        res.status(400).send({ success: false, msg: "Error adding category", error: error.message });
    }
};

const getCategory=async(req,res)=>{
    try {
        return Category.find();
    } catch (error) {
        res.status(400).send({ success: false, msg: "Error getting category", error: error.message });
    }
}
const getCategoryResult = async (req, res) => {
    try {
        // You need to use await here to wait for the Category.find() query to complete.
        const cat_data = await Category.find();
        let category_result = [];

        // The result of Category.find() is an array, so you can directly iterate over it.
        for (let i = 0; i < cat_data.length; i++) {
            category_result.push({
                "categoryName": cat_data[i]['category'],
                "categoryImage": cat_data[i]['categoryImage']
            });
        }

        res.status(200).send({ success: true, msg: "Category Data", data: category_result });
    } catch (error) {
        res.status(400).send({ success: false, msg: "Error getting category", error: error.message });
    }
}

module.exports = {
    addCategory,
    getCategory,
    getCategoryResult
};
