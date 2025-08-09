const express = require('express'); // Import the Express module
const app = express(); // Create an Express application instance
const port = 3000; // Define the port for the application

// Define a basic GET route for the root URL
app.get('/', (req, res) => {
  res.send('Hello World!'); // Send "Hello World!" as the response
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});