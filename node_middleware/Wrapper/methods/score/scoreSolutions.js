const fs = require("fs");

const props = require("../../props");
const scoreSolution = require("./scoreSolution.js");

function scoreSolutions(sessionVar) {
  // console.log("scoreSolutions called");
  let solutions = Array.from(props.sessionVar.solutions.values());
  let chain = Promise.resolve();
  solutions.forEach(solution => {
    chain = chain.then(() => {
      return scoreSolution(solution);
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

  let promise = new Promise((fulfill, reject) => {
    let _fulfill = fulfill;
    chain
      .then(() => {
        solutions.forEach(solution => {
          let solution_id = solution.solution_id;
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
