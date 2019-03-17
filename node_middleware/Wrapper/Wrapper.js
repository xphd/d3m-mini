const grpc = require("grpc");

// import all methods
const helloLoop = require("./methods/helloLoop");
const searchSolutions = require("./methods/searchSolutions");
const fitSolutions = require("./methods/fitSolutions");
const produceSolutions = require("./methods/produceSolutions");
const scoreSolutions = require("./methods/scoreSolutions");
const exportFittedSolution = require("./methods/exportFittedSolution");
const endSearchSolutions = require("./methods/endSearchSolutions");
const describeSolutions = require("./methods/describeSolutions");

const listPrimitives = require("./methods/listPrimitives");

const problemSetSerachSolutionRequest = require("./problemSetSerachSolutionRequest");

const properties = require("./properties");

const exportSolutions = require("./methods_molecule/exportSolutions");
const getAllSolutions = require("./methods_molecule/getAllSolutions");
const getDescriptions = require("./methods_molecule/getDescriptions");
const getScores = require("./methods_molecule/getScores");
const getFitSolutions = require("./methods_molecule/getFitSolutions");
const getProduceSolutions = require("./methods_molecule/getProduceSolutions");

exports.sessionVar = properties.sessionVar;

// the chain
exports.helloLoop = helloLoop;
exports.searchSolutions = searchSolutions;
exports.fitSolutions = fitSolutions;
exports.produceSolutions = produceSolutions;
exports.scoreSolutions = scoreSolutions;
exports.exportFittedSolution = exportFittedSolution;
exports.endSearchSolutions = endSearchSolutions;
exports.describeSolutions = describeSolutions;

exports.listPrimitives = listPrimitives;

exports.problemSetSerachSolutionRequest = problemSetSerachSolutionRequest;

exports.exportSolutions = exportSolutions;
exports.getAllSolutions = getAllSolutions;
exports.getDescriptions = getDescriptions;
exports.getScores = getScores;
exports.getFitSolutions = getFitSolutions;
exports.getProduceSolutions = getProduceSolutions;
exports.connect = function(ta2_url) {
  console.log("Connect to:" + ta2_url);
  let proto = properties.proto;
  let client = new proto.Core(ta2_url, grpc.credentials.createInsecure());
  properties.client = client;
};

exports.setEvaluationConfig = function(evaluationConfig) {
  properties.evaluationConfig = evaluationConfig;
};
