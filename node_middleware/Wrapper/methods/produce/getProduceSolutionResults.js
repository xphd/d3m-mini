const fs = require("fs");

// import variables
const props = require("../../props");
const proto = props.proto;

function getProduceSolutionResults(solution_id, request_id, fulfill, reject) {
  // console.log("get produce solution called");
  let _fulfill = fulfill;
  let _reject = reject;
  let request = new proto.GetProduceSolutionResultsRequest();
  request.setRequestId(request_id);

  let promise = new Promise((fulfill, reject) => {
    let client = props.client;
    console.log("GetProduceSolutionResultsRequest", request);
    let call = client.GetProduceSolutionResults(request);
    call.on("data", response => {
      // console.log("getProduceSolutionResultsResponse", getProduceSolutionResultsResponse);
      if (response.progress.state === "COMPLETED") {
        // fitting solution is finished
        let exposedOutputs = response.exposed_outputs;
        // console.log("PRODUCE SOLUTION COMPLETED", produceSolutionResponseID);
        // console.log("EXPOSED OUTPUTS", exposedOutputs);
        let steps = Object.keys(exposedOutputs);
        if (steps.length !== 1) {
          console.log("EXPOSED OUTPUTS:", exposedOutputs);
          console.log("ONLY USING FIRST STEP OF", steps);
        }
        let solution = props.sessionVar.solutions.get(solution_id);
        solution.fit.outputCsv = exposedOutputs[steps[0]]["csv_uri"].replace(
          "file://",
          ""
        );
        if (!solution.fit.outputCsv.trim()) {
          console.log(
            "WARNING: solution " +
              solution_id +
              " has not output file; removing from results set"
          );
          sessionVar.solutions.delete(solution_id);
        }
        // console.log("solution.fit.outputCsv", solution.fit.outputCsv);
      }

      // Added by Alex, for the purpose of Pipeline Visulization
      let pathPrefix = "responses/getProduceSolutionResultsResponses/";
      let pathMid = request_id;
      let pathAffix = ".json";
      let path = pathPrefix + pathMid + pathAffix;
      let responseStr = JSON.stringify(response);
      fs.writeFileSync(path, responseStr);
    });
    call.on("error", err => {
      console.log("Error!getProduceSolutionResults", request_id);
      _reject(err);
    });
    call.on("end", err => {
      console.log("End of produce solution results", request_id);
      if (err) console.log("err is ", err);
      _fulfill(request_id);
    });
  });
  return promise;
}
module.exports = getProduceSolutionResults;
