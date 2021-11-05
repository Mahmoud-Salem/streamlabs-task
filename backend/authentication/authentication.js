// authentication model that has check twitch token and generate a jwt token

import jwt from 'jsonwebtoken';
import config  from '../config.js';
import axios from 'axios';
import prisma from '../database.js';

const controllers =
{ 
    // check twitch token is valid and get the username from the response
    checkTwitchToken: async (req, res) =>
    {
        const token = req.get('twitch-token');
        if(!token)
            res.status(401).json({message:'No token is provided'});
        
        var twitchURL = config.TWITCH_AUTH ; 
        const result = await axios.get(twitchURL,{
            headers:{
                'Authorization': 'Bearer '+token 
            }
        });
        if(result.data.login)
        {
            // generate a jwt token that expires in 1 hour using username
            const accessToken = jwt.sign({ username :result.data.login }, config.JWT_SECRET, { expiresIn: '1h'});
            const user = {
                username : result.data.login
            };
            prisma.user.create({ data: user }).then(
                    res => {console.log('user created !!')}
                );
            
            res.status(200).json({token : accessToken});
            
        }else {
            res.status(401).json({message:'Invalid Token'});
        }
    },

    // login function to login and verify token
    login: async (req, res) =>
    {
        const token = req.get('token');
        jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
            if(err){
                return next({status: 401, message: 'Invalid Token'})
            }
            else{
                res.status(200).json({username : decoded.username});
            }
        });
    },

}

export default controllers;