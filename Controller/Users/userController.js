//import user model
const User = require("../../Model/User/user");
//import express handler to control the errors
const asyncHandler = require('express-async-handler');
//import tokensGenerations
const tokenGeneration = require('../../config/tokenJWT/tokenGeneration');
//import validate id
const validID = require ('../../Utils/idDBValidation');
//import cloudinary
const profileCloudinary = require("../../Utils/cloudinaryProfile");

const fs = require ('fs');

//REGISTRATION// 
/*******************************************/
//This controller the call for registration process
//it is a promise, so it's need to be async
//it's also use asynHandler to catch and throw the errors during the process
const userRegController = asyncHandler (async (req, res) => {
    //check if the user already exist
    const emailExist = await User.findOne({email: req?.body?.email});
    const userExist = await User.findOne({userName: req?.body?.userName});
    
    const localPath = `Public/img/profile/${req?.file?.filename}`;
    const img = await profileCloudinary(localPath);
    //is user already exist show error console message
    if(userExist) throw new Error ("This user name already exist");
    if(emailExist) throw new Error ("This email already exist");

    
    //registration
    //create a user
        try{
            const user = await User.create({
                photo:img?.url,
                firstName: req?.body?.firstName,
                lastName: req?.body?.lastName,
                userName:req?.body?.userName,
                email: req?.body?.email,
                password: req?.body?.password
                
            });
            res.json(user);
            fs.unlinkSync(localPath);
        }catch(error){
            res.json(error);
        }
    
});


//LOGIN//
/*****************************************************/  
const userLogController = asyncHandler (async (req, res) =>{
    const {userName, password} = req?.body;
    //check the email at db 
    const user = await User.findOne({userName});

    //if passwors inserted is equal than password at db
    //we call the function at user model with the promise 
    if(user && (await user.comparePass(password))){
        res.json({
            _id: user?._id,
            firstName: user?.firstName,
            lastName: user?.lastName,
            userName:user?.userName,
            email: user?.email,
            photo: user?.photo,
            isAdmin:user?.isAdmin,
            //reference the function tokenGeneration 
            token: tokenGeneration(user?._id)
        });
    }
    else{
        res.status(401);
        throw new Error ("Login process error")
    }
}); 


//DELETE USERS
/**************************************************************/
const userDeleteController = asyncHandler(async (req, res) =>{
    //recibe as an id the request param
    const {id} = req?.params;
    //check if id is valid using the validID function created in isDBValidation.js
    validID(id);
    //try to find by ID and delte
    try{
        const user = await User.findByIdAndDelete(id);
        //return the user as json 
        res.json(user);
    }catch(error){
        //if error, catch and return the error
        res.json(error);
    }
});



//GET ALL USER//FETCH
/*************************************************************/
const fetchUserController = asyncHandler (async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.json(allUsers);
    }catch(error){
        res.json(error);
    }
});


//USER DETAILS
/**************************************************************/
//see the users profiles
const fetchUserDetail = asyncHandler(async (req, res) => {
    //get the id param from requests
    const {id} = req?.params;
    //validate de id
    validID(id);
    try{
        //find the id and return json
        const user = await User.findById(id);
        res.json(user);
    }catch(error){
        //catch and throw the error in json
        res.json(error);
    }
});


//USER PROFILE
/***************************************************/
//ONLY the login users can see the profile
const userProfileController = asyncHandler (async (req, res) => {
    const {id} = req?.params;
    validID(id);
    try {
        const user = await User.findById(id).populate('posts').populate('bookmark');
        res.json(user);
    } catch (error) {
        res.json(error);
    }
});


//UPDATE PROFILE USER
/***********************************/
const userUpdateController = asyncHandler (async (req, res) => {
    //get the id of the user request
    const {id} = req?.user;
    //check the id
    validID(id);
    //use the funciton findbyIdandUpdate to find the user by id and update the values
    //user is an object, so it's treat the data as another objects
    const user = await User.findByIdAndUpdate(id, {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        userName: req?.body.userName,
        email: req?.body?.email,
        bio: req?.body?.bio
    }, {
        //indicate the new object, the new datas to update
            new: true,
            runValidators:true,
        }
    );
    res.json(user);
});


//CHANGE THE PASSWORD
/********************************/
const userUpdatePassController = asyncHandler(async (req, res) => {
    //destructure the login user
    const { _id } = req?.user;
    const { password } = req?.body;
    validID(_id);
    //Find the user by _id
    const user = await User.findById(_id);
  
    if (password) {
      user.password = password;
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.json(user);
    }
  });

  
//PHOTO PROFILE
//*********************************/
const userPhotoController = asyncHandler(async (req, res) => {
   //Find the login user
    const { id } = req?.user;
    //
    const localPath = `Public/img/profile/${req?.file?.filename}`;
    //
    const img = await profileCloudinary(localPath);
    console.log(img);
    const user = await User.findByIdAndUpdate(
    id,
        {
        photo: img?.url,
        
        },
        { new: true}
    );
  //delete the img from folder after uploader
    fs.unlinkSync(localPath);
    res.json(user);
});



//export de function as a object
module.exports = {
    userRegController, 
    userLogController, 
    userDeleteController, 
    fetchUserController, 
    fetchUserDetail,
    userProfileController,
    userUpdateController,
    userUpdatePassController,
    userPhotoController
    };
