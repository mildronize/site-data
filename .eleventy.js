const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const toLazysizes = require('./src/_11ty/lazysizes');
const convertImageLocation = require('./src/_11ty/getImageLocation.js');
const zone = 'Asia/Bangkok';

module.exports = function(eleventyConfig) {
  const env = process.env.ELEVENTY_ENV;


  eleventyConfig.setLiquidOptions({
    dynamicPartials: true
  });

  console.log(`Run with ${env}`);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.setDataDeepMerge(true);
  // Move images to dist folder without processing
  eleventyConfig.addPassthroughCopy({ "src/_template/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "posts/**/*.jpg" : "images"} );
  eleventyConfig.addPassthroughCopy({ "posts/**/*.png" : "images"} );
  eleventyConfig.addPassthroughCopy({ "posts/**/*.gif" : "images"} );
  // netlify config
  // eleventyConfig.addPassthroughCopy({ "_headers" : "_headers"} );

  // Alias `layouts/post.njk` to `post`
  if(env == "dev"){
    console.log(`set for ${env}`);
    eleventyConfig.addLayoutAlias("base", "layouts/base-preview.liquid");
    eleventyConfig.addLayoutAlias("post", "layouts/post-preview.liquid");
  }else {
    console.log(`set for ${env}`);
    eleventyConfig.addLayoutAlias("base", "layouts/base.liquid");
    eleventyConfig.addLayoutAlias("post", "layouts/post.liquid");
  }

  eleventyConfig.addLayoutAlias("page", "layouts/page.liquid");

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone}).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addFilter("dateToISO", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone}).toISO();
  });

  eleventyConfig.addFilter('readableDateYearMonthDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone}).toFormat('yyyy MMM, d');
  });

  eleventyConfig.addFilter('jsonify', (object) => {
    return JSON.stringify(object);
  });

  eleventyConfig.addFilter('toLazysizes', (htmlString) => {
    return toLazysizes(htmlString);
  });

  eleventyConfig.addFilter('convertImageLocation', (htmlString) => {
    return convertImageLocation(htmlString);
  });

   // Get the first `n` elements of a collection.
   eleventyConfig.addFilter("head", (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addCollection("tagList", require("./src/_11ty/getTagList"));
  eleventyConfig.addCollection("pages", require("./src/_11ty/getPageList"));
  eleventyConfig.addCollection("reversedPosts", require("./src/_11ty/getPostListReverse"));

   /* Begin Markdown Plugins */
   let markdownIt = require("markdown-it");
   let markdownItAnchor = require("markdown-it-anchor");
   let markdownItAttrs = require("markdown-it-attrs");
   let options = {
     html: true,
     breaks: true,
     linkify: true
   };
   let opts = {
     permalink: true,
     permalinkClass: "direct-link",
     permalinkSymbol: "#"
   };
   eleventyConfig.setLibrary("md", markdownIt(options)
     .use(markdownItAnchor, opts)
     .use(markdownItAttrs)
   );
   /* End Markdown Plugins */

  return {
    dir: { input: './', output: 'dist', data: '_data', includes: "src/_template/_includes" },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'md', 'css', 'html', 'yml'],
    htmlTemplateEngine: 'liquid',
    // markdownTemplateEngine: 'njk',
  }
}
