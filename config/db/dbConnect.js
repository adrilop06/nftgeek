const mongoose = require ('mongoose');

//arrow function that try to connect with data base and catch the error
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Data Base is connected');
    }catch (error){
        console.log('Data Bse not connected. Error: ' + error.message);
    }
}

//export the function
module.exports  = dbConnect;