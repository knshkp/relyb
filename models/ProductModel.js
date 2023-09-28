var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    vendor_id: {
        type: String,
        required: true
    },
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
    cat_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);
