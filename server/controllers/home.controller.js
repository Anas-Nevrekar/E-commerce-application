const User = require('../models/user.model'); // Importing the User model to interact with the database
const {authMiddleware, generateToken} = require('../middlewares/jwt.middleware'); // Importing the JWT middleware for authentication

const Product = require('../models/product.model'); // Importing the Product model to interact with products in the database

exports.showHome = async (req, res) => {
    const user = req.user.username;
    const message = "Welcome to home page " + req.user.username;
    try {
        const products = await Product.find(); // Fetch all products
        res.render("homePage", { message, products, user }); // Pass products to the view
    } catch (error) {
        console.error("Error fetching products:", error);
        res.render("homePage", { message, products: [], user }); // Pass empty array on error
    }
}

//Adding a new product
exports.addProduct = async (req, res) => {
    try {
        const { productName, productDescription, productPrice, productImage } = req.body; // Destructure the product details from the request body

        // Create a new product instance
        const newProduct = new Product({
            productName,
            productDescription,
            productPrice,
            productImage
        });

        // Save the new product
        await newProduct.save();
        res.redirect('/home'); // Redirect to the home page after adding the product
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).send("Internal Server Error"); // Send an error response if something goes wrong
    }
}