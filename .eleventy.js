const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const zone = 'Asia/Bangkok';

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.setDataDeepMerge(true);
  // Move images to dist folder without processing
  eleventyConfig.addPassthroughCopy({ "src/_template/assets": "assets" });
  eleventyConfig.addPassthroughCopy("src/static");
  // Alias `layouts/post.njk` to `post`
  eleventyConfig.addLayoutAlias("base", "layouts/base.liquid");
  eleventyConfig.addLayoutAlias("post", "layouts/post.liquid");
  eleventyConfig.addLayoutAlias("page", "layouts/page.liquid");

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone}).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addFilter("dateToISO", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone}).toISO();
  });

  eleventyConfig.addFilter('toString', (html) => {
    return html.toString();
  });

  eleventyConfig.addFilter('jsonify', (object) => {
    return JSON.stringify(object);
  });

   // Get the first `n` elements of a collection.
   eleventyConfig.addFilter("head", (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addCollection("tagList", require("./_11ty/getTagList"));


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
    dir: { input: 'src', output: 'dist', data: '_data', includes: "_template/_includes" },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'md', 'css', 'html', 'yml'],
    htmlTemplateEngine: 'njk',
    // markdownTemplateEngine: 'njk',
  }
}
