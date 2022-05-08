//import express
const express = require("express");
//import dotenv
const dotenv = require ("dotenv");
//import cors
const cors = require("cors");
//import dbConnect
const dbConnect = require("./config/db/dbConnect");
//import middleware
const {eHandler, eNotFound} = require ('./Middlewares/Error/eHandler');
//import the user route
const userRoutes = require ("./Route/Users/userRoute"); 
//import the post routes
const postRoute = require("./Route/Posts/postRoute");
//import the comment routes
const commentRoute = require("./Route/Comments/commentRoute");
//import the tag routes
const tagRoute = require("./Route/Tag/tagRoute");
//import bookmark
const bookmarkRoute = require("./Route/Bookmark/bookmarkRoute");
//import category
const categoryRoute = require("./Route/Category/categoryRoute");
const scrapMarketRoute = require("./Route/Scrap/scrapMarketRoute");
const scrapNewsRoute = require("./Route/Scrap/scrapNewsRoute");
const axios = require('axios');
const cheerio = require('cheerio');
/*************************************************************/
//insert express like a function inside a const app
const app = express();
/************************************************************/
//dotenv
dotenv.config();

/************************************************************/
//data based
dbConnect();

/************************************************************/
//Middelware in express is a function that intercept the comunications and can 
//access to request and responses
/*
Middleware is an express function that sits between the request and the response. 
In this case, the function is executed on requests that have a payload of json objects.
*/
app.use(express.json());

var whitelist = ['https://grand-meerkat-38cb86.netlify.app']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

//use cors
//app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "OPTIONS,POST,GET ,PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
  });
// app.options('*', cors(corsOptionsDelegate))
//registration user process. Post and update user information
//route user
//in case of user petition route check te kind and call the component post or get
app.use('/api/users', userRoutes);
//post routes
app.use('/api/posts', postRoute)
//comment routes
app.use('/api/comments', commentRoute);
//tag routes
app.use('/api/tag', tagRoute);
//bookmark
app.use('/api/bookmark', bookmarkRoute);
//category routes
app.use('/api/category', categoryRoute);

app.use('/api/market', scrapMarketRoute);

app.use('/api/news', scrapNewsRoute);






/*************************************************************/
//express error handler through our application
//lunch the eNotFound first. If not, the error not found is going to be lunch as an html because is not defined in eHandler
app.use(eNotFound);
app.use(eHandler);




/************************************************************/
//create a dinamic port
const PORT = process.env.PORT || 5000;
//check the server and port
app.listen (PORT, console.log('Server is working properly in port: ' + PORT ));