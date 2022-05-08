//import cloudinary
const cloudinary = require('cloudinary');
//import dotenv
const dotenv = require ("dotenv");

//dotenv
dotenv.config();


cloudinary.config({
  cloud_name: 'dq4jtliel',
  api_key:  '186469361926977',
  api_secret: 'bUYDrcPbFNwu3CJzqS_zc3--_DE',
  
});



const imgCloudinary = async file =>{
  try {
      const data = await cloudinary.v2.uploader.upload(file, {
        folder: "post_photo",
        resource_type: "auto",
      });
      return {
        url: data?.secure_url,
      };
    } catch (error) {
      return error;
      
    }
    
};

module.exports = imgCloudinary