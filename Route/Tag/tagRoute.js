const express = require ('express');
//import cors
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
tagRoute.options('*', cors());

//create tag
tagRoute.post('/', authorizationMiddleware, createTagController);
//Fetch all tags
tagRoute.get('/',fetchAllTagsController);
//Fetch one tags
tagRoute.get('/:slug', fetchTagController);
//Update tag
tagRoute.put('/:slug',authorizationMiddleware, updateTagController);
//Remove tag
tagRoute.delete('/:id',authorizationMiddleware, removeTagController);


module.exports = tagRoute;