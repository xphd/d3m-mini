const fs = require("fs");

const props = require("../../props");
const scoreSolution = require("./scoreSolution.js");

function scoreSolutions(sessionVar) {
  // console.log("scoreSolutions called");
  let solutions = props.sessionVar.solutions;
  let solution_ids = Array.from(solutions.keys());

  let chain = Promise.resolve();
  solution_ids.forEach(id => {
    chain = chain.then(() => {
      return scoreSolution(id);
    });
  });

  // Added by Alex, for the purpose of Pipeline Visulization
  // onetime response
  let pathPrefix = "responses/scoreSolutionResponses/";
  if (!fs.existsSync(pathPrefix)) {
    fs.mkdirSync(pathPrefix);
  }
  pathPrefix = "responses/getScoreSolutionResultsResponses/";
  if (!fs.existsSync(pathPrefix)) {
    fs.mkdirSync(pathPrefix);
  }

  let promise = new Promise(function(fulfill, reject) {
    let _fulfill = fulfill;
    chain
      .then(() => {
        solution_ids.forEach(solution_id => {
          let solution = solutions.get(solution_id);
          if (!solution.scores) {
            console.log(
              "WARNING: solution " +
                solution_id +
                " has no scores; removing from results set"
            );
            solutions.delete(solution_id);
          }
        });
        _fulfill(sessionVar);
      })
      .catch(function(err) {
        // console.log("ERR", err);
        reject(err);
      });
  });
  return promise;
}

module.exports = scoreSolutions;
