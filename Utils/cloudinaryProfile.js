//import cloudinary
const cloudinary = require('cloudinary');
//import dotenv
const dotenv = require ("dotenv");
//dotenv
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  
});

//create a function that will called into user controller
const profileCloudinary = async file =>{
    try {
        const data = await cloudinary.v2.uploader.upload(file, {
          folder: "profile_photo",
          resource_type: "auto",
        });
        return {
          url: data?.secure_url,
        };
      } catch (error) {
        return error;
        
      }
      
};


module.exports = profileCloudinary;