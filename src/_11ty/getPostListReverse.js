module.exports = function(collection) {
  let result = new Set();
  const reversedCollection = [ ...collection.getAll()];
  console.log(`>>> ${reversedCollection.length}`);
  reversedCollection.reverse().forEach(function(item) {
    if( "tags" in item.data ) {
      let tags = item.data.tags;

      tags = tags.filter(function(item) {
        switch(item) {
          // this list should match the `filter` list in tags.njk
          case "all":
          case "nav":
          case "post":
          case "posts":
            return false;
        }

        return true;
      });
      
      let isPost = false;
      for(let i=0;i<item.data.tags.length;i++){
        if (item.data.tags[i] == "posts"){
          isPost = true;
          break;
         
        }
      }
      if(isPost){
        item.data.tags = tags;
        result.add(item);
        console.log(`${item.data.title} >> ${JSON.stringify(tags)}`);
      }
    }
  });

  // returning an array in addCollection works in Eleventy 0.5.3
  return [...result];
};
