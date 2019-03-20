const fs = require("fs");

// import variables
const props = require("../../props");
const proto = props.proto;

function getFitSolutionResults(solution_id, request_id, fulfill, reject) {
  let _fulfill = fulfill;
  let _reject = reject;
  let solution = props.sessionVar.solutions.get(solution_id);
  let request = new proto.GetFitSolutionResultsRequest();
  request.setRequestId(request_id);

  let promise = new Promise((fulfill, reject) => {
    let client = props.client;
    let call = client.getFitSolutionResults(request);
    call.on("data", function(response) {
      // console.log("getfitSolutionResultsResponse", getFitSolutionResultsResponse);
      if (response.progress.state === "COMPLETED") {
        // fitting solution is finished
        let fit_id = response.fitted_solution_id;
        let exposedOutputs = response.exposed_outputs;
        // console.log("FITTED SOLUTION COMPLETED", fitID);
        // console.log("EXPOSED OUTPUTS", exposedOutputs);
        solution.fit = {
          fit_id: fit_id,
          exposedOutputs: exposedOutputs
        };

        // Added by Alex, for the purpose of Pipeline Visulization
        let pathPrefix = "responses/getFitSolutionResultsResponses/";
        let pathMid = solution.solution_id;
        let pathAffix = ".json";
        let path = pathPrefix + pathMid + pathAffix;
        let responseStr = JSON.stringify(response);
        fs.writeFileSync(path, responseStr);
      }
    });
    call.on("error", err => {
      console.log("Error!getFitSolutionResults", request_id);
      _reject(err);
    });
    call.on("end", err => {
      console.log("End of fitted solution results", request_id);
      if (err) console.log("err is ", err);
      _fulfill(request_id);
    });
  });
  return promise;
}

module.exports = getFitSolutionResults;
