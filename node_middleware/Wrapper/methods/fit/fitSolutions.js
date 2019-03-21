const fs = require("fs");

const props = require("../../props");
const fitSolution = require("./fitSolution.js");

function fitSolutions(sessionVar) {
  console.log("fitSolutions called");
  let solutions = Array.from(props.sessionVar.solutions.values());

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
  solutions.forEach(solution => {
    chain = chain.then(() => {
      return fitSolution(solution);
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
