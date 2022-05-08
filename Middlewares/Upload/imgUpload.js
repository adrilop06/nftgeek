//import multer
const multer = require('multer');
const sharp = require ('sharp');
const path = require("path");
//save images in the memory of the server
const multerStorage = multer.memoryStorage();

//Check file type
//insert the file and recibe a callback
const multerFilter = (req, file, cb) => {
    //check file type
    if(file.mimetype.startsWith("image")){
        cb(null, true);
    }else{
        //file null
        cb({message: 'File format is not compatible'}, false)
    }
};

const fileImages = multer({
    storage: multerStorage,
    filefilter: multerFilter,
    limits: { fileSize: 1000000 }
});

//resize profile images. 
const profileResize =  async (req,res,next) =>{
    //check file exists 
    if(!req.file) return next();  
    //name of the file
    req.file.filename = `user-${Date.now()}-${req.file.originalname}`;
    //sharp package
    await sharp(req.file.buffer)
        //resize the image
        .resize(250, 250)
        //reconvert to jpeg format
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(path.join(`Public/img/profile/${req.file.filename}`));
    next();   
};

//Any images resizing (post)
const imgResize =  async (req,res,next) =>{
    //check file exists 
    if(!req.file) return next();  
    //name of the file
    req.file.filename = `user-${Date.now()}-${req.file.originalname}`;
    //sharp package
    await sharp(req.file.buffer)
        //resize the image
        .resize(500, 500)
        //reconvert to jpeg format
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(path.join(`Public/img/posts/${req.file.filename}`));
    next();   
};

module.exports = {fileImages, profileResize, imgResize};