const mongoose = require ('mongoose');

const validID = id => {
    //this funciton get an ID and check if this is valid
    //if ID is not valid throw error
    const valid = mongoose.Types.ObjectId.isValid(id);
    if(!valid) throw new Error ("ID is not valid");
};

module.exports = validID;
