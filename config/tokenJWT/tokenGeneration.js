//require de jwt
const jwt = require ('jsonwebtoken');

const tokenGeneration = id => {
    //this create the tokens in base of user id, generate a key and expires the token
    return jwt.sign({id}, process.env.JWT_KEY, {expiresIn: "20d"});
};

module.exports = tokenGeneration; 