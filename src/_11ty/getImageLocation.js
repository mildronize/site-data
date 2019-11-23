
const cheerio = require('cheerio');
const isUrl = require("is-url");

// use before Laysizes only

const getImageLocation = function (html) {

    const env = process.env.ELEVENTY_ENV;
    const prefix_url = env == "dev"?"/images":"https://mildronize-data.netlify.com/images";

    const $ = cheerio.load(html,{
        xmlMode: true,
        decodeEntities: false
    });
    
    $('img').each(function(i, elem) {
        
        const src = $(this).attr('src');
        if(isUrl(src))return;
        // const prefix_url = src.split("../images");
        // const image_name = prefix_url[1];
       
        const image_name = "/" + src;
        
      $(this)
        .attr('src',`${prefix_url}${image_name}`);
    });

    return $.html({ decodeEntities: false });
}

module.exports = getImageLocation;

// const out = getImageLocation("w efjwiefo <img src='../images/test.jpg' />   uwiefwf ");
// console.log(out);