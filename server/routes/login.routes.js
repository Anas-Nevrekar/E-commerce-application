const express = require('express'); // Importing express to create a router
const router = express.Router(); 
const mongoose = require('mongoose'); // Importing mongoose for database operations



//Importing the User model
const User = require('../models/user.model'); // Importing the User model to interact with the


// Importing the controller
const loginController = require('../controllers/login.controller');
// Route to show the login page
router.get('/loginPage', loginController.showLoginPage); // Route to render the login pagedatabase

router.post('/handleSignin', loginController.handleSignin); // Route to handle user sign-in


router.get('/signout', loginController.signout); // Route to handle user logout

module.exports = router;