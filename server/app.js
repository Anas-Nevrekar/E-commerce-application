const express = require('express'); 
const app = express(); // Create an Express application instance
const port = process.env.PORT || 3000; 
const cookieParser = require('cookie-parser');

// Importing mongoose for database connection
const mongoose = require('mongoose');
require('./config/db.config');

//importing ejs
app.set('view engine', 'ejs'); // Set EJS as the template engine
app.set('views', './views'); // Set the directory for views


//Middlewares
app.use(express.json()); // Middleware to parse  JSON bodies.  
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cookieParser()); // Middleware to parse cookies



// Importing the login routes
const loginRoutes = require('./routes/login.routes');
const homeRoutes = require('./routes/home.routes');
app.use('/', loginRoutes); // link the login routes to the '/login' path
app.use("/home", homeRoutes); 


// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`My app listening on port ${port}`);
});