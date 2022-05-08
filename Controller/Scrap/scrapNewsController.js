const asyncHandler = require('express-async-handler');
const axios = require('axios');
const cheerio = require('cheerio');


const url ='https://es.investing.com/news/cryptocurrency-news';

const  scrapNews = asyncHandler(async (req, res) =>{
  try {
    const {data} = await axios ({
        method:'GET',
        url: url,
    })

    const $ = cheerio.load(data);
    

    let results = [];

    $("#leftColumn > div.largeTitle > article").each(function(i, element) {

        if(i <= 10){
        let link = $(element).children("#leftColumn > div.largeTitle > article > a").attr('href');
        let image = $(element).children().children('#leftColumn > div.largeTitle > article > a > img').attr('data-src');
        let alt = $(element).children().children('#leftColumn > div.largeTitle > article > a > img').attr('alt');
        let summary = $(element).children().children("#leftColumn > div.largeTitle > article > div.textDiv > a").attr('title');
        results.push({
          link: link,
          image: image,
          alt:alt,
          summary: summary
          
        });      
    }
      });
   
    //console.log(results);
    res.json(results);
  } catch (error) {
    //console.log(error);
    res.json(error);

  }  
});




module.exports = scrapNews;