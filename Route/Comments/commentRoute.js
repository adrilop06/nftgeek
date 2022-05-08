const express = require ('express');
const commentRoute = express.Router();
//import middleware
const authorizationMiddleware = require('../../Middlewares/Authotization/authorizationMiddleware');
const { 
        createCommentController,
        fetchAllCommmentsController,
        getOneCommentController,
        updateCommentController,
        removeCommentController 
} = require('../../Controller/Comments/commentController');


//create comment
commentRoute.post('/',authorizationMiddleware, createCommentController);
//Fetch all comments
commentRoute.get('/',authorizationMiddleware, fetchAllCommmentsController);
//Get one comment
commentRoute.get('/:id',authorizationMiddleware, getOneCommentController);
//Update comment
commentRoute.put('/:id',authorizationMiddleware, updateCommentController);
//Remove comment
commentRoute.delete('/:id',authorizationMiddleware, removeCommentController);

module.exports = commentRoute;