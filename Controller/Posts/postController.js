//import user model
const Post = require("../../Model/Post/post");
//import express handler to control the errors
const asyncHandler = require('express-async-handler');
//import validate id
const validID = require ('../../Utils/idDBValidation');
//import cloudinary function
const imgCloudinary = require("../../Utils/cloudinaryPost");

const fs = require ('fs');


//CREATE POST
//*********************************/
const  createPostController = asyncHandler(async (req, res) =>{
    
    const {id} = req?.user;
    validID(id);
    const localPath = `Public/img/posts/${req.file.filename}`;
    const img = await imgCloudinary(localPath);
    try{
        const post = await Post.create({
        ...req.body,
        image: img?.url, 
        user: id,
        userName:req?.user.userName,
        userImage:req?.user.photo,
    });
        
        //delete the img from folder after uploader
        fs.unlinkSync(localPath);
        //return json 
        res.json(post);
    }catch(error){
        res.json(error);
    }
});

//GET ALL POSTS//FETCH BY CATEGORY
/*************************************************************/
const fetchPostsController = asyncHandler (async (req, res) => {
    const cat = req.query.category;
    try {
        //check category
        if(cat){
            const posts = await Post.find({category: cat}).populate("user").populate("comments");
            res.json(posts);
        }else{
            const posts = await Post.find({}).populate("user").populate("comments").sort({"views": -1}).exec();
            res.json(posts);
        }
        res.json(posts);
    }catch(error){
        res.json(error);
    }
});

//GET ALL POSTS BY USER
/*************************************************************/
const fetchPostsUserController = asyncHandler (async (req, res) => {
    const {id} = req?.user;
    
    try {

        const posts = await Post.find({user: id}).populate("user").populate("comments").sort('-date');
        res.json(posts);
        
        
    }catch(error){
        res.json(error);
    }
});

//FETCH POST BY TAG
//*********************************************/
const fetchPostsTagController = asyncHandler (async (req, res) => {
    const tag = req.query.tag;
    try {
        //check category
        if(tag){
            const posts = await Post.find({tag: tag}).populate("user").populate("comments");
            res.json(posts);
        }else{
            const posts = await Post.find({}).populate("user").populate("comments");
            res.json(posts);
        }
        res.json(posts);
    }catch(error){
        res.json(error);
    }
});


//GET ONE POST
//**********************************************************/
const fetchPostController = asyncHandler (async (req, res) => {
    //check the id param
    const {id} = req.params;
    validID(id);
    try {
        //
        const post = await Post.findById(id).populate("user").populate('comments');
        //await and check the post to increment the views
        await Post.findByIdAndUpdate(post, {
            //increment the views by 1 
            $inc: {views: 1}
        },
        //new property = true
        {new:true});
        res.json(post);
    }catch(error){
        res.json(error);
    }
});

//UPDATE POST
//**********************************************************/
const updatePostController = asyncHandler (async (req, res) => {
    const { id } = req.params;
    validID(id);
    const localPath = `Public/img/posts/${req.file.filename}`;
    const img = await imgCloudinary(localPath);
    try {
        const post = await Post.findByIdAndUpdate(
        id,
        {
            ...req.body,
            image: img?.url, 
            user: req.user?._id,
        },
        {
            new: true,
        });
    res.json(post);
    //delete the img from folder after uploader
    fs.unlinkSync(localPath);
    } catch (error) {
        res.json(error);
    }
});

//REMOVE POST
//**********************************************************/

const removePostController = asyncHandler (async (req, res) => {
    const { id } = req.params;
    validID(id);
    try {
        const post = await Post.findByIdAndDelete(id);
        res.json(post);
    } catch (error) {
        res.json(error);
    }
});

//LIKE POST
//**********************************************************/
const likePostController = asyncHandler (async (req, res) => {
    //id post
    const { postID } = req.body;
    const post = await Post.findById(postID);
    //user
    const logUser = req?.user?.id;
    //check is the post is already liked for user


    const l = post?.numLikes?.find(
        user => user?.toString() === logUser?.toString()
    );
    if(l){
        const post = await Post.findByIdAndUpdate(postID, {
            $pull: {numLikes:logUser},
        },
        { new: true});
        res.json(post);
    }else{
        //new like
        const post = await Post.findByIdAndUpdate(postID, {
            $push:{numLikes:logUser},
        }, { new: true});
        res.json(post);
    }
});


//BOOKMARK POST
//**********************************************************/
const bookMarkPostController = asyncHandler (async (req, res) => {
    //id post
    const { postID } = req.body;
    const post = await Post.findById(postID);
    //user
    const logUser = req?.user?.id;
    //check is the post is already bookmark for user


    const l = post?.numMarks?.find(
        user => user?.toString() === logUser?.toString()
    );
    
    if(l){
        const post = await Post.findByIdAndUpdate(postID, {
            $pull: {numMarks:logUser},
            mark: false,
        },
        { new: true});
        res.json(post);
    }else{
        //new mark
        const post = await Post.findByIdAndUpdate(postID, {
            $push:{numMarks:logUser},
            mark: true,
        }, { new: true});
        res.json(post);
    }
});

const fetchSearchPostController = asyncHandler (async (req, res) => {

    const title = req?.query?.title;
    try {
     
            const posts = await Post.find({"title" :  {$regex: title, $options: "i"}}).populate("user").populate("comments");
            res.json(posts);
    
        
    }catch(error){
        res.json(error);
    }

  
});

module.exports = {
    createPostController, 
    fetchPostsController,
    fetchPostController, 
    updatePostController,
    removePostController,
    likePostController,
    bookMarkPostController,
    fetchPostsTagController,
    fetchPostsUserController,
    fetchSearchPostController
};