// Legacy, no longer used, to be removed, left here for reference

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

exports.helloLoop = helloLoop;
exports.endSearchSolutions = endSearchSolutions;
exports.listPrimitives = listPrimitives;
exports.searchSolutions = searchSolutions;
exports.fitSolutions = fitSolutions;
exports.produceSolutions = produceSolutions;
exports.scoreSolutions = scoreSolutions;
exports.describeSolutions = describeSolutions;
exports.exportFittedSolutions = exportFittedSolutions;

// methods_other
const connect = require("./methods_other/connect");
const problemSetSerachSolutionRequest = require("./methods_other/problemSetSerachSolutionRequest");
const setEvaluationConfig = require("./methods_other/setEvaluationConfig");
const props = require("./props");

exports.connect = connect;
exports.problemSetSerachSolutionRequest = problemSetSerachSolutionRequest;
exports.setEvaluationConfig = setEvaluationConfig;
exports.sessionVar = props.sessionVar;

// future development
const exportSolutions = require("./methods_molecule/exportSolutions");
const getAllSolutions = require("./methods_molecule/getAllSolutions");
const getDescriptions = require("./methods_molecule/getDescriptions");
const getScores = require("./methods_molecule/getScores");
const getFitSolutions = require("./methods_molecule/getFitSolutions");
const getProduceSolutions = require("./methods_molecule/getProduceSolutions");

exports.exportSolutions = exportSolutions;
exports.getAllSolutions = getAllSolutions;
exports.getDescriptions = getDescriptions;
exports.getScores = getScores;
exports.getFitSolutions = getFitSolutions;
exports.getProduceSolutions = getProduceSolutions;
