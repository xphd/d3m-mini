const fs = require("fs");
const appRoot = require("app-root-path");
const evaluationConfig = require(appRoot + "/tufts_gt_wisc_configuration.json");

// import variables
const properties = require("../properties");
const proto = properties.proto;

// import functions
const handleImageUrl = require("../functions/handleImageUrl.js");

function getFitSolutions(solutionIDs_selected) {
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
  solutionIDs_selected.forEach(solutionID => {
    chain = chain.then(() => {
      return getFitSolution(solutionID);
    });
  });
  // for (let i = 0; i < solutionIDs_selected.length; i++) {
  //   let solution = solutions[i];
  //   chain = chain.then(solutionID => {
  //     return getFitSolution(solution);
  //   });
  // }
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

function getFitSolution(solutionID) {
  // TODO: fix function
  let fitSolutionRequest = new proto.FitSolutionRequest();
  let solution = properties.sessionVar.solutions.get(solutionID);
  fitSolutionRequest.setSolutionId(solutionID);
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
    const client = properties.client;
    client.fitSolution(fitSolutionRequest, function(err, fitSolutionResponse) {
      if (err) {
        reject(err);
      } else {
        let fitSolutionResponseID = fitSolutionResponse.request_id;
        getFitSolutionResults(solution, fitSolutionResponseID, fulfill, reject);

        // Added by Alex, for the purpose of Pipeline Visulization
        let pathPrefix = "responses/fitSolutionResponses/";
        let pathMid = solutionID;
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
    const client = properties.client;
    let call = client.getFitSolutionResults(getFitSolutionResultsRequest);
    call.on("data", function(getFitSolutionResultsResponse) {
      // console.log("getfitSolutionResultsResponse", getFitSolutionResultsResponse);
      if (getFitSolutionResultsResponse.progress.state === "COMPLETED") {
        // fitting solution is finished
        let fitID = getFitSolutionResultsResponse.fitted_solution_id;
        let exposedOutputs = getFitSolutionResultsResponse.exposed_outputs;
        // console.log("FITTED SOLUTION COMPLETED", fitID);
        // console.log("EXPOSED OUTPUTS", exposedOutputs);
        solution.fit = {
          fitID: fitID,
          exposedOutputs: exposedOutputs
        };

        // Added by Alex, for the purpose of Pipeline Visulization
        let pathPrefix = "responses/getFitSolutionResultsResponses/";
        let pathMid = solution.solutionID;
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