const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');


mongoose.plugin(slug);
const tagSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, "The tag need a name"],
        default: "All"
    },
    slug: { type: String, slug: "name"}, 
    views:{
        type: Number,
        default: 0,
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

tagSchema.virtual('posts', {
    //reference the post model
    ref:'post',
    //reference 
    foreignField: 'slug',
    //
    localField: 'slug',
    count: true
});

tagSchema.virtual('post_tag', {
    //reference the post model
    ref:'post',
    //reference 
    foreignField: 'slug',
    //
    localField: 'slug',
});

const tag = mongoose.model('tag', tagSchema);

module.exports = tag;