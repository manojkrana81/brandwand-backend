const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('private.key');

const verifyToken = (req, res, next)=>{

    const authHeader = req.headers['authorization'];  // Bearer xyztokenvalue
    const token = authHeader && authHeader.split(" ")[1];

    // Check if token is empty
    if(!token){
        return res.status(200).json({
            status: 'error',
            message: 'Invalid token',
            data: ''
        });
    }

    // Check if the token is valid
    // Use process.env.JWT_SECRET in production
    jwt.verify(token, privateKey, (err, user)=>{
        if(err){
            return res.status(200).json({
                status: 'error',
                message: 'Invalid token',
                data: ''
            });
        }
        else{
            // req.user = user;
            next();
        }
    });
}

module.exports = verifyToken;