const mongoose = require ('mongoose');
const config = require("config");
const db = config.get("mongoURI");

//arrow function that try to connect with data base and catch the error
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL|| db , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
       
            
        })
        console.log('Data Base is connected');
    }catch (error){
        console.log('Data Bse not connected. Error: ' + error.message);
    }
}

//export the function
module.exports  = dbConnect;