const fs = require("fs");
const appRoot = require("app-root-path");
const evaluationConfig = require(appRoot + "/tufts_gt_wisc_configuration.json");

// import variables
const props = require("../props");
const proto = props.proto;

// import functions
const handleImageUrl = require("../functions/handleImageUrl.js");

function getFitSolutions(solution_ids_selected) {
  console.log("fitSolutions called");

  // Added by Alex, for the purpose of Pipeline Visulization
  let pathPrefix = "responses/fitSolutionResponses/";
  if (!fs.existsSync(pathPrefix)) {
    fs.mkdirSync(pathPrefix);
  }
  pathPrefix = "responses/getFitSolutionResultsResponses/";
  if (!fs.existsSync(pathPrefix)) {
    fs.mkdirSync(pathPrefix);
  }

  let chain = Promise.resolve();
  solution_ids_selected.forEach(id => {
    chain = chain.then(() => {
      return getFitSolution(id);
    });
  });

  return new Promise(function(fulfill, reject) {
    chain
      .then(function(res) {
        // console.log("RES", res);
        fulfill();
      })
      .catch(function(err) {
        // console.log("ERR", err);
        reject(err);
      });
  });
}

function getFitSolution(solution_id) {
  // TODO: fix function
  let fitSolutionRequest = new proto.FitSolutionRequest();
  let solution = props.sessionVar.solutions.get(solution_id);
  fitSolutionRequest.setSolutionId(solution_id);
  var dataset_input = new proto.Value();
  dataset_input.setDatasetUri(
    "file://" + handleImageUrl(evaluationConfig.dataset_schema)
  );
  fitSolutionRequest.setInputs(dataset_input);

  console.log("solution.finalOutput is: ", solution.finalOutput);
  fitSolutionRequest.setExposeOutputs(solution.finalOutput);
  fitSolutionRequest.setExposeValueTypes([proto.ValueType.CSV_URI]);
  // leave empty: repeated SolutionRunUser users = 5;
  return new Promise(function(fulfill, reject) {
    const client = props.client;
    client.fitSolution(fitSolutionRequest, function(err, fitSolutionResponse) {
      if (err) {
        reject(err);
      } else {
        let fitSolutionResponseID = fitSolutionResponse.request_id;
        getFitSolutionResults(solution, fitSolutionResponseID, fulfill, reject);

        // Added by Alex, for the purpose of Pipeline Visulization
        let pathPrefix = "responses/fitSolutionResponses/";
        let pathMid = solution_id;
        let pathAffix = ".json";
        let path = pathPrefix + pathMid + pathAffix;
        let responseStr = JSON.stringify(fitSolutionResponse);
        fs.writeFileSync(path, responseStr);
      }
    });
  });
}

function getFitSolutionResults(
  solution,
  fitSolutionResponseID,
  fulfill,
  reject
) {
  let _fulfill = fulfill;
  let _reject = reject;
  let getFitSolutionResultsRequest = new proto.GetFitSolutionResultsRequest();
  getFitSolutionResultsRequest.setRequestId(fitSolutionResponseID);

  return new Promise(function(fulfill, reject) {
    let client = props.client;
    let call = client.getFitSolutionResults(getFitSolutionResultsRequest);
    call.on("data", function(getFitSolutionResultsResponse) {
      // console.log("getfitSolutionResultsResponse", getFitSolutionResultsResponse);
      if (getFitSolutionResultsResponse.progress.state === "COMPLETED") {
        // fitting solution is finished
        let fit_id = getFitSolutionResultsResponse.fitted_solution_id;
        let exposedOutputs = getFitSolutionResultsResponse.exposed_outputs;
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
        let responseStr = JSON.stringify(getFitSolutionResultsResponse);
        fs.writeFileSync(path, responseStr);
      }
    });
    call.on("error", function(err) {
      console.log("Error!getFitSolutionResults", fitSolutionResponseID);
      _reject(err);
    });
    call.on("end", function(err) {
      console.log("End of fitted solution results", fitSolutionResponseID);
      if (err) console.log("err is ", err);
      _fulfill(fitSolutionResponseID);
    });
  });
}

module.exports = getFitSolutions;
