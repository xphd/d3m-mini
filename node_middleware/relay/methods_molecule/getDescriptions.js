const fs = require("fs");

// import variables
const proto = require("../proto.js");

function getDescriptions(solution_ids_selected, herald) {
  console.log("describeSolutions called");

  let solution_ids = solution_ids_selected;
  let chain = Promise.resolve();
  for (let i = 0; i < solution_ids.length; i++) {
    let solution_id = solution_ids[i];
    chain = chain.then(() => {
      return getDescription(solution_id, herald);
    });
  }
  return new Promise(function(fulfill, reject) {
    let _fulfill = fulfill;
    let _reject = reject;
    chain
      .then(function(res) {
        _fulfill(herald);
      })
      .catch(function(err) {
        _reject(err);
      });
  });
}

function getDescription(solution_id, herald) {
  let solutions = herald.getSolutions();
  let solution = solutions.get(solution_id);

  // doing the shortcut now and see how far this takes us
  console.log("WARNING: TAKING THE DESCRIBE-SOLUTION SHORTCUT FOR NOW");
  return new Promise(function(fulfill, reject) {
    solution.finalOutput = "outputs.0";
    fulfill(solution);
  });
  // THIS DOES NOT GET EXECUTED FOR NOW
  console.log("request describe solution with id", solution_id);
  let describeSolutionRequest = new proto.DescribeSolutionRequest();
  describeSolutionRequest.setSolutionId(solution_id);

  // Added by Alex, for the purpose of Pipeline Visulization
  let pathPrefix = "responses/describeSolutionResponses/";
  if (!fs.existsSync(pathPrefix)) {
    fs.mkdirSync(pathPrefix);
  }

  return new Promise(function(fulfill, reject) {
    let client = herald.getClient();

    client.describeSolution(describeSolutionRequest, function(
      err,
      describeSolutionResponse
    ) {
      if (err) {
        reject(err);
      } else {
        // this is a PipelineDescription message
        let pipeline = describeSolutionResponse.pipeline;
        // console.log(pipeline);
        let outputs = pipeline.outputs;
        console.log(outputs);
        let finalOutput = outputs[outputs.length - 1].data;
        console.log("selecting final output for ", solution_id, finalOutput);

        solution.finalOutput = finalOutput;
        fulfill(solution);

        // Added by Alex, for the purpose of Pipeline Visulization
        let pathPrefix = "responses/describeSolutionResponses/";
        let pathMid = solution_id;
        let pathAffix = ".json";
        let path = pathPrefix + pathMid + pathAffix;
        let responseStr = JSON.stringify(describeSolutionResponse);
        fs.writeFileSync(path, responseStr);
      }
    });
  });
}

module.exports = getDescriptions;
