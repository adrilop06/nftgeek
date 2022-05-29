const express = require ('express');
//import cors
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

categoryRoute.use(cors());
categoryRoute.options('*', cors());

//create category
categoryRoute.post('/',authorizationMiddleware, createCategoryController,);
//Fetch all categorys
categoryRoute.get('/', fetchAllCategoryController,);
//Fetch one categorys
categoryRoute.get('/:slug', fetchCategoryController);
//Update category
categoryRoute.put('/:id', updateCategoryController);
//Remove category
categoryRoute.delete('/:id', removeCategoryController);


module.exports = categoryRoute;