// Relay.js is a singleton wrapper for functions dealing with ta3-ta2 api call
// each one of these function will have a input "herald" who contains "dataset", "problem" and anything else necessary for api call

// const APP_ROOT_PATH = require("app-root-path");

// const proto = require("../protos/proto.js");
// const grpcVersion = require("../protos/grpcVersion.js");

exports.handleUrl = require("./functions/handleUrl.js");

exports.connect = require("./functions/connect.js");

exports.helloLoop = require("./methods/helloLoop.js");

exports.searchSolutions = require("./methods/search/searchSolutions.js");
// const endSearchSolutions = require("./methods/endSearchSolutions");
// const listPrimitives = require("./methods/listPrimitives");
// const searchSolutions = require("./methods/search/searchSolutions");
// const fitSolutions = require("./methods/fit/fitSolutions");
// const produceSolutions = require("./methods/produce/produceSolutions");
// const scoreSolutions = require("./methods/score/scoreSolutions");
// const describeSolutions = require("./methods/describe/describeSolutions");
// const exportFittedSolutions = require("./methods/export/exportFittedSolutions");

// const problemSetSerachSolutionRequest = require("./methods_other/problemSetSerachSolutionRequest");
// const setEvaluationConfig = require("./methods_other/setEvaluationConfig");
// const props = require("./props");

// const exportSolutions = require("./methods_molecule/exportSolutions");
// const getAllSolutions = require("./methods_molecule/getAllSolutions");
// const getDescriptions = require("./methods_molecule/getDescriptions");
// const getScores = require("./methods_molecule/getScores");
// const getFitSolutions = require("./methods_molecule/getFitSolutions");
// const getProduceSolutions = require("./methods_molecule/getProduceSolutions");

// class Herald {
//   constructor() {
//     this.session = null;
//     // properties
//     this.props = {
//       //   dynamic
//       client: null,

//       sessionVar: {
//         search_id: "",
//         ta2Ident: null,
//         connected: false,
//         solutions: new Map(),
//         //produceSolutionRequests: [],
//         //solutionResults: [],
//         // NIST eval plan: only ranks 1-20 are considered (lower is better)
//         rankVar: 20
//       },
//       // evaluationConfig: null,

//       // static
//       proto: proto,
//       userAgentTA3: "TA3-TGW",
//       grpcVersion: grpcVersion,
//       allowed_val_types: [],
//       // CONFIG_PATH: CONFIG_PATH,

//       // create folder to store response from ta2
//       isResponse: true, // true if responses folder is wanted
//       RESPONSES_PATH: APP_ROOT_PATH + "/output/responses/",

//       // create folder to store request to ta2
//       isRequest: true, // true if requests folder is wanted
//       REQUESTS_PATH: APP_ROOT_PATH + "/output/requests/"
//     };

//     this.connect = connect;
// methods for ta2
// this.helloLoop = helloLoop;
// this.endSearchSolutions = endSearchSolutions;
// this.listPrimitives = listPrimitives;
// this.searchSolutions = searchSolutions;
// this.fitSolutions = fitSolutions;
// this.produceSolutions = produceSolutions;
// this.scoreSolutions = scoreSolutions;
// this.describeSolutions = describeSolutions;
// this.exportFittedSolutions = exportFittedSolutions;

// this.problemSetSerachSolutionRequest = problemSetSerachSolutionRequest;
// this.setEvaluationConfig = setEvaluationConfig;
// this.sessionVar = props.sessionVar;

// this.exportSolutions = exportSolutions;
// this.getAllSolutions = getAllSolutions;
// this.getDescriptions = getDescriptions;
// this.getScores = getScores;
// this.getFitSolutions = getFitSolutions;
// this.getProduceSolutions = getProduceSolutions;
//   }

//   // methods for Herald
//   setSession(session) {
//     this.session = session;
//   }

//   getSession() {
//     return this.session;
//   }

//   // getProps() {
//   //   return this.props;
//   // }
// }

// module.exports = Herald;
