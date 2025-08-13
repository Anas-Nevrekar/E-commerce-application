const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String, // Fixed typo: 'tyepe' -> 'type'
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productImage: {
        type: String,
        required: true,
    }
}, { timestamps: true }); // Moved options object outside schema definition

module.exports = mongoose.model('Product', productSchema); // Export the model