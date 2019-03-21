// import all methods
const helloLoop = require("./methods/helloLoop");
const endSearchSolutions = require("./methods/endSearchSolutions");
const listPrimitives = require("./methods/listPrimitives");

const searchSolutions = require("./methods/search/searchSolutions");
const fitSolutions = require("./methods/fit/fitSolutions");
const produceSolutions = require("./methods/produce/produceSolutions");
const scoreSolutions = require("./methods/score/scoreSolutions");
const describeSolutions = require("./methods/describe/describeSolutions");
const exportFittedSolutions = require("./methods/export/exportFittedSolutions");

const problemSetSerachSolutionRequest = require("./problemSetSerachSolutionRequest");
const connect = require("./connect");

const props = require("./props");

// const exportSolutions = require("./methods_molecule/exportSolutions");
// const getAllSolutions = require("./methods_molecule/getAllSolutions");
// const getDescriptions = require("./methods_molecule/getDescriptions");
// const getScores = require("./methods_molecule/getScores");
// const getFitSolutions = require("./methods_molecule/getFitSolutions");
// const getProduceSolutions = require("./methods_molecule/getProduceSolutions");

exports.sessionVar = props.sessionVar;

// the chain
exports.helloLoop = helloLoop;
exports.searchSolutions = searchSolutions;
exports.fitSolutions = fitSolutions;
exports.produceSolutions = produceSolutions;
exports.scoreSolutions = scoreSolutions;
exports.exportFittedSolutions = exportFittedSolutions;
exports.endSearchSolutions = endSearchSolutions;
exports.describeSolutions = describeSolutions;

exports.listPrimitives = listPrimitives;

// exports.exportSolutions = exportSolutions;
// exports.getAllSolutions = getAllSolutions;
// exports.getDescriptions = getDescriptions;
// exports.getScores = getScores;
// exports.getFitSolutions = getFitSolutions;
// exports.getProduceSolutions = getProduceSolutions;

exports.problemSetSerachSolutionRequest = problemSetSerachSolutionRequest;
exports.connect = connect;

exports.setEvaluationConfig = function(evaluationConfig) {
  props.evaluationConfig = evaluationConfig;
};
