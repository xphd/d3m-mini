const fs = require("fs");
const appRoot = require("app-root-path");
const evaluationConfig = require(appRoot + "/tufts_gt_wisc_configuration.json");

// import variables
const props = require("../props");
const proto = props.proto;

// import functions
const handleImageUrl = require("../functions/handleImageUrl.js");

function getProduceSolutions(solution_ids_selected) {
  let chain = Promise.resolve();
  solution_ids_selected.forEach(solution_id => {
    chain = chain.then(() => {
      return getProduceSolution(solution_id);
    });
  });
  // for (let i = 0; i < solutions.length; i++) {
  //   let solution = solutions[i];
  //   chain = chain.then(solution_id => {
  //     return getProduceSolution(solution);
  //   });
  // }

  // Added by Alex, for the purpose of Pipeline Visulization
  let pathPrefix = "responses/produceSolutionResponses/";
  if (!fs.existsSync(pathPrefix)) {
    fs.mkdirSync(pathPrefix);
  }
  pathPrefix = "responses/getProduceSolutionResultsResponses/";
  if (!fs.existsSync(pathPrefix)) {
    fs.mkdirSync(pathPrefix);
  }

  let promise = new Promise((fulfill, reject) => {
    chain
      .then(res => {
        console.log("produce solutions RES", res);
        fulfill();
      })
      .catch(err => {
        // console.log("produce solutions ERR", err);
        reject(err);
      });
  });
  return promise;
}

function getProduceSolution(solution_id) {
  // console.log("produce solution called");
  let solution = props.sessionVar.solutions.get(solution_id);
  let produceSolutionRequest = new proto.ProduceSolutionRequest();

  console.log("solution_id is:", solution_id);

  let fit_id = solution.fit.fit_id;
  console.log("fit_id is", fit_id);

  // produceSolutionRequest.setFittedSolutionId(solution_id);
  produceSolutionRequest.setFittedSolutionId(fit_id);

  let dataset_input = new proto.Value();
  dataset_input.setDatasetUri(
    "file://" + handleImageUrl(evaluationConfig.dataset_schema)
  );
  produceSolutionRequest.setInputs(dataset_input);
  /*
      if (sessionVar.ta2Ident.user_agent === "cmu_ta2") {
        produceSolutionRequest.setExposeOutputs("");
      }*/
  console.log("solution.finalOutput is:", solution.finalOutput);
  produceSolutionRequest.setExposeOutputs(solution.finalOutput);
  produceSolutionRequest.setExposeValueTypes([proto.ValueType.CSV_URI]);
  // leaving empty: repeated SolutionRunUser users = 5;

  let promise = new Promise((fulfill, reject) => {
    const client = props.client;
    client.produceSolution(
      produceSolutionRequest,
      (err, produceSolutionResponse) => {
        if (err) {
          reject(err);
        } else {
          let request_id = produceSolutionResponse.request_id;
          getProduceSolutionResults(solution_id, request_id, fulfill, reject);

          // Added by Alex, for the purpose of Pipeline Visulization
          let pathPrefix = "responses/produceSolutionResponses/";
          // let pathMid = produceSolutionRequestID;
          let pathMid = solution_id;
          let pathAffix = ".json";
          let path = pathPrefix + pathMid + pathAffix;
          let responseStr = JSON.stringify(produceSolutionResponse);
          fs.writeFileSync(path, responseStr);
        }
      }
    );
  });
  return promise;
}

function getProduceSolutionResults(solution_id, request_id, fulfill, reject) {
  let solutions = props.sessionVar.solutions;
  let solution = solutions.get(solution_id);
  // console.log("get produce solution called");
  let _fulfill = fulfill;
  let _reject = reject;
  let getProduceSolutionResultsRequest = new proto.GetProduceSolutionResultsRequest();
  getProduceSolutionResultsRequest.setRequestId(request_id);

  let promise = new Promise((fulfill, reject) => {
    const client = props.client;
    let call = client.GetProduceSolutionResults(
      getProduceSolutionResultsRequest
    );
    call.on("data", response => {
      // console.log("getProduceSolutionResultsResponse", request_id);
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
          solutions.delete(solution_id);
        }
        console.log(solution);
        // console.log("solution.fit.outputCsv", solution.fit.outputCsv);
      }

      // Added by Alex, for the purpose of Pipeline Visulization
      let pathPrefix = "responses/getProduceSolutionResultsResponses/";
      let pathMid = request_id;
      let pathAffix = ".json";
      let path = pathPrefix + pathMid + pathAffix;
      let responseStr = JSON.stringify(request_id);
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

module.exports = getProduceSolutions;
