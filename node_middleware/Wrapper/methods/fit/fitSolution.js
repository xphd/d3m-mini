const fs = require("fs");

// import variables
const props = require("../../props");
const proto = props.proto;

// import functions
const handleImageUrl = require("../../functions/handleImageUrl.js");

const CONFIG_PATH = props.CONFIG_PATH;
const evaluationConfig = require(CONFIG_PATH);

const getFitSolutionResults = require("./getFitSolutionResults.js");

function fitSolution(solution_id) {
  let solutions = props.sessionVar.solutions;
  let solution = solutions.get(solution_id);
  // TODO: fix function
  let request = new proto.FitSolutionRequest();
  request.setSolutionId(solution_id);
  let dataset_input = new proto.Value();
  dataset_input.setDatasetUri(
    "file://" + handleImageUrl(evaluationConfig.dataset_schema)
  );
  request.setInputs(dataset_input);
  request.setExposeOutputs(solution.finalOutput);
  request.setExposeValueTypes([proto.ValueType.CSV_URI]);
  // leave empty: repeated SolutionRunUser users = 5;
  return new Promise(function(fulfill, reject) {
    let client = props.client;
    console.log(request);
    client.fitSolution(request, function(err, response) {
      if (err) {
        reject(err);
      } else {
        let request_id = response.request_id;
        getFitSolutionResults(solution_id, request_id, fulfill, reject);

        // Added by Alex, for the purpose of Pipeline Visulization
        let pathPrefix = "responses/fitSolutionResponses/";
        let pathMid = solution_id;
        let pathAffix = ".json";
        let path = pathPrefix + pathMid + pathAffix;
        let responseStr = JSON.stringify(response);
        fs.writeFileSync(path, responseStr);
      }
    });
  });
}
module.exports = fitSolution;
