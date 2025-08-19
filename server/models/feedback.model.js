const mongoose = require('mongoose');
const feedbackSchema = new mongoose.Schema({
    feedback: {
        type: String,
        required: true,
    },
    userId: {
        type: String, // Fixed typo: 'tyepe' -> 'type'
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
    
}, { timestamps: true }); // Moved options object outside schema definition

module.exports = mongoose.model('Feedback', feedbackSchema); // Export the model