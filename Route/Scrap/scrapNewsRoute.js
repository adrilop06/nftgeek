const express = require("express");
const scrapNews = require("../../Controller/Scrap/scrapNewsController");
const scrapNewsRoute = express.Router();


scrapNewsRoute.get('/', scrapNews)

module.exports = scrapNewsRoute;