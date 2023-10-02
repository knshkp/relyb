const Category = require("../models/CategoryModel");

const addCategory = async (req, res) => {
    try {
        // Check if the category already exists
        const existingCategory = await Category.findOne({ category: req.body.category.toLowerCase() });

        if (existingCategory) {
            res.status(200).send({ success: true, msg: "This Category is already Found" });
        } else {
            // Create a new category
            const category = new Category({
                category: req.body.category.toLowerCase()
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

module.exports = {
    addCategory,
    getCategory
};
