const jwt = require('jsonwebtoken');

// Middleware to protect routes
const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) return res.sendStatus(403);
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // console.log(token);
        
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports=authenticateJWT