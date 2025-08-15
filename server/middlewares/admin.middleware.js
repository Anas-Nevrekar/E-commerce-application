const user = require("../models/user.model"); // Importing the user model

const adminMiddleware = (req, res, next) => {
    // Check if user is authenticated and is admin
    if (req.user && req.user.username === "admin") {
        return next();
    }
    return res.status(403).json({ error: "Access denied" });
};

module.exports = adminMiddleware; // Exporting the admin middleware for use in routes
// This middleware checks if the user is an admin by verifying the username