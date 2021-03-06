("use strict");

const TA2PORT = "localhost:50054";
const APP_ROOT_PATH = require("app-root-path");
const datasetName = "185_baseball_MIN_METADATA";
const datasetPath = APP_ROOT_PATH + "/input/" + datasetName + "/";
const problemPath = datasetPath + datasetName + "_problem";
console.log("datasetName", datasetName);
// console.log(datasetPath);
// console.log(problemPath);

// This backend is used to work with vue frontend
// it reads files in the folder of "responses" and send wanted infors to frontend

const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const relay = require("./relay");
const Session = require("./Session/Session.js");
const Dataset = require("./Session/Dataset.js");
const Problem = require("./Session/Problem.js");
const Herald = require("./Session/Herald.js");

const session = new Session(true);
const dataset = new Dataset(datasetPath);
const problem = new Problem(problemPath);

let heraldId = Math.floor(Math.random() * 1000); //0-999

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
    let solutions = relay.getAllSolutions(herald);
    // let solution = console.log(Array.from(solutions.keys()));
    socket.emit("getAllSolutionsResponse", Array.from(solutions.keys()));
  });

  socket.on(
    "scoreSelectedSolutions",
    (solutionIDs_selected, metrics_selected) => {
      console.log("scoreSelectedSolutions");
      relay.getScores(solutionIDs_selected, metrics_selected, herald);
    }
  );

  socket.on("describeSolutions", solutionIDs_selected => {
    console.log("describeSolutions");
    relay.getDescriptions(solutionIDs_selected, herald);
  });

  socket.on("fitSolutions", solutionIDs_selected => {
    console.log("fitSolutions");
    relay.getFitSolutions(solutionIDs_selected, herald);
  });

  socket.on("produceSolutions", solutionIDs_selected => {
    console.log("produceSolutions");
    relay.getProduceSolutions(solutionIDs_selected, herald);
  });

  socket.on("exportSolutions", (exportID, rank) => {
    console.log("exportSolutions");
    console.log(exportID);
    console.log(rank);
    relay.exportSolutions(exportID, rank, herald);
  });
});
