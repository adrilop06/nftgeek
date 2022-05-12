const express = require ('express');

const cors = require("cors");

//import middleware
const authorizationMiddleware = require('../../Middlewares/Authotization/authorizationMiddleware');
//impost post controller
const { createPostController,
        fetchPostsController,
        fetchPostController,
        updatePostController,
        removePostController,
        likePostController,
        bookMarkPostController,
        fetchPostsTagController,
        fetchPostsUserController,
        fetchSearchPostController
 }= require('../../Controller/Posts/postController');
const postRoute = express.Router();
postRoute.use(cors());
postRoute.options('*', cors());

const {fileImages, imgResize} = require('../../Middlewares/Upload/imgUpload');
/*
postRoute.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "OPTIONS,POST,GET ,PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});
*/


//create a post
postRoute.post('/', cors(), authorizationMiddleware, fileImages.single("image"), imgResize, createPostController);
//likes post
postRoute.put('/likes', cors(), authorizationMiddleware, likePostController);
//likes post
postRoute.put('/mark',cors(), authorizationMiddleware, bookMarkPostController);
//get all post
postRoute.get('/', cors(),fetchPostsController);
//get all post tag
postRoute.get('/',cors(), fetchPostsTagController);
//get all post user
postRoute.get('/',cors(), fetchPostsUserController);
//get one post by id
postRoute.get('/:id', cors(),fetchPostController);
//get search
postRoute.get('/results/:title',cors(), fetchSearchPostController);

//update post
postRoute.put('/:id',cors(), authorizationMiddleware,fileImages.single("image"),  imgResize,updatePostController );
//remove post
postRoute.delete('/:id', cors(),authorizationMiddleware, removePostController );


module.exports = postRoute;