const fs = require("fs");

// import variables
const props = require("../../props");
const proto = props.proto;

function exportFittedSolution(solution) {
  let solution_id = solution.solution_id;
  console.log("export fitted solution", solution_id);
  let rank = sessionVar.rankVar;
  sessionVar.rankVar = sessionVar.rankVar - 0.00000001;
  let solutionExportRequest = new proto.SolutionExportRequest();
  solutionExportRequest.setFittedSolutionId(solution.fit.fit_id);
  solutionExportRequest.setRank(rank);
  let client = props.client;
  client.solutionExport(solutionExportRequest, response => {
    // no content specified for this message
    console.log("solution exported");

    // Added by Alex, for the purpose of Pipeline Visulization
    let path = "responses/solutionExportResponse.json";
    let responseStr = JSON.stringify(response);
    fs.writeFileSync(path, responseStr);
  });
}

module.exports = exportFittedSolution;
