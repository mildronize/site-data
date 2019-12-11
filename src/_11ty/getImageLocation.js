const cheerio = require("cheerio");
const isUrl = require("is-url");

// use before Laysizes only

const getImageLocation = function(html) {
  const env = process.env.ELEVENTY_ENV;
  const prefix_url =
    env == "dev" ? "/images" : "https://mildronize-data.netlify.com/images";

  const newImgTags = [];
  var allImgTags = html.match(/<\s*img[^>]*>(.*?)/g);
  if (allImgTags === undefined || allImgTags === null) return html;
  console.log(allImgTags);
  allImgTags.forEach(tag => {
    let src = tag.match(/(?<=\bsrc=["|'])[^"|']*/g);
    if (src != null && src.length > 0) {
      console.log(src[0]);
      let newTag = "";
      if (isUrl(src[0])) {
        console.log("yeee");
        newTag = tag;
      } else {
        const image_name = "/" + src[0];
        newSrc = encodeURI(`${prefix_url}${image_name}`);
        newTag = tag.replace(src[0], newSrc);
      }
      newImgTags.push(newTag);
    }
  });

  for (let i = 0; i < newImgTags.length; i++) {
      html = html.replace(allImgTags[i], newImgTags[i]);
  }

  return html;

  // const $ = cheerio.load(html,{
  //     xmlMode: true,
  //     decodeEntities: false
  // });

  // $('img').each(function(i, elem) {

  //     const src = $(this).attr('src');
  //     if(isUrl(src))return;
  //     // const prefix_url = src.split("../images");
  //     // const image_name = prefix_url[1];

  //     const image_name = "/" + src;

  //   $(this)
  //     .attr('src',`${prefix_url}${image_name}`);
  // });

  // return $.html({ decodeEntities: false });
};

module.exports = getImageLocation;

// const out = getImageLocation(
//   'w efjwiefo <img src="test.png" />  ejfo iwjfwie  <img src="http://a.com/a.png"> jfowef uw <img src="teewfwe fst.jpg" alt="efef">  iefwf '
// );
// console.log(out);
