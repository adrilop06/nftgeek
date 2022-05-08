const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');



mongoose.plugin(slug);
//create the schema 
const postSchema = new mongoose.Schema({
    title:{ 
        type: String,
        required: [true, 'The post need a title'],
        trim: true,
    },
    category:{ 
        type: String,
        required: [true, 'The post nedd a category']
    },
    tag:{ 
        type: String,
        required: [true, 'The post nedd a tag']
    },
    slug: { type: String, slug: "tag"}, 
    numLikes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        }
    ],
    numMarks:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        }
    ],
    views:{
        type: Number,
        default: 0,
    },
    userName:{
        type:String,
        default: "No name",
    },
    userImage:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:[true, 'User is required']
    }, 

    

    body: {
        type: String,
        required: [true, "The post need a body"]
    },
    image:{
        type: String,
        default: 'https://cdn.pixabay.com/photo/2022/02/10/09/39/nft-7004985_960_720.jpg',

    }, 
 
},
{
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true,
}

);
//function to create a virtual collections of posts from user 
postSchema.virtual('comments', {
    //reference the post model
    ref:'comment',
    //reference 
    foreignField: 'post',
    //
    localField: '_id'
});

const post = mongoose.model('post', postSchema);

module.exports = post;