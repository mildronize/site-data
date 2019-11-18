const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const toLazysizes = require('./_11ty/lazysizes');
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
  eleventyConfig.addPassthroughCopy("src/static");

  
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

  eleventyConfig.addFilter('toLazysizes', (object) => {
    return toLazysizes(object);
  });


  eleventyConfig.addFilter('reverse', (array) => {
    return array.reverse();
  });


   // Get the first `n` elements of a collection.
   eleventyConfig.addFilter("head", (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addCollection("tagList", require("./_11ty/getTagList"));
  eleventyConfig.addCollection("pages", require("./_11ty/getPageList"));

   /* Begin Markdown Plugins */
   let markdownIt = require("markdown-it");
   let markdownItAttrs = require("markdown-it-attrs");
   let options = {
     html: true,
     breaks: true,
     linkify: true
   };
   eleventyConfig.setLibrary("md", markdownIt(options)
     .use(markdownItAttrs)
   );
   /* End Markdown Plugins */

  return {
    dir: { input: 'src', output: 'dist', data: '_data', includes: "_template/_includes" },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'md', 'css', 'html', 'yml'],
    htmlTemplateEngine: 'liquid',
    // markdownTemplateEngine: 'njk',
  }
}
