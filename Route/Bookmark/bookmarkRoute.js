const express = require ('express');
const bookmarkRoute = express.Router();
const cors = require("cors");
//import middleware
const authorizationMiddleware = require('../../Middlewares/Authotization/authorizationMiddleware');
const { 
    createBookmarkController,
    getOneBookmarkController,
    updateBookmarkController,
    
} = require('../../Controller/Bookmark/bookmarkController');



bookmarkRoute.use(cors());
bookmarkRoute.options('*', cors());
//create bookmark
bookmarkRoute.post('/',authorizationMiddleware, createBookmarkController);

//get one bookmark
bookmarkRoute.get('/',authorizationMiddleware, getOneBookmarkController);
//update bookmark
bookmarkRoute.put('/',authorizationMiddleware, updateBookmarkController);
module.exports = bookmarkRoute;