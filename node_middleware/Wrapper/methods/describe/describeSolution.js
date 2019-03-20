const fs = require("fs");

// import variables
const props = require("../../props");
const proto = props.proto;

function describeSolution(solution_id) {
  // doing the shortcut now and see how far this takes us
  // console.log("WARNING: TAKING THE DESCRIBE-SOLUTION SHORTCUT FOR NOW");
  // return new Promise(function(fulfill, reject) {
  //   solution.finalOutput = "outputs.0";
  //   fulfill(solution);
  // });
  // THIS DOES NOT GET EXECUTED FOR NOW
  console.log("request describe solution with id", solution_id);
  let request = new proto.DescribeSolutionRequest();
  request.setSolutionId(solution_id);

  // Added by Alex, for the purpose of Pipeline Visulization
  let pathPrefix = "responses/describeSolutionResponses/";
  if (!fs.existsSync(pathPrefix)) {
    fs.mkdirSync(pathPrefix);
  }

  let promise = new Promise(function(fulfill, reject) {
    let client = props.client;
    client.describeSolution(request, function(err, response) {
      if (err) {
        reject(err);
      } else {
        // this is a PipelineDescription message
        let pipeline = response.pipeline;
        // console.log(pipeline);
        let outputs = pipeline.outputs;
        console.log(outputs);
        let finalOutput = outputs[outputs.length - 1].data;
        console.log("selecting final output for ", solution_id, finalOutput);
        let solutions = props.sessionVar.solutions;
        let solution = solutions.get(solution_id);
        solution.finalOutput = finalOutput;
        fulfill(solution);

        // Added by Alex, for the purpose of Pipeline Visulization
        let pathPrefix = "responses/describeSolutionResponses/";
        let pathMid = solution_id;
        let pathAffix = ".json";
        let path = pathPrefix + pathMid + pathAffix;
        let responseStr = JSON.stringify(response);
        fs.writeFileSync(path, responseStr);
      }
    });
  });
  return promise;
}

module.exports = describeSolution;
