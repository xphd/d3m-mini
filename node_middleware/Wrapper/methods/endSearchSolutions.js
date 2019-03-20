const fs = require("fs");

// import variables
const props = require("../props");
const proto = props.proto;

function endSearchSolutions(sessionVar) {
  return new Promise(function(fulfill, reject) {
    console.log("end search solutions for search", sessionVar.searchID);
    let endSearchSolutionsRequest = new proto.EndSearchSolutionsRequest();
    endSearchSolutionsRequest.setSearchId(sessionVar.searchID);
    let client = props.client;
    client.endSearchSolutions(endSearchSolutionsRequest, (err, response) => {
      if (err) {
        reject(err);
      } else {
        sessionVar.searchEnded = true;
        fulfill(sessionVar);

        // Added by Alex, for the purpose of Pipeline Visulization
        let path = "responses/endSearchSolutionsResponse.json";
        let responseStr = JSON.stringify(props);
        fs.writeFileSync(path, responseStr);
      }
    });
  });
}

module.exports = endSearchSolutions;
