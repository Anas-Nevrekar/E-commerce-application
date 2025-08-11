var jwt = require("jsonwebtoken"); // Importing the jsonwebtoken library


const authMiddleware = (req, res, next) => { // Middleware to check for JWT token
  // Check if the token is present in cookies
  const token = req.cookies.token;

  if (!token) { // If no token is found, return an error response
    return res.status(401).json({ error: "Token not found" });
  }

  try {
    const decode = jwt.verify (token, "abcd"); // Verify the token using the secret key
    // console.log(decode)
    req.user = decode; // Attach the decoded user information to the request object
    // This allows the next middleware or route handler to access user information
    // console.log(req.user)
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
};

const generateToken = (data)=>{ // Function to generate a JWT token
  // The data parameter can be any object containing user information
  // The token is signed with a secret. 
    return jwt.sign(data, "abcd"); 
}

module.exports = {authMiddleware, generateToken}