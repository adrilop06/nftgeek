const express = require("express");
const cors = require("cors");
const scrapMarket = require("../../Controller/Scrap/scrapMarketController");


const scrapMarketRoute = express.Router();





scrapMarketRoute.use(cors());
scrapMarketRoute.options('*', cors());

scrapMarketRoute.get('/', scrapMarket)

module.exports = scrapMarketRoute;