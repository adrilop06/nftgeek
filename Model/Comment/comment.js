const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
        required:[true, "The comment need a post"]
    },
    user:{
        type: Object,
        required:[true, "Comment need a user"]
    },
    body:{
        type: String,
        required:[true, "The comment need body"]
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

const comment = mongoose.model('comment', commentSchema);

module.exports = comment;