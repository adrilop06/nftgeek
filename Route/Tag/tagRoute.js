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
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", '*');
        res.header("Access-Control-Allow-Credentials", true);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
        next();
    });

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