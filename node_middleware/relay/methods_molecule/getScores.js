const fs = require("fs");
const _ = require("lodash");

// import variables
const proto = require("../proto.js");

// import mappings
const metric_mappings = require("../mappings/metric_mappings");

// import functions
const getMappedType = require("../functions/getMappedType");
const handleImageUrl = require("../functions/legacy/handleImageUrl");

function getScores(solution_ids_selected, metrics, herald) {
  console.log("getScores");
  let chain = Promise.resolve();

  if (herald.isResponse) {
    let pathPrefix = herald.RESPONSES_PATH + "getScoreResponses/";
    if (!fs.existsSync(pathPrefix)) {
      fs.mkdirSync(pathPrefix);
    }
  }

  for (let i = 0; i < solution_ids_selected.length; i++) {
    let solution_id = solution_ids_selected[i];
    chain = chain.then(() => {
      return getScore(solution_id, metrics, herald);
    });
  }

  return new Promise(function(fulfill, reject) {
    let _fulfill = fulfill;
    chain
      .then(function(res) {
        _fulfill();
      })
      .catch(function(err) {
        // console.log("ERR", err);
        reject(err);
      });
  });
}

function getScore(solution_id, metrics, herald) {
  console.log("scoring solution with id", solution_id);
  let scoreSolutionRequest = new proto.ScoreSolutionRequest();
  scoreSolutionRequest.setSolutionId(solution_id);

  let dataset_input = new proto.Value();

  let datasetUri = herald.handleImageUrl();
  dataset_input.setDatasetUri(
    datasetUri
    // "file:///" + handleImageUrl(dataset.getDatasetPath() + "/datasetDoc.json")
  );
  scoreSolutionRequest.setInputs(dataset_input);

  let mapped_metrics = metrics.map(metric =>
    getMappedType(metric_mappings, metric)
  );
  let problemPerformanceMetrics = mapped_metrics.map(mapped_metric => {
    let newMetric = new proto.ProblemPerformanceMetric();
    newMetric.setMetric(mapped_metric);
    return newMetric;
  });
  scoreSolutionRequest.setPerformanceMetrics(problemPerformanceMetrics);

  let scoringConfiguration = new proto.ScoringConfiguration();

  scoringConfiguration.setMethod(proto.EvaluationMethod.HOLDOUT);
  scoringConfiguration.setTrainTestRatio(0.8);

  scoreSolutionRequest.setConfiguration(scoringConfiguration);

  return new Promise(function(fulfill, reject) {
    let client = herald.getClient();
    client.scoreSolution(scoreSolutionRequest, function(
      err,
      scoreSolutionResponse
    ) {
      if (err) {
        reject(err);
      } else {
        let scoreRequestID = scoreSolutionResponse.request_id;
        getScoresResponse(solution_id, scoreRequestID, fulfill, reject, herald);
      }
    });
  });
}

function getScoresResponse(
  solution_id,
  scoreRequestID,
  fulfill,
  reject,
  herald
) {
  let _fulfill = fulfill;
  let _reject = reject;
  let getScoreSolutionResultsRequest = new proto.GetScoreSolutionResultsRequest();
  getScoreSolutionResultsRequest.setRequestId(scoreRequestID);
  let client = herald.getClient();
  let call = client.getScoreSolutionResults(getScoreSolutionResultsRequest);
  call.on("data", function(response) {
    // Added by Alex, for the purpose of Pipeline Visulization
    if (herald.isResponse) {
      let pathPrefix = herald.RESPONSES_PATH + "getScoreResponses/";
      let pathMid = solution_id;
      let pathAffix = ".json";
      let path = pathPrefix + pathMid + pathAffix;
      let responseStr = JSON.stringify(response);
      fs.writeFileSync(path, responseStr);
    }

    console.log(">>>============>");
    console.log("getScoreResponses");
    console.log(JSON.stringify(response));
    console.log("<===========<<<");

    if (response.progress.state === "COMPLETED") {
      // console.log("scoreSolutionResultsResponse", response);
      /*
          let targets = response.scores.map(score => score.targets);
          */
      let value_keys = response.scores.map(score => score.value.value);
      let metrics = response.scores.map(score => score.metric);
      let values = value_keys.map((key, i) => response.scores[i].value[key]);
      values = values.map(thing => thing[thing.raw]);
      // console.log("METRICS", metrics);
      // console.log("VALUES", values);

      let solution = herald.getSolutions().get(solution_id);
      solution.scores = {};
      for (let i = 0; i < metrics.length; i++) {
        // solution.scores = { f1Macro: _.mean(values) };
        let metric = metrics[i];
        console.log("METRICS", metric, values, "num values", values.length);
        console.log(values);

        // solution.scores[metric.metric] = _.mean(values);
        solution.scores[metric.metric] = values[i];
        console.log("solution:", solution_id);
        console.log(solution);
      }
    } else {
      console.log("scoreSolutionResultsResponse INTERMEDIATE", response);
    }
    // // Added by Alex, for the purpose of Pipeline Visulization
    // let pathPrefix = "responses/getScoreResponses/";
    // let pathMid = solution_id;
    // let pathAffix = ".json";
    // let path = pathPrefix + pathMid + pathAffix;
    // let responseStr = JSON.stringify(response);
    // fs.writeFileSync(path, responseStr);
  });
  call.on("error", function(err) {
    console.log("Error!getScoreSolutionResults: ", scoreRequestID);
    _reject(err);
  });
  call.on("end", function(err) {
    console.log("End of score solution result: ", scoreRequestID);
    if (err) console.log("err is ", err);
    _fulfill(scoreRequestID);
  });
}

module.exports = getScores;
