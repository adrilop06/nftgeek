
//import express handler to control the errors
const asyncHandler = require('express-async-handler');
//import validate id
const validID = require ('../../Utils/idDBValidation');
const Tag = require("../../Model/Tag/tag");


//CREATE TAG
//***************************************************/
const createTagController = asyncHandler (async (req, res) => {

    const tagExist = await Tag.findOne({'name': req?.body?.name});
    if(tagExist) throw new Error ("This tag already exist");
    //const postID = req?.params;
    //validID(postID);
    try{
        const tag = await Tag.create({
        //post:postID,
        ...req?.body,
    });
        res.json(tag);
    }catch(error){
        res.json(error);
    }
    
});

//FETCH ALL TAGS
/*************************************************************/
const fetchAllTagsController = asyncHandler (async (req, res) => {
    try {
        const tag = await Tag.find({}).sort({"views": -1}).exec();
        res.json(tag);
    }catch(error){
        res.json(error);
    }
});

//GET ONE TAG
//**********************************************************/
const fetchTagController = asyncHandler (async (req, res) => {
    
    const {slug} = req?.params;
    try {
        const tag = await Tag.findOne({slug:slug}).populate('posts').populate('post_tag');
        await Tag.findByIdAndUpdate(tag, {
            //increment the views by 1 
            $inc: {views: 1}
        },
        //new property = true
        {new:true});
        res.json(tag);
        res.json(tag.posts);
    }catch(error){
        res.json(error);
    }
});

//UPDATE TAG
//**********************************************************/
const updateTagController = asyncHandler (async (req, res) => {

    const  slug  = req?.body?.slug;
    const c = await Tag.findOne({slug: slug});
    console.log(slug, 1);
    console.log(req?.body?.postID, 2);
    //grab the post 
    const {postID} = req?.body?.postID;
    
    const checkPost = c?.post?.find(
        post => post.toString() === postID.toString(),
      
    );
    console.log(checkPost,3);

    if(checkPost){
        const tag = await Tag.findOneAndUpdate(c, {
            $pull:{post:postID},
            $inc: {number: -1}
        },
        { new: true});
        res.json(tag).populate('post');
        
    }else{
        //new like
        const tag = await Tag.findByIdAndUpdate(c, {
            $push:{post:postID},
            $inc: {number: 1}
        }, { new: true}).populate('post');
        res.json(tag);
        
    }
}
    );
/*
const tagExist = await Tag.findOne({'name': req?.body?.name});

//grab the post 
const {postID} = req.params;
console.log(postID);
const checkPost = tagExist?.post?.find(
    post => post === postID
);

if(checkPost){
    const tag = await Tag.findByIdAndUpdate(tagExist, {
        $pull:{post:postID},
        $inc: {number: -1}
    },
    { new: true});
    res.json(tag).populate('post');
    
}else{
    //new like
    const tag = await Tag.findByIdAndUpdate(tagExist, {
        $push:{post:postID},
        $inc: {number: 1}
    }, { new: true}).populate('post');
    res.json(tag);
        
    }*/
   


//REMOVE TAG
//**********************************************************/

const removeTagController = asyncHandler (async (req, res) => {
    const { id } = req?.params;
    try {
        const tag = await Tag.findByIdAndDelete(id, {$inc: {number: -1}});
        
        res.json(tag);
    } catch (error) {
        res.json(error);
    }
});



module.exports = {
    createTagController,
    fetchAllTagsController,
    fetchTagController,
    updateTagController,
    removeTagController
};