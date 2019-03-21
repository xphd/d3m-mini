const fs = require("fs");
const _ = require("lodash");

// import variables
const props = require("../../props");
const proto = props.proto;

function getScoreSolutionResults(solution, scoreRequest_id, fulfill, reject) {
  // let solutions = props.sessionVar.solutions;
  // let solution = solutions.get(solution_id);
  let _fulfill = fulfill;
  let _reject = reject;
  let request = new proto.GetScoreSolutionResultsRequest();
  request.setRequestId(scoreRequest_id);
  let client = props.client;
  let call = client.getScoreSolutionResults(request);
  call.on("data", function(response) {
    if (response.progress.state === "COMPLETED") {
      // let targets = getScoreSolutionResultsResponse.scores.map(score => score.targets);

      let value_keys = response.scores.map(score => score.value.value);
      let metrics = response.scores.map(score => score.metric);
      let values = value_keys.map((key, i) => response.scores[i].value[key]);
      values = values.map(thing => thing[thing.raw]);
      // console.log("METRICS", metrics);
      // console.log("VALUES", values);
      solution.scores = {};
      for (let i = 0; i < metrics.length; i++) {
        // solution.scores = { f1Macro: _.mean(values) };
        console.log("METRICS", metrics[i], values, "num values", values.length);
        solution.scores[metrics[i].metric] = _.mean(values);
      }
    } else {
      console.log("scoreSolutionResultsResponse INTERMEDIATE", response);
    }

    // Added by Alex, for the purpose of Pipeline Visulization
    let pathPrefix = "responses/getScoreSolutionResultsResponses/";
    let pathMid = scoreRequest_id;
    let pathAffix = ".json";
    let path = pathPrefix + pathMid + pathAffix;
    let responseStr = JSON.stringify(response);
    fs.writeFileSync(path, responseStr);
  });
  call.on("error", err => {
    console.log("Error!getScoreSolutionResults: ", scoreRequest_id);
    _reject(err);
  });
  call.on("end", err => {
    console.log("End of score solution result: ", scoreRequest_id);
    if (err) console.log("err is ", err);
    _fulfill(scoreRequest_id);
  });
}
module.exports = getScoreSolutionResults;
