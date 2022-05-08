//import express handler to control the errors
const asyncHandler = require('express-async-handler');
//import validate id
const validID = require ('../../Utils/idDBValidation');
const Category = require("../../Model/Category/categories");


//CREATE Categories
//***************************************************/
const createCategoryController = asyncHandler (async (req, res) => {
    //bookmark
    const categoryExist = await Category.findOne({name: req?.body?.name});
    if(categoryExist) throw new Error ("This category already exist");
    //const postID = req?.body?.postID;
   // validID(postID);
    try{
        const category = await Category.create({
            //post:postID,
        ...req.body,
    });
        res.json(category);
    }catch(error){
        res.json(error);
    }
});

//FETCH ALL CATEGORY
/*************************************************************/
const fetchAllCategoryController = asyncHandler (async (req, res) => {
    try {
        const category = await Category.find({}).populate('posts');
        res.json(category);
    }catch(error){
        res.json(error);
    }
});

//GET ONE CATEGORY
//**********************************************************/
const fetchCategoryController = asyncHandler (async (req, res) => {

    const {slug} = req?.params;
    
    try {
        const category = await Category.findOne({name:slug}).populate('posts');
        res.json(category);
    }catch(error){
        res.json(error);
    }
});

//UPDATE CATEGORY
//**********************************************************/
const updateCategoryController = asyncHandler (async (req, res) => {
   /* const { id } = req.params;
    validID(id);
    const c = await Category.findById(id);
    //grab the post 
    const {postID} = req.body;
   
    const checkPost = c?.post?.find(

        post => post === postID
    );
    if(checkPost){
        const category = await Category.findByIdAndUpdate(id, {
            $pull:{post:postID},
            $inc: {number: -1}
        },
        { new: true});
        res.json(category).populate('post');
        
    }else{
        //new like
        const category = await Category.findByIdAndUpdate(id, {
            $push:{post:postID},
            $inc: {number: 1}
        }, { new: true}).populate('post');
        res.json(category);
        
    }*/
    const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      {
        name: req?.body?.name,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});

//REMOVE CATEGORY
//**********************************************************/

const removeCategoryController = asyncHandler (async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findByIdAndDelete(id);
        res.json(category);
    } catch (error) {
        res.json(error);
    }
});



module.exports = {
    createCategoryController,
    fetchAllCategoryController,
    fetchCategoryController,
    updateCategoryController,
    removeCategoryController
};