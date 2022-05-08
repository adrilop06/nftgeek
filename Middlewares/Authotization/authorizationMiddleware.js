const asyncHandler = require('express-async-handler');

const jwt = require ("jsonwebtoken");

const User = require("../../Model/User/user");

const authorizationMiddleware = asyncHandler(async(req, res,next) => {
    let token;
    //check the header or the token
    if(req?.headers?.authorization?.startsWith("GEEK")){
        try {
            //split the token
            token = req.headers.authorization.split(' ')[1];
            if(token){
                const decoded = jwt.verify(token,process.env.JWT_KEY);
                //find user by id
                const user = await User.findById(decoded?.id).select("-password");
                //attach the user to request object
                req.user = user;
                //we need go next after the middleware
                next();
            }
        }catch(error){
            throw new Error ('Not authorized token');
        }
    }else{
        throw new Error ('There is no token attached to the header');
    }
});

//exports 
module.exports = authorizationMiddleware;