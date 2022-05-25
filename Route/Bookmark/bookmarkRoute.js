const express = require ('express');
const bookmarkRoute = express.Router();

//import middleware
const authorizationMiddleware = require('../../Middlewares/Authotization/authorizationMiddleware');
const { 
    createBookmarkController,
    getOneBookmarkController,
    updateBookmarkController,
    fetchAllBookmarkController
    
} = require('../../Controller/Bookmark/bookmarkController');




//create bookmark
bookmarkRoute.post('/',authorizationMiddleware, createBookmarkController);
//get all bookmarks
bookmarkRoute.get('/',authorizationMiddleware, fetchAllBookmarkController);
//get one bookmark
bookmarkRoute.get('/:id',authorizationMiddleware, getOneBookmarkController);
//update bookmark
bookmarkRoute.put('/',authorizationMiddleware, updateBookmarkController);
module.exports = bookmarkRoute;