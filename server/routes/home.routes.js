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

router.post("/addToCart/:id", authMiddleware, homeController.addToCart); // Route to add a product to the user's cart, requires authentication

router.post("/removeFromCart/:id",authMiddleware, homeController.removeFromCart); // Route to remove a product from the user's cart, requires authentication

router.get("/profile", authMiddleware, homeController.userProfile); // Route to show user profile, requires authentication

router.post("/updateProfile", authMiddleware, homeController.updateProfile); // Route to update user profile, requires authentication

router.get("/buy/:id", authMiddleware, homeController.buyPage); // Route to render the buy page for a product, requires authentication
router.post("/buy/:id", authMiddleware, homeController.confirmBuy); // Route to confirm the purchase of a product, requires authentication

router.get("/buyCart", authMiddleware, homeController.buyCartPage); // Show buy cart page
router.post("/buyCart", authMiddleware, homeController.confirmBuyCart); // Confirm buy cart

module.exports = router;