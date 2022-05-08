//When the error is not defined
const eNotFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const eHandler = (err, req, res, next) => {
    //
    const statusCode = res.statusCode == 200 ? 500: res.statusCode;
    return  res.status(statusCode);
    //send message to the user like json
    res.json({
        message: err?.message,
        stack: process.env.NODE_ENV == 'production' ? null : err.stack,
    });
};



//exports like json object
module.exports = {eHandler, eNotFound};