const express = require ('express');

const cors = require("cors");

//import middleware
const authorizationMiddleware = require('../../Middlewares/Authotization/authorizationMiddleware');
const { 
        createTagController,
        fetchAllTagsController,
        fetchTagController,
        updateTagController,
        removeTagController
} = require('../../Controller/Tag/tagController');

const tagRoute = express.Router();


tagRoute.use(cors());
//tagRoute.options('*', cors());


//create tag
tagRoute.post('/', cors(),authorizationMiddleware, createTagController);
//Fetch all tags
tagRoute.get('/', cors(),fetchAllTagsController);
//Fetch one tags
tagRoute.get('/:slug',cors(), fetchTagController);
//Update tag
tagRoute.put('/:slug', cors(),authorizationMiddleware, updateTagController);
//Remove tag
tagRoute.delete('/:id', cors(),authorizationMiddleware, removeTagController);


module.exports = tagRoute;