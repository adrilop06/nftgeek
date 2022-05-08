const express = require("express");
const cors = require("cors");
const scrapNews = require("../../Controller/Scrap/scrapNewsController");

const scrapNewsRoute = express.Router();

scrapNewsRoute.use(cors());
scrapNewsRoute.options('*', cors());

scrapNewsRoute.get('/', scrapNews)

module.exports = scrapNewsRoute;