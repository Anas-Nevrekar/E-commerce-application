const User = require('../models/user.model'); // Importing the User model to interact with the database
const {authMiddleware, generateToken} = require('../middlewares/jwt.middleware'); // Importing the JWT middleware for authentication

const Product = require('../models/product.model'); // Importing the Product model to interact with products in the database
const Feedback = require('../models/feedback.model'); // Add this at the top

exports.showHome = async (req, res) => {
    const user = req.user.username;
    const message = "Welcome to home page " + user;
    try {
        const userdb = await User.findOne({ username: user }); // Find the user by username from the authenticated request
        if (!userdb) {
            console.error("User not found:", user);
            return res.status(404).send("User not found");
        }
        const products = await Product.find();
        // Get the user's cart product IDs as strings (assuming add_to_cart is an array of ObjectIds)
        const cartProductIds = userdb.add_to_cart ? userdb.add_to_cart.map(id => id.toString()) : [];
        res.render("homePage", { message, products, user, cartProductIds });
    } catch (error) {
        console.error("Error in showHome:", error);
        res.render("homePage", { message, products: [], user, cartProductIds: [] });
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

exports.showProductDetails = async (req, res) => {
    const user = req.user.username;
    const productId = req.params.id;
    const item = await Product.findById(productId);

    const userdb = await User.findOne({ username: user });
    const cartProductIds = userdb.add_to_cart ? userdb.add_to_cart.map(id => id.toString()) : [];

    // Find all feedbacks for this product
    const feedbacksRaw = await Feedback.find({ productId });

    // For each feedback, get the username from User model
    const feedbacks = await Promise.all(feedbacksRaw.map(async fb => {
        const userObj = await User.findById(fb.userId);
        return {
            username: userObj ? userObj.username : "Unknown",
            feedback: fb.feedback,
            rating: fb.rating,
            createdAt: fb.createdAt
        };
    }));
    

    res.render("productPage", { item, user, cartProductIds, feedbacks });
}

// Update product details (only by admin)
exports.updateProduct = async (req, res) => {
    const productId = req.params.id; // Get the product ID from the request parameters
    const { productName, productDescription, productPrice, productImage } = req.body; // Destructure the updated product details from the request body

    try {
        // Find the product by ID and update it with the new details
        await Product.findByIdAndUpdate(productId, {
            productName,
            productDescription,
            productPrice,
            productImage
        });
        res.redirect('/home'); // Redirect to the home page after updating the product
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send("Internal Server Error"); // Send an error response if something goes wrong
    }
};

//delete product
exports.deleteProduct = async (req, res) => {
    const productId = req.params.id; // Get the product ID from the request parameters

    try {
        // Find the product by ID and delete it
        await Product.findByIdAndDelete(productId);
        res.redirect('/home'); // Redirect to the home page after deleting the product
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send("Internal Server Error"); // Send an error response if something goes wrong
    }
};


//add to cart feature
exports.addToCart = async (req, res) => {
    const user = req.user.username;
    const productId = req.params.id;
    const userdb = await User.findOne({ username: user });

    // Only add if not already in cart
    if (!userdb.add_to_cart.includes(productId)) {
        userdb.add_to_cart.push(productId);
        await userdb.save();
    }

    // If referrer is product page, redirect back to product page, else home
    if (req.headers.referer && req.headers.referer.includes(`/home/product/${productId}`)) {
        res.redirect(`/home/product/${productId}`);
    } else {
        res.redirect('/home');
    }
};

//remove from the cart feature
exports.removeFromCart = async (req, res) => {
    const user = req.user.username;
    const productId = req.params.id;
    const userdb = await User.findOne({ username: user });

    userdb.add_to_cart.pull(productId);
    await userdb.save();

    // If referrer is product page, redirect back to product page, else home
    if (req.headers.referer && req.headers.referer.includes(`/home/product/${productId}`)) {
        res.redirect(`/home/product/${productId}`);
    } else {
        res.redirect('/home');
    }
};

// User profile feature
exports.userProfile = async (req, res) => {
    const user = req.user.username;
    
    // Find user by username
    const userDb = await User.findOne({ username: user });

    // Fetch products in user's cart
    let cartProducts = [];
    if (userDb && userDb.add_to_cart && userDb.add_to_cart.length > 0) {
        cartProducts = await Product.find({ _id: { $in: userDb.add_to_cart } });
    }

    res.render("profilePage", { user: userDb, cartProducts }); // Send cart products to frontend
}

exports.updateProfile = async (req, res) => {
    const user = req.user.username; // Get the username from the authenticated user
    const { address } = req.body; // Destructure the updated profile details from the request body
    

    try {
        const user_col = await User.findOne({ username: user });

    
        user_col.address = address;
        
        await user_col.save(); // Save the updated user document
        
        res.redirect('/home/profile'); // Redirect to the profile page after updating
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).send("Internal Server Error"); // Send an error response if something goes wrong
    }
};


//Buy Product page
exports.buyPage = async (req, res) => {
    const productId = req.params.id; // Get the product ID from the request parameters
    const product = await Product.findById(productId); // Find the product by ID
    if (!product) {
        return res.status(404).send("Product not found"); // Handle case where product does not exist
    }
    res.render("buyPage", { product }); // Render the buy page with the product details
}

// Confirm BUY product
exports.confirmBuy = async (req, res) => {
    const productId = req.params.id; // Get the product ID from the request parameters
    const user = req.user.username; // Get the username from the authenticated user

    const userdb = await User.findOne({ username: user }); // Find the user by username from the authenticated request
    userdb.orders.push(productId); // Add the product ID to the user's orders
    console.log(userdb.orders)
    res.redirect("/home");
}

// Show buy cart page
exports.buyCartPage = async (req, res) => {
    const user = req.user.username;
    const userDb = await User.findOne({ username: user });
    let cartProducts = [];
    let total = 0;
    if (userDb && userDb.add_to_cart && userDb.add_to_cart.length > 0) {
        cartProducts = await Product.find({ _id: { $in: userDb.add_to_cart } });
        total = cartProducts.reduce((sum, p) => sum + (p.productPrice || 0), 0);
    }
    res.render("buyCartPage", { cartProducts, total });
};

// Confirm buy cart
exports.confirmBuyCart = async (req, res) => {
    const user = req.user.username;
    const userDb = await User.findOne({ username: user });
    if (userDb && userDb.add_to_cart && userDb.add_to_cart.length > 0) {
        // Add all cart products to orders
        userDb.orders = userDb.orders.concat(userDb.add_to_cart);
        // Clear the cart
        userDb.add_to_cart = [];
        await userDb.save();
    }
    res.redirect("/home");
};

