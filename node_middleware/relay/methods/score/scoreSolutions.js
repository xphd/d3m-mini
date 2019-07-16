const fs = require("fs");

const scoreSolution = require("./scoreSolution.js");

function scoreSolutions(herald) {
  // console.log("scoreSolutions called");
  let solutions = herald.getSolutions();
  let solutions_array = Array.from(solutions.values());
  console.log("number of solutions found:", solutions_array.length);
  let chain = Promise.resolve();
  solutions_array.forEach(solution => {
    chain = chain.then(() => {
      return scoreSolution(herald, solution);
    });
  });

  if (herald.isResponse) {
    // onetime response
    let pathPrefix = herald.RESPONSES_PATH + "scoreSolutionResponses/";
    if (!fs.existsSync(pathPrefix)) {
      fs.mkdirSync(pathPrefix);
    }
    pathPrefix = herald.RESPONSES_PATH + "getScoreSolutionResultsResponses/";
    if (!fs.existsSync(pathPrefix)) {
      fs.mkdirSync(pathPrefix);
    }
  }

  if (herald.isRequest) {
    // onetime response
    let pathPrefix = herald.REQUESTS_PATH + "scoreSolutionRequests/";
    if (!fs.existsSync(pathPrefix)) {
      fs.mkdirSync(pathPrefix);
    }
    pathPrefix = herald.REQUESTS_PATH + "getScoreSolutionResultsRequests/";
    if (!fs.existsSync(pathPrefix)) {
      fs.mkdirSync(pathPrefix);
    }
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
            herald.getSolutions().delete(solution_id);
          }
        });
        _fulfill(herald);
      })
      .catch(err => {
        // console.log("ERR", err);
        reject(err);
      });
  });
  return promise;
}

module.exports = scoreSolutions;
