
const cheerio = require('cheerio')

module.exports = function(html) {
    const string = JSON.stringify();
    const $ = cheerio.load(html,{
        xmlMode: true,
        decodeEntities: false
    });
    
    
    $('img').each(function(i, elem) {
      $(this)
        .attr('data-src',$(this).attr('src'))
        .removeAttr('src')
        .addClass('lazyload');
    });

    return $.html({ decodeEntities: false });
}


