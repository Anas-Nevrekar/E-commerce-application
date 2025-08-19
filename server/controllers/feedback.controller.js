const User = require('../models/user.model'); // Importing the User model to interact with the database
const Product = require('../models/product.model'); // Importing the Product model to interact with products in the database
const Feedback = require('../models/feedback.model'); // Importing the Feedback model to interact with feedback in the database

exports.addFeedback = async (req, res) => {
    const userFeedback = req.body.feedback; // Get the feedback from the request body
    const userName = req.user.username; // Get the username from the authenticated user
    const productId = req.params.id; // Get the product ID from the request parameters

    const user= await User.findOne({ username: userName });
    const product= await Product.findById(productId);


    const feedback = new Feedback({
        feedback: userFeedback,
        userId: user._id,
        productId: product._id,
        
    });

    await feedback.save();
    res.redirect(`/home/product/${productId}`); // Redirect to the product details page after adding feedback
}