const User = require('../models/user.model'); // Importing the User model to interact with the database
const {authMiddleware, generateToken} = require('../middlewares/jwt.middleware'); // Importing the JWT middleware for authentication

exports.showHome = async (req, res) => {
    const message = "Welcome to home page " + req.user.username; // Accessing the username from the decoded JWT token
    res.render("homePage", {message}); // Render the login view using EJS
}