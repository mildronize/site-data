module.exports = function(collection) {
  let result = new Set();
  collection.getAll().forEach(function(item) {
    if( "tags" in item.data ) {
      let tags = item.data.tags;
      if(tags == "pages"){
        result.add(item);
      }
    }
  });

  // returning an array in addCollection works in Eleventy 0.5.3
  return [...result];
};
