const User = require('../models/user.model'); // Importing the User model to interact with the database
const {authMiddleware, generateToken} = require('../middlewares/jwt.middleware'); // Importing the JWT middleware for authentication
const bcrypt = require('bcrypt'); // Importing bcrypt for password hashing

// Render the login view using EJS
exports.showLoginPage = async (req, res) => {
  res.render('loginPage'); 
}   

// logic to implement login feature 
exports.handleLogin = async (req, res) => {
   const username = req.body.username;
   const password = req.body.password.trim();
  try {
      const user = await User.findOne({ username: username });
      if (!user) {
        console.log("No such user");
          return res.redirect("/loginPage");
      }
      //const isMatch= await User.comparePassword(password);
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("Incorrect password");
          return res.redirect("/loginPage");
      }
      const token = generateToken({ username: username });
      res.cookie('token', token, { httpOnly: true });
      return res.redirect("/home");
  } catch (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
  }
}


// Logic to handle user sign-in
exports.handleSignin = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password.trim();

  //const { username, email, password } = req.body;
  try
  {
      const ExistingUser = await User.findOne({ email: email, username: username });

      if(ExistingUser) 
        {
          return res.redirect("/loginPage");
        }
      else
        {
          const hash_password = await bcrypt.hash(password, 10); // Hash the password using bcrypt
          const newUser = new User({
              username: username,
              email: email,
              password: hash_password
          });
          await newUser.save(); // Save the new user to the database
          const token = generateToken({ username: username}); // Generate a JWT token for the user
          res.cookie('token', token, { httpOnly: true }); // Set the token in cookies
          return res.redirect("/home"); // Redirect to the login page after successful sign-in
        }
  }catch(err) {
    console.error(err);
    return res.status(500).send("Internal Server Error"); 
  }
}

exports.signout = async (req, res) => {
  res.clearCookie('token'); // Clear the JWT token cookie
  res.redirect('/loginPage'); // Redirect to the login page after logout
}
