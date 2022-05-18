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
/*
postRoute.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "OPTIONS,POST,GET ,PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});
*/
//
//postRoute.use(cors());
postRoute.options('*', cors());
//create a post
postRoute.post('/', cors(), authorizationMiddleware, createPostController, function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
});
//likes post
postRoute.put('/likes', authorizationMiddleware, likePostController);
//likes post
postRoute.put('/mark', authorizationMiddleware, bookMarkPostController);
//get all post
postRoute.get('/',fetchPostsController);
//get all post tag
postRoute.get('/', fetchPostsTagController);
//get all post user
postRoute.get('/', fetchPostsUserController);
//get one post by id
postRoute.get('/:id',fetchPostController);
//get search
postRoute.get('/results/:title', fetchSearchPostController);

//update post
postRoute.put('/:id', authorizationMiddleware,fileImages.single("image"),  imgResize,updatePostController );
//remove post
postRoute.delete('/:id',authorizationMiddleware, removePostController );


module.exports = postRoute;