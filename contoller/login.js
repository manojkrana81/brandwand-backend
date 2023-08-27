const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const getAccessToken =  ({username, password})=>{
    const privateKey = fs.readFileSync('private.key');
    const token = jwt.sign({username: username}, privateKey, { algorithm: 'RS256', expiresIn: '1h' });
    return token;
}
const login = async (req, res)=>{
    
    const {username, password} = req.body;

    // Check if User exists in the database
    const existingUser = await User.findOne({username: username});
    if(existingUser!=null){
        bcrypt.compare(password, existingUser.password, function(err, result){
            if(err){
                console.log(err);
            }
            else{
                if(result){
                    // password matched
                    // Generate access token
                    const token = getAccessToken({username, password});

                    // Store token in DB
                    User.findOneAndUpdate({username: username}, {
                        accessToken: token 
                    })
                    .then(resp=>{
                        return res.status(200).json({
                            status: 'ok',
                            message: `Logged in successfully`,
                            data: token
                        });
                    }).catch(err=>{
                        return res.status(200).json({
                            status: 'error',
                            message: err.message,
                            data:''
                        });
                    });
                }
                else{
                    return res.status(200).json({
                        status: 'error',
                        message: 'Invalid Credentials',
                        data:''
                    });
                }
            }
        });
    }
    else{
        return res.status(200).json({
            status: 'error',
            message: 'Invalid Credentials',
            data:''
        });
    }
}

module.exports = {
    login
};