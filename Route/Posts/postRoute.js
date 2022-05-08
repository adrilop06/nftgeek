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
const {fileImages, imgResize} = require('../../Middlewares/Upload/imgUpload');

console.log("routes")
//create a post
postRoute.post('/', cors(), authorizationMiddleware, fileImages.single("image"), imgResize, createPostController);
//likes post
postRoute.put('/likes', cors(), authorizationMiddleware, likePostController);
//likes post
postRoute.put('/mark', cors(), authorizationMiddleware, bookMarkPostController);
//get all post
postRoute.get('/', cors(), fetchPostsController);
//get all post tag
postRoute.get('/', cors(), fetchPostsTagController);
//get all post user
postRoute.get('/', cors(), fetchPostsUserController);
//get one post by id
postRoute.get('/:id', cors(), fetchPostController);
//get search
postRoute.get('/results/:title', cors(), fetchSearchPostController);

//update post
postRoute.put('/:id', cors(), authorizationMiddleware,fileImages.single("image"),  imgResize,updatePostController );
//remove post
postRoute.delete('/:id', cors(), authorizationMiddleware, removePostController );


module.exports = postRoute;