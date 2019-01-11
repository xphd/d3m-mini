// This backend is used to work with vue frontend
// it reads files in the folder of "responses" and send wanted infors to frontend

"use strict";
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const fs = require("fs");
const app = express();

const server = http.createServer(app);
const serverSocket = socketIO(server, { origins: "*:*" });

console.log("Server listening 9090");
server.listen(9090);

let ta2ConnectionString = "localhost:50051";

const grpcClientWrapper = require("./Wrapper/Wrapper.js");

// const folder = "./responses/describeSolutionResponses/";
// const descriptionPathList = [];
// fs.readdirSync(folder).forEach(file => {
//   descriptionPathList.push(file);
//   //   console.log(file);
// });

// const descriptionPath = descriptionPathList[0];

// const descriptionStr = fs.readFileSync(folder + descriptionPath, "utf8");

// const descriptionJSON = JSON.parse(descriptionStr);

// const steps = descriptionJSON["pipeline"]["steps"];
// console.log(steps.length);

serverSocket.on("connection", socket => {
  var promise = null;
  var promise2 = null;
  socket.on("hello", () => {
    console.log("hello");
    grpcClientWrapper.connect(ta2ConnectionString);
    promise = grpcClientWrapper.helloLoop();
  });
  socket.on("searchSolutions", () => {
    console.log("searchSolutions");
    promise2 = promise.then(grpcClientWrapper.searchSolutions);
  });
  socket.on("getSearchSolutionsResults", () => {
    console.log("getSearchSolutionsResults");
  });
  socket.on("endSearchSolutions", () => {
    console.log("endSearchSolutions");
  });
  socket.on("stopSearchSolutions", () => {
    console.log("stopSearchSolutions");
  });
  socket.on("describeSolution", () => {
    console.log("describeSolution");
  });
  socket.on("scoreSolution", () => {
    console.log("scoreSolution");
    promise2.then(grpcClientWrapper.scoreSolutions);
  });
  socket.on("getScoreSolutionResults", () => {
    console.log("getScoreSolutionResults");
  });
  socket.on("fitSolution", () => {
    console.log("fitSolution");
  });
  socket.on("getFitSolutionResults", () => {
    console.log("getFitSolutionResults");
  });
  socket.on("produceSolution", () => {
    console.log("produceSolution");
  });
  socket.on("getProduceSolutionResults", () => {
    console.log("getProduceSolutionResults");
  });
  socket.on("solutionExport", () => {
    console.log("solutionExport");
  });
  socket.on("updateProblem", () => {
    console.log("updateProblem");
  });
  socket.on("listPrimitives", () => {
    console.log("listPrimitives");
    promise2 = promise.then(grpcClientWrapper.listPrimitives);
  });
  socket.on("getAllSolutions", () => {
    console.log("getAllSolutions");
    let solutions = grpcClientWrapper.getAllSolutions();
    // let solutions = new Map();
    // solutions.set("1",{"id":"1"});
    // solutions.set("2",{"id":"1"})

    // console.log(solutions)
    console.log(Array.from(solutions.keys()));
    socket.emit("getAllSolutionsResponse", Array.from(solutions.keys()));
  });
  socket.on("scoreSelectedSolutions", solutionIDs_selected => {
    console.log("scoreSelectedSolutions")
    let metrics = ["accuracy"];
    grpcClientWrapper.getScores(solutionIDs_selected, metrics);
  });
});
