const fs = require("fs");

// import variables
const properties = require("../properties");
const proto = properties.proto;
const sessionVar = properties.sessionVar;

exportSolutions = function(solutionID, rankStr) {
  console.log("export fitted solution", solutionID);
  // let rank = sessionVar.rankVar;
  // sessionVar.rankVar = sessionVar.rankVar - 0.00000001;
  let rank = parseFloat(rankStr);
  let solutionExportRequest = new proto.SolutionExportRequest();
  solutionExportRequest.setSolutionId(solutionID);
  solutionExportRequest.setRank(rank);
  console.log("solutionExportRequest", solutionExportRequest);
  const client = properties.client;
  client.solutionExport(solutionExportRequest, function(
    solutionExportResponse
  ) {
    // no content specified for this message
    console.log("solution exported");

    // Added by Alex, for the purpose of Pipeline Visulization
    let path = "responses/solutionExportResponse.json";
    let responseStr = JSON.stringify(solutionExportResponse);
    fs.writeFileSync(path, responseStr);
  });
};

module.exports = exportSolutions;
