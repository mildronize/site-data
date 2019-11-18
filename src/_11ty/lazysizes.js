
const cheerio = require('cheerio')

module.exports = function(html) {
    const string = JSON.stringify();
    const $ = cheerio.load(html,{
        xmlMode: true,
        decodeEntities: false
    });
    
    
    $('img').each(function(i, elem) {
      $(this)
        .attr('data-src',`https://ce8be7dec.cloudimg.io/bound/1000x1000/q60/${$(this).attr('src')}`)
        .removeAttr('src')
        .addClass('lazyload');
    });

    return $.html({ decodeEntities: false });
}


