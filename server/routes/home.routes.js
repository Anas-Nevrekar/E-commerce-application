const express = require('express'); // Importing express to create a router
const router = express.Router(); 
const mongoose = require('mongoose'); // Importing mongoose for database operations
const {authMiddleware, generateToken} = require('../middlewares/jwt.middleware'); // Importing the JWT middleware for authentication
// Importing the controller
const adminMiddleware = require('../middlewares/admin.middleware'); // Importing the admin middleware to check for admin access
const homeController = require('../controllers/home.controller');
//Importing the User model

router.get('/', authMiddleware, homeController.showHome); // Route to render the home page after authentication

router.post("/addProduct", authMiddleware, adminMiddleware, homeController.addProduct); // Route to add a new product, requires authentication

router.get("/product/:id", authMiddleware, homeController.showProductDetails); // Route to show product details by ID, requires authentication

router.post("/product/update/:id", authMiddleware, adminMiddleware, homeController.updateProduct); // Route to update product details, requires authentication and admin access

router.post("/product/delete/:id", authMiddleware, adminMiddleware, homeController.deleteProduct); // Route to delete a product, requires authentication and admin access

router.get("/profile", authMiddleware, homeController.userProfile); // Route to show user profile, requires authentication

module.exports = router;