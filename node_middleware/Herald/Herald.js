const helloLoop = require("./methods/helloLoop");
const endSearchSolutions = require("./methods/endSearchSolutions");
const listPrimitives = require("./methods/listPrimitives");
const searchSolutions = require("./methods/search/searchSolutions");
const fitSolutions = require("./methods/fit/fitSolutions");
const produceSolutions = require("./methods/produce/produceSolutions");
const scoreSolutions = require("./methods/score/scoreSolutions");
const describeSolutions = require("./methods/describe/describeSolutions");
const exportFittedSolutions = require("./methods/export/exportFittedSolutions");

const connect = require("./methods_other/connect");
const problemSetSerachSolutionRequest = require("./methods_other/problemSetSerachSolutionRequest");
const setEvaluationConfig = require("./methods_other/setEvaluationConfig");
const props = require("./props");

const exportSolutions = require("./methods_molecule/exportSolutions");
const getAllSolutions = require("./methods_molecule/getAllSolutions");
const getDescriptions = require("./methods_molecule/getDescriptions");
const getScores = require("./methods_molecule/getScores");
const getFitSolutions = require("./methods_molecule/getFitSolutions");
const getProduceSolutions = require("./methods_molecule/getProduceSolutions");

class Herald {
  constructor() {
    //

    // methods
    this.helloLoop = helloLoop;
    this.endSearchSolutions = endSearchSolutions;
    this.listPrimitives = listPrimitives;
    this.searchSolutions = searchSolutions;
    this.fitSolutions = fitSolutions;
    this.produceSolutions = produceSolutions;
    this.scoreSolutions = scoreSolutions;
    this.describeSolutions = describeSolutions;
    this.exportFittedSolutions = exportFittedSolutions;

    this.connect = connect;
    this.problemSetSerachSolutionRequest = problemSetSerachSolutionRequest;
    this.setEvaluationConfig = setEvaluationConfig;
    this.sessionVar = props.sessionVar;

    this.exportSolutions = exportSolutions;
    this.getAllSolutions = getAllSolutions;
    this.getDescriptions = getDescriptions;
    this.getScores = getScores;
    this.getFitSolutions = getFitSolutions;
    this.getProduceSolutions = getProduceSolutions;
  }
}

module.exports = Herald;
