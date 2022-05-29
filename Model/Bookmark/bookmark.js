const mongoose = require('mongoose');

//create the schema 
const bookmarkSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:[true, 'User is required']
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

bookmarkSchema.virtual('favorites', {
    //reference the post model
    ref:'post',
    //reference 
    foreignField: 'numMarks',
    //the local field
    localField: 'user'

});

const bookmark = mongoose.model('bookmark', bookmarkSchema);

module.exports = bookmark;