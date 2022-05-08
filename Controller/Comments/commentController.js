//import user model
const Comment = require("../../Model/Comment/comment");
//import express handler to control the errors
const asyncHandler = require('express-async-handler');
//import validate id
const validID = require ('../../Utils/idDBValidation');


//CREATE COMMENT
/************************************************************/
const createCommentController = asyncHandler (async(req, res) =>{
   //find user
   const user = req?.user;
   //grab the post by id
   const { postID, body } = req?.body;
   validID(postID);
   try {
     const comment = await Comment.create({
       post: postID,
       user,
       body,
     });
     res.json(comment);
   } catch (error) {
     res.json(error);
   }
});


//FETCH COMMENTS
/************************************************************/

const fetchAllCommmentsController = asyncHandler (async (req, res) =>{
    try {
        const comments = await Comment.find({}).sort('-created');
        res.json(comments);
    }catch(error){
        res.json(error);
    }
});


//GET JUST ONE COMMENT
/********************************************************/
//GET ONE COMMENT
//**********************************************************/
const getOneCommentController = asyncHandler (async (req, res) => {
    //check the id param
    const {id} = req?.params;
    validID(id);
    try {
        //
        const comment = await Comment.findById(id);
        res.json(comment);
    }catch(error){
        res.json(error);
    }
});

//UPDATE COMMENT
//**********************************************************/
const updateCommentController = asyncHandler (async (req, res) => {
    const { id } = req?.params;
    validID(id);

    try {
        const comment = await Comment.findByIdAndUpdate(
        id,
        {
            //schemma model comment 
           post:req?.body?.postID,
           user: req?.user,
           body: req?.body?.body,
        },
        {
            //new params
            new: true,
            runValidators: true,
        });
    res.json(comment);
    } catch (error) {
        res.json(error);
    }
});

//REMOVE COMMENT
//**********************************************************/

const removeCommentController = asyncHandler (async (req, res) => {
    const { id } = req?.params;
    validID(id);
    try {
        const comment = await Comment.findByIdAndDelete(id);
        res.json(comment);
    } catch (error) {
        res.json(error);
    }
});



module.exports = {
    createCommentController,
    fetchAllCommmentsController,
    getOneCommentController,
    updateCommentController,
    removeCommentController
};