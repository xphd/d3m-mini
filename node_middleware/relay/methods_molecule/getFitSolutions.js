const fs = require("fs");

// import variables
const proto = require("../proto.js");

// import functions
// const handleImageUrl = require("../functions/legacy/handleImageUrl.js/index.js");

function getFitSolutions(solution_ids_selected, herald) {
  console.log("fitSolutions called");

  // Added by Alex, for the purpose of Pipeline Visulization
  if (herald.isResponse) {
    let pathPrefix = herald.RESPONSES_PATH + "fitSolutionResponses/";
    if (!fs.existsSync(pathPrefix)) {
      fs.mkdirSync(pathPrefix);
    }
    pathPrefix = herald.RESPONSES_PATH + "getFitSolutionResultsResponses/";
    if (!fs.existsSync(pathPrefix)) {
      fs.mkdirSync(pathPrefix);
    }
  }

  let chain = Promise.resolve();
  solution_ids_selected.forEach(id => {
    chain = chain.then(() => {
      return getFitSolution(id, herald);
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

function getFitSolution(solution_id, herald) {
  let solutions = herald.getSolutions();
  let solution = solutions.get(solution_id);
  // TODO: fix function
  let fitSolutionRequest = new proto.FitSolutionRequest();

  fitSolutionRequest.setSolutionId(solution_id);
  var dataset_input = new proto.Value();
  let datasetUri = herald.getDatasetUri();
  dataset_input.setDatasetUri(
    datasetUri
    // "file:///" + handleImageUrl(dataset.getDatasetPath() + "/datasetDoc.json")
  );
  fitSolutionRequest.setInputs(dataset_input);

  console.log("solution.finalOutput is: ", solution.finalOutput);
  fitSolutionRequest.setExposeOutputs(solution.finalOutput);
  fitSolutionRequest.setExposeValueTypes([proto.ValueType.CSV_URI]);
  // leave empty: repeated SolutionRunUser users = 5;
  return new Promise(function(fulfill, reject) {
    let client = herald.getClient();
    client.fitSolution(fitSolutionRequest, function(err, fitSolutionResponse) {
      if (err) {
        reject(err);
      } else {
        let fitSolutionResponseID = fitSolutionResponse.request_id;
        getFitSolutionResults(
          solution,
          fitSolutionResponseID,
          fulfill,
          reject,
          herald
        );

        // Added by Alex, for the purpose of Pipeline Visulization
        if (herald.isResponse) {
          let pathPrefix = herald.RESPONSES_PATH + "fitSolutionResponses/";
          let pathMid = solution_id;
          let pathAffix = ".json";
          let path = pathPrefix + pathMid + pathAffix;
          let responseStr = JSON.stringify(fitSolutionResponse);
          fs.writeFileSync(path, responseStr);
        }
      }
    });
  });
}

function getFitSolutionResults(
  solution,
  fitSolutionResponseID,
  fulfill,
  reject,
  herald
) {
  let _fulfill = fulfill;
  let _reject = reject;
  let getFitSolutionResultsRequest = new proto.GetFitSolutionResultsRequest();
  getFitSolutionResultsRequest.setRequestId(fitSolutionResponseID);

  return new Promise(function(fulfill, reject) {
    let client = herald.getClient();
    let call = client.getFitSolutionResults(getFitSolutionResultsRequest);
    call.on("data", function(response) {
      // console.log("response", response);
      console.log(">>>------->");
      console.log("getFitSolutionResultsResponses");
      console.log(response);
      console.log("<-------<<<");

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

        // console.log("solution is: ", solution);

        // Added by Alex, for the purpose of Pipeline Visulization
        if (herald.isResponse) {
          let pathPrefix =
            herald.RESPONSES_PATH + "getFitSolutionResultsResponses/";
          let pathMid = solution.solution_id;
          let pathAffix = ".json";
          let path = pathPrefix + pathMid + pathAffix;
          let responseStr = JSON.stringify(response);
          fs.writeFileSync(path, responseStr);
        }
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
