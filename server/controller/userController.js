const User = require('../model/userModel');
const jwt = require('jsonwebtoken');


// GET all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Register user
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        res.status(400).json({ error: 'Username or email already exists' });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

// Get current user info
const getCurrentUser = async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.sendStatus(404);
    res.json(user);
};

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
    getAllUsers,
     // Export middleware if needed in routes
};
