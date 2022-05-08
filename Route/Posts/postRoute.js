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

postRoute.use(cors());
console.log("routes")
//create a post
postRoute.post('/', authorizationMiddleware, fileImages.single("image"), imgResize, createPostController);
//likes post
postRoute.put('/likes', authorizationMiddleware, likePostController);
//likes post
postRoute.put('/mark', authorizationMiddleware, bookMarkPostController);
//get all post
postRoute.get('/', fetchPostsController);
//get all post tag
postRoute.get('/', fetchPostsTagController);
//get all post user
postRoute.get('/', fetchPostsUserController);
//get one post by id
postRoute.get('/:id', fetchPostController);
//get search
postRoute.get('/results/:title', fetchSearchPostController);

//update post
postRoute.put('/:id', cors(), authorizationMiddleware,fileImages.single("image"),  imgResize,updatePostController );
//remove post
postRoute.delete('/:id', cors(), authorizationMiddleware, removePostController );


module.exports = postRoute;