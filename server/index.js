const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes'); // Adjust the path as necessary
const cors=require('cors');
const router = require('./routes/paymentRouter');
dotenv.config(); // Load environment variables from .env file
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors())
app.use('/api/user', userRoutes);
app.use('/api/payments', router);
main().catch(err => console.log(err));

async function main() {
    let mongo_url = process.env.mongo_url;

    await mongoose.connect(mongo_url);
    console.log('DB Connected successfully');
}

app.get('/', (req, res) => {
    res.send('Welcome to the User Authentication API!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
