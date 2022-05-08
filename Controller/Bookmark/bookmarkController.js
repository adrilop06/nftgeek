//import user model
const Bookmark = require("../../Model/Bookmark/bookmark");
//import express handler to control the errors
const asyncHandler = require('express-async-handler');
//import validate id
const validID = require ('../../Utils/idDBValidation');


//CREATE A BOOKMARK
/************************************************************/
const  createBookmarkController = asyncHandler(async (req, res) =>{
    
    //user
    const userID = req?.user?.id;
    validID(userID);

 
    
    //bookmark
    const bookmarkExist = await Bookmark.findOne({user: userID});
    if(bookmarkExist) throw new Error ("Bookmark already exists");

    try{
        const bookmark = await Bookmark.create({
        user: userID,
        ...req?.body,
    });
        res.json(bookmark);
    }catch(error){
        res.json(error);
    }
});
   
//FETCH ALL BOOKMARKS
/************************************************************/

const fetchAllBookmarkController = asyncHandler (async (req, res) =>{
    try {
        const bookmark = await Bookmark.find({}).populate('favorites');
        res.json(bookmark);
    }catch(error){
        res.json(error);
    }
});


//GET JUST ONE BOOKMARK
/********************************************************/
//GET ONE BOOKMARK
//**********************************************************/
const getOneBookmarkController = asyncHandler (async (req, res) => {
    
    //check the id param
    const {id} = req?.user;


    try {
        //
        const bookmark = await Bookmark.findOne({user: id}).populate('favorites');
        res.json(bookmark);
    }catch(error){
        res.json(error);
    }
});

//UPDATE BOOKMARK// ADD AND DELETE POST FROM BOOKMARK
//**********************************************************/
const updateBookmarkController = asyncHandler (async (req, res) => {
    
    const userID = req?.user?.id;
    validID(userID);

    const { id } = req?.body;
    validID(id);
    
   
    const book = await Bookmark.findOne({user: userID});
    // console.log(book);
    //grab the post 
    // const postID = req.params.id;

    const checkPost = book?.post?.find(
        post => post.toString() === id.toString()
    );

    // console.log(checkPost);

    if( checkPost){
        const bookmark = await Bookmark.findOneAndUpdate(book, {
            $pull:{post:id},
            $inc: {numPost: -1}
        },
        { new: true});
        res.json(bookmark);
        console.log(bookmark, 1);
    }else{
        //new like
        console.log(id)
        console.log(book.id)
        const bookmark = await Bookmark.findOneAndUpdate(book, {
            $push:{post:id},
            $inc: {numPost: 1}
        }, { new: true});
        res.json(bookmark);
        console.log(bookmark, 2);
    }
});

module.exports = {
    createBookmarkController,
    fetchAllBookmarkController,
    getOneBookmarkController,
    updateBookmarkController,

};
