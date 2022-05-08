const mongoose = require('mongoose');
const bcrypt = require ("bcryptjs");

//create user schema object
//Create the collections of information about user 
const userSchema = new mongoose.Schema({
    firstName:{ 
        required: [true, 'First name is required'],
        type: String,
    },
    lastName:{
        required: [true, 'Last name is required'],
        type: String,
    },
    userName:{
        required: [true, 'User name is required'],
        type: String,
    },
    photo:{
        type: String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    email:{
        type:String,
        required: [true, "Email is required"]
    },
    bio:{
        type:String,
        default:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil."
    },
    password:{
        type:String,
        required: [true, "Password is required"]
    },
    postCont:{
        type: Number,
        default: 0,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    role:{
        type: String, 
        anum:["Admin", "Guest", "Writer"]
    },
    dateRegistration: Date,
    passwordChangeAt: Date,
    passwordReset: String,
    active:{
        type: Boolean,
        default: false,
    },

},{
    toJSON:{
        virtuals: true,
    },
    toObject:{
        virtuals: true,
    },
    timestamps: true,
});

//function to create a virtual collections of posts from user 
userSchema.virtual('posts', {
    //reference the post model
    ref:'post',
    //reference the user from post model
    foreignField: 'user',
    //
    localField: '_id',
});
//function to create a virtual collections of bookmark
userSchema.virtual('bookmark', {
    //reference 
    ref:'bookmark',
    //reference the user from post model
    foreignField: 'user',
    //
    localField: '_id',
});
//bcryptjs-protect the users passwords
userSchema.pre("save", async function (next) {
    //check if the password has been modified
    if(!this.isModified('password')){
        next();
    }else{
        const salt = await bcrypt.genSalt(10);
        //reference the password
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
});


//password check. We compare the password inserted and password save at db.
userSchema.methods.comparePass = async function (pass){
    //promise with the password
    return await bcrypt.compare(pass, this.password);
};


//Schema compile into modal
const user = mongoose.model("user", userSchema);

module.exports = user;