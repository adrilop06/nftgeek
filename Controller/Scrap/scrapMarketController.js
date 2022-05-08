//import express handler to control the errors
const asyncHandler = require('express-async-handler');
const axios = require('axios');
const cheerio = require('cheerio');


const url ='https://coinmarketcap.com/es/view/gaming/';

const  scrapMarket = asyncHandler(async (req, res) =>{
    try {
        const {data} = await axios ({
            method:'GET',
            url: url,
        })

        const $ = cheerio.load(data);
        const elemSelector= '#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr';
        
        let results = [];

    $(elemSelector).each(function(i, element) {

        if(i <= 9){
        let rank = $(element).children().children("#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr > td:nth-child(2) > p").text(); 
        let image = $(element).children().children().children().children().children('#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr > td:nth-child(3) > div > a > div > img').attr('src');
        let name = $(element).children().children().children().children().children().children('#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr > td:nth-child(3) > div > a > div > div > p').text();
        let price = $(element).children().children().children("#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr> td:nth-child(4) > div > a").text();
        let one_day_percentage = $(element).children().children( "#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr> td:nth-child(5) > span").text();
        let seven_days = $(element).children().children( "#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr > td:nth-child(6) > span").text();
        let market_value = $(element).children().children().children("#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr> td:nth-child(7) > p > span.sc-1ow4cwt-1.ieFnWP").text();
        let market_value_one_day = $(element).children().children().children("#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr > td:nth-child(8) > div > a").text();
        let market_value_one_day_coin = $(element).children().children().children().children("#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr > td:nth-child(8) > div > div > p").text();
        
        results.push({
          rank: rank,
          image: image,
          name:name,
          price: price,
          one_day_percentage: one_day_percentage,
          seven_days: seven_days,
          market_value:market_value,
          market_value_one_day: market_value_one_day,
          market_value_one_day_coin: market_value_one_day_coin
          
        });      
    }
})
         
    
    
        console.log(results);
        res.json(results);
      } catch (error) {
            console.log(error);
        //res.json(error);
    
      }  
});

module.exports = scrapMarket;