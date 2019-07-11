const fs = require("fs");

const fitSolution = require("./fitSolution.js");

function fitSolutions(herald) {
  console.log("fitSolutions called");
  let solutions = herald.getSolutions();
  let solutions_array = Array.from(solutions.values());

  let chain = Promise.resolve();
  solutions_array.forEach(solution => {
    chain = chain.then(() => {
      return fitSolution(herald, solution);
    });
  });

  // Added by Alex, for the purpose of Pipeline Visulization
  // if (props.isResponse) {
  //   let pathPrefix = props.RESPONSES_PATH + "fitSolutionResponses/";
  //   if (!fs.existsSync(pathPrefix)) {
  //     fs.mkdirSync(pathPrefix);
  //   }
  //   pathPrefix = props.RESPONSES_PATH + "getFitSolutionResultsResponses/";
  //   if (!fs.existsSync(pathPrefix)) {
  //     fs.mkdirSync(pathPrefix);
  //   }
  // }

  // if (props.isRequest) {
  //   // onetime response
  //   let pathPrefix = props.REQUESTS_PATH + "fitSolutionRequests/";
  //   if (!fs.existsSync(pathPrefix)) {
  //     fs.mkdirSync(pathPrefix);
  //   }
  //   pathPrefix = props.REQUESTS_PATH + "getFitSolutionResultsRequests/";
  //   if (!fs.existsSync(pathPrefix)) {
  //     fs.mkdirSync(pathPrefix);
  //   }
  // }
  function fun(fulfill, reject) {
    chain
      .then(() => {
        // console.log("RES", res);
        fulfill(herald);
      })
      .catch(err => {
        // console.log("ERR", err);
        reject(err);
      });
  }

  let promise = new Promise(fun);
  return promise;
}

module.exports = fitSolutions;
