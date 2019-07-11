("use strict");

const TA2PORT = "localhost:50054";

const appRootPath = require("app-root-path");
const datasetName = "185_baseball";
const datasetPath =
  appRootPath +
  "/static/local_testing_data/" +
  datasetName +
  "/" +
  datasetName +
  "_dataset";

const problemPath =
  appRootPath + "/static/local_testing_data/185_baseball/185_baseball_problem";

// This backend is used to work with vue frontend
// it reads files in the folder of "responses" and send wanted infors to frontend

const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

// const grpcClientWrapper = require("./Wrapper/Wrapper.js");
const relay = require("./relay");

const Session = require("./Session/Session.js");
const Dataset = require("./Session/Dataset.js");
const Problem = require("./Session/Problem.js");
const Herald = require("./Session/Herald.js");

const session = new Session(true);
const dataset = new Dataset(datasetPath);
const problem = new Problem(problemPath);
let heraldId = 101;
const herald = new Herald(heraldId);
herald.setDataset(dataset);
herald.setProblem(problem);
herald.setPort(TA2PORT);

session.setCurrentDataset(dataset);
session.setCurrentProblem(problem);
session.setCurrentHerald(herald);

const app = express();
const server = http.createServer(app);
const serverSocket = socketIO(server, { origins: "*:*" });

const PORT = 9090;
server.listen(PORT);
console.log("Server listening " + PORT);

serverSocket.on("connection", socket => {
  socket.on("helloSearch", () => {
    relay.connect(herald);
    relay.helloLoop(herald).then(relay.searchSolutions);
  });

  socket.on("getAllSolutions", () => {
    console.log("getAllSolutions");
    let solutions = herald.getAllSolutions();
    // let solution = console.log(Array.from(solutions.keys()));
    socket.emit("getAllSolutionsResponse", Array.from(solutions.keys()));
  });

  socket.on(
    "scoreSelectedSolutions",
    (solutionIDs_selected, metrics_selected) => {
      console.log("scoreSelectedSolutions");
      // console.log(solutionIDs_selected, metrics_selected);

      // let metrics = ["accuracy"];
      herald.getScores(solutionIDs_selected, metrics_selected);
    }
  );

  socket.on("describeSolutions", solutionIDs_selected => {
    console.log("describeSolutions");
    herald.getDescriptions(solutionIDs_selected);
  });

  socket.on("fitSolutions", solutionIDs_selected => {
    console.log("fitSolutions");
    herald.getFitSolutions(solutionIDs_selected);
  });

  socket.on("produceSolutions", solutionIDs_selected => {
    console.log("produceSolutions");
    herald.getProduceSolutions(solutionIDs_selected);
  });

  socket.on("exportSolutions", (exportID, rank) => {
    console.log("exportSolutions");
    console.log(exportID);
    console.log(rank);
    herald.exportSolutions(exportID, rank);
  });
});
