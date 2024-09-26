const express = require('express');
const authenticateJWT=require('../middleware/Authorize')
const router = express.Router();
const {
    registerUser,
    loginUser,
    getCurrentUser,
    getAllUsers
} = require('../controller/userController');
 
router.get('/', getAllUsers);
 
router.post('/register', registerUser);
 
router.post('/login', loginUser);
router.get('/me',authenticateJWT, getCurrentUser);

module.exports = router;
