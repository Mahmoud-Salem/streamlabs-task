import jwt from 'jsonwebtoken';
import config  from '../config.js';

// middleware function to be called before each request to authenticate user.
const isLoggedIn = function(req, res,next) {
    const token = req.get('token');
    if(!token)
        return res.status(401).json({mesage:'No token provided'});
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(401).json({mesage:'Invalid token'});
        }
        else{
            next();
        }
    });
}

export default isLoggedIn ;