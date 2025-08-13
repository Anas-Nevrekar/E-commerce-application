
const mongoose = require('mongoose');

// const uri = 'mongodb://localhost:27017/E-commerce-application'; // Replace with your Compass connection string

const uri = "mongodb+srv://nevrekaranas:BTOfzpZg90OgC8OJ@cluster0.trjwbhk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


mongoose.connect(uri, { // Options for the connection
  useUnifiedTopology: true  // Use the new URL string parser and unified topology
}) // unified topology means that the driver will use a single connection pool for all operations, which is more efficient.
.then(() => console.log('MongoDB connected')) // Log success message when connected
.catch(err => console.error('MongoDB connection error:', err)); // Log error message if connection fails

module.exports = mongoose;