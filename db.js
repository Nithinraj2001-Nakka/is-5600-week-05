const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017/?authSource=admin';

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => {
        console.log('Successfully connected to MongoDB!');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });

module.exports = mongoose;

