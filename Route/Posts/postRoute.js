const express = require ('express');
//import cors
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


postRoute.use(cors());
postRoute.options('*', cors());

//create a post
postRoute.post('/', authorizationMiddleware, fileImages.single("image"), imgResize, createPostController);
//likes post
postRoute.put('/likes', authorizationMiddleware, likePostController);
//bookmark post
postRoute.put('/mark', authorizationMiddleware, bookMarkPostController);
//get all post
postRoute.get('/',fetchPostsController);
//get all post tag
postRoute.get('/', fetchPostsTagController);
//get all post user
postRoute.get('/:id', fetchPostsUserController);
//get one post by id
postRoute.get('/profile/:id',fetchPostController);
//get search
postRoute.get('/results/:title', fetchSearchPostController);

//update post
postRoute.put('/:id', authorizationMiddleware,fileImages.single("image"),  imgResize,updatePostController );
//remove post
postRoute.delete('/:id',authorizationMiddleware, removePostController );


module.exports = postRoute;