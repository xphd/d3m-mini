const fs = require("fs");

// import variables
const proto = require("../proto.js");

function exportSolutions(solution_id, rankStr, herald) {
  console.log("export fitted solution", solution_id);
  // let rank = .rankVar;
  // .rankVar = .rankVar - 0.00000001;
  let rank = parseFloat(rankStr);
  let solutionExportRequest = new proto.SolutionExportRequest();
  solutionExportRequest.setSolutionId(solution_id);
  solutionExportRequest.setRank(rank);
  console.log("solutionExportRequest", solutionExportRequest);
  let client = herald.getClient();
  client.solutionExport(solutionExportRequest, function(
    solutionExportResponse
  ) {
    // no content specified for this message
    console.log("solution exported");

    // Added by Alex, for the purpose of Pipeline Visulization
    // let path = "responses/solutionExportResponse.json";
    // let responseStr = JSON.stringify(solutionExportResponse);
    // fs.writeFileSync(path, responseStr);
  });
}

module.exports = exportSolutions;
