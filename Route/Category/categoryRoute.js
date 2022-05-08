const express = require ('express');
const cors = require("cors");

//import middleware
const authorizationMiddleware = require('../../Middlewares/Authotization/authorizationMiddleware');
const { 
        createCategoryController,
        fetchAllCategoryController,
        fetchCategoryController,
        updateCategoryController,
        removeCategoryController
} = require('../../Controller/Category/categoryController');

const categoryRoute = express.Router();
categoryRouteapp.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Methods", "OPTIONS,POST,GET ,PUT, PATCH, DELETE");
        res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers");
        next();
      });
//create category
categoryRoute.post('/',authorizationMiddleware, createCategoryController,);
//Fetch all categorys
categoryRoute.get('/',authorizationMiddleware, fetchAllCategoryController,);
//Fetch one categorys
categoryRoute.get('/:slug',authorizationMiddleware, fetchCategoryController);
//Update category
categoryRoute.put('/:id',authorizationMiddleware, updateCategoryController);
//Remove category
categoryRoute.delete('/:id',authorizationMiddleware, removeCategoryController);


module.exports = categoryRoute;