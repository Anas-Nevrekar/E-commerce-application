const express = require('express'); // Importing express to create a router
const router = express.Router(); 
const mongoose = require('mongoose'); // Importing mongoose for database operations
const {authMiddleware, generateToken} = require('../middlewares/jwt.middleware'); // Importing the JWT middleware for authentication
// Importing the controller
const homeController = require('../controllers/home.controller');
//Importing the User model

router.get('/', authMiddleware, homeController.showHome); // Route to render the home page after authentication

router.post("/addProduct", authMiddleware, homeController.addProduct); // Route to add a new product, requires authentication


module.exports = router;