const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');


mongoose.plugin(slug);
const categoriesSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, "The category need a name"]
    },
    slug: { type: String, slug: "name"}, 
 
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

categoriesSchema.virtual('posts', {
    //reference the post model
    ref:'post',
    //reference 
    foreignField: 'category',
    //
    localField: 'slug'
});

const categories = mongoose.model('categories', categoriesSchema);

module.exports = categories;