//User Model
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({ // Define the schema for the user model
    username: { 
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: ''
    },
    add_to_cart: {
        type: Array,
        default: []
    },
    orders: {
        type: Array,
        default: []
    },
}, {timestamps: true}); // Add timestamps to the schema. So that it will automatically add createdAt and updatedAt fields.

module.exports = mongoose.model('User', userSchema);