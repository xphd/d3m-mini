// This backend is used to work with vue frontend
// it reads files in the folder of "responses" and send wanted infors to frontend

"use strict";
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const grpcClientWrapper = require("./Wrapper/Wrapper.js");

const app = express();
const server = http.createServer(app);
const serverSocket = socketIO(server, { origins: "*:*" });

const TA2PORT = "localhost:50051";
const PORT = 9090;
server.listen(PORT);
console.log("Server listening " + PORT);

serverSocket.on("connection", socket => {
  var promise = null;
  var promise2 = null;
  socket.on("hello", () => {
    console.log("hello");
    grpcClientWrapper.connect(TA2PORT);
    promise = grpcClientWrapper.helloLoop();
  });
  socket.on("searchSolutions", () => {
    console.log("searchSolutions");
    promise2 = promise.then(grpcClientWrapper.searchSolutions);
  });

  socket.on("listPrimitives", () => {
    console.log("listPrimitives");
    promise2 = promise.then(grpcClientWrapper.listPrimitives);
  });
  socket.on("getAllSolutions", () => {
    console.log("getAllSolutions");
    let solutions = grpcClientWrapper.getAllSolutions();
    console.log(Array.from(solutions.keys()));
    socket.emit("getAllSolutionsResponse", Array.from(solutions.keys()));
  });
  socket.on("scoreSelectedSolutions", solutionIDs_selected => {
    console.log("scoreSelectedSolutions");
    let metrics = ["accuracy"];
    grpcClientWrapper.getScores(solutionIDs_selected, metrics);
  });
});
