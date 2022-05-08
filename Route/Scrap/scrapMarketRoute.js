const express = require("express");
const scrapMarketRoute = express.Router();
const scrapMarket = require("../../Controller/Scrap/scrapMarketController");

scrapMarketRoute.get('/', scrapMarket)

module.exports = scrapMarketRoute;