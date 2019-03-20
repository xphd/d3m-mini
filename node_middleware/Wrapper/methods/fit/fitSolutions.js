const fs = require("fs");

const props = require("../../props");
const fitSolution = require("./fitSolution.js");

function fitSolutions(sessionVar) {
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
  let solutions = props.sessionVar.solutions;
  let solution_ids = Array.from(solutions.keys());

  let chain = Promise.resolve();
  solution_ids.forEach(id => {
    chain = chain.then(() => {
      return fitSolution(id);
    });
  });

  let promise = new Promise((fulfill, reject) => {
    chain
      .then(() => {
        // console.log("RES", res);
        fulfill(sessionVar);
      })
      .catch(err => {
        // console.log("ERR", err);
        reject(err);
      });
  });
  return promise;
}

module.exports = fitSolutions;
