const express = require ('express');
const commentRoute = express.Router();
const cors = require("cors");
//import middleware
const authorizationMiddleware = require('../../Middlewares/Authotization/authorizationMiddleware');
const { 
        createCommentController,
        fetchAllCommmentsController,
        getOneCommentController,
        updateCommentController,
        removeCommentController 
} = require('../../Controller/Comments/commentController');


commentRoute.use(cors());
commentRoute.options('*', cors());

//create comment
commentRoute.post('/',authorizationMiddleware, createCommentController);
//Fetch all comments
commentRoute.get('/', fetchAllCommmentsController);
//Get one comment
commentRoute.get('/:id', getOneCommentController);
//Update comment
commentRoute.put('/:id',authorizationMiddleware, updateCommentController);
//Remove comment
commentRoute.delete('/:id',authorizationMiddleware, removeCommentController);

module.exports = commentRoute;