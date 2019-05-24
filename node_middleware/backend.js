("use strict");

// const TA2PORT = "localhost:50054"; // UCB
const TA2PORT = "localhost:50055"; // ISI

// This backend is used to work with vue frontend
// it reads files in the folder of "responses" and send wanted infors to frontend

const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const grpcClientWrapper = require("./Wrapper/Wrapper.js");

const app = express();
const server = http.createServer(app);
const serverSocket = socketIO(server, { origins: "*:*" });

const PORT = 9090;
server.listen(PORT);
console.log("Server listening " + PORT);

serverSocket.on("connection", socket => {
  socket.on("helloSearch", () => {
    grpcClientWrapper.connect(TA2PORT);
    grpcClientWrapper.helloLoop().then(grpcClientWrapper.searchSolutions);
  });

  socket.on("getAllSolutions", () => {
    console.log("getAllSolutions");
    let solutions = grpcClientWrapper.getAllSolutions();
    // let solution = console.log(Array.from(solutions.keys()));
    socket.emit("getAllSolutionsResponse", Array.from(solutions.keys()));
  });

  socket.on(
    "scoreSelectedSolutions",
    (solutionIDs_selected, metrics_selected) => {
      console.log("scoreSelectedSolutions");
      // console.log(solutionIDs_selected, metrics_selected);

      // let metrics = ["accuracy"];
      grpcClientWrapper.getScores(solutionIDs_selected, metrics_selected);
    }
  );

  socket.on("describeSolutions", solutionIDs_selected => {
    console.log("describeSolutions");
    grpcClientWrapper.getDescriptions(solutionIDs_selected);
  });

  socket.on("fitSolutions", solutionIDs_selected => {
    console.log("fitSolutions");
    grpcClientWrapper.getFitSolutions(solutionIDs_selected);
  });

  socket.on("produceSolutions", solutionIDs_selected => {
    console.log("produceSolutions");
    grpcClientWrapper.getProduceSolutions(solutionIDs_selected);
  });

  socket.on("exportSolutions", (exportID, rank) => {
    console.log("exportSolutions");
    console.log(exportID);
    console.log(rank);
    grpcClientWrapper.exportSolutions(exportID, rank);
  });
});
