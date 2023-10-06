var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    category_id: {
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    productImage:{
        type:String
    }
});

module.exports = mongoose.model('Product', productSchema);
