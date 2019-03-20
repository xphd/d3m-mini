const fs = require("fs");

const props = require("../../props");
const produceSolution = require("./produceSolution.js");

function produceSolutions(sessionVar) {
  let solutions = props.sessionVar.solutions;
  let solution_ids = Array.from(solutions.keys());
  let chain = Promise.resolve();
  solution_ids.forEach(id => {
    chain = chain.then(() => {
      let solution = solutions.get(id);
      if (solution.fit != null) {
        return produceSolution(id);
      }
    });
  });

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
        fulfill(sessionVar);
      })
      .catch(err => {
        // console.log("produce solutions ERR", err);
        reject(err);
      });
  });
  return promise;
}

module.exports = produceSolutions;
