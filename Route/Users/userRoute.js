//expres route require first express
const express = require('express');

const cors = require("cors");
//import functions from controller object
const {userRegController, 
    userLogController,
    userDeleteController, 
    fetchUserController,
    fetchUserDetail,
    userProfileController,
    userUpdateController,
    userUpdatePassController,
    userPhotoController
    } = require ("../../Controller/Users/userController"); 
//import function from authorization middleware
const authorizationMiddleware = require('../../Middlewares/Authotization/authorizationMiddleware');
//import middelwares photo profile
const {fileImages, profileResize } = require('../../Middlewares/Upload/imgUpload');
//profile photo middleware
//call the function from express
const userRoutes = express.Router();

//reference de registration controller
userRoutes.post('/registration', cors(), fileImages.single("photo"),profileResize, userRegController);
//reference de login controller
userRoutes.post('/login', cors(), userLogController);
//photo profile
userRoutes.put('/profilephoto', cors(), authorizationMiddleware, fileImages.single("image"), profileResize, userPhotoController);
//get all users 
userRoutes.get('/', cors(), authorizationMiddleware, fetchUserController);
//change the password by the user
userRoutes.put('/password', cors(),authorizationMiddleware, userUpdatePassController);
//get the user profile
userRoutes.get("/profile/:id", cors(), authorizationMiddleware, userProfileController);
//update de users profile
userRoutes.put('/:id', cors(), authorizationMiddleware, userUpdateController);
//delete user. We need the specific ID of the user. We get
//the param in the route
userRoutes.delete('/:id', cors(), userDeleteController);
//get the user information
userRoutes.get('/:id', cors(), fetchUserDetail);



//export the userRoute
module.exports = userRoutes;