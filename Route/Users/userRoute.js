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
userRoute.use(cors());
//reference de registration controller
userRoutes.post('/registration', fileImages.single("photo"),profileResize, userRegController);
//reference de login controller
userRoutes.post('/login', userLogController);
//photo profile
userRoutes.put('/profilephoto', authorizationMiddleware, fileImages.single("image"), profileResize, userPhotoController);
//get all users 
userRoutes.get('/', authorizationMiddleware, fetchUserController);
//change the password by the user
userRoutes.put('/password',authorizationMiddleware, userUpdatePassController);
//get the user profile
userRoutes.get("/profile/:id", authorizationMiddleware, userProfileController);
//update de users profile
userRoutes.put('/:id', authorizationMiddleware, userUpdateController);
//delete user. We need the specific ID of the user. We get
//the param in the route
userRoutes.delete('/:id', userDeleteController);
//get the user information
userRoutes.get('/:id', fetchUserDetail);



//export the userRoute
module.exports = userRoutes;