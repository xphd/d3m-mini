const props = require("../../props");
const describeSolution = require("./describeSolution.js");

function describeSolutions(sessionVar) {
  console.log("describeSolutions called");
  let solutions = props.sessionVar.solutions;
  let solution_ids = Array.from(solutions.keys());

  let chain = Promise.resolve();
  solution_ids.forEach(id => {
    chain = chain.then(() => {
      return describeSolution(id);
    });
  });

  return new Promise(function(fulfill, reject) {
    let _fulfill = fulfill;
    let _reject = reject;
    chain
      .then(() => {
        _fulfill(sessionVar);
      })
      .catch(err => {
        _reject(err);
      });
  });
}

module.exports = describeSolutions;
