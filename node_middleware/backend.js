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
  socket.on("hello", () => {
    console.log("echo hello");
    grpcClientWrapper.connect(ta2ConnectionString);
    grpcClientWrapper.helloLoop();
  });
  socket.on("searchSolutions", () => {
    console.log("echo searchSolutions");
  });
  socket.on("getSearchSolutionsResults", () => {
    console.log("echo getSearchSolutionsResults");
  });
  socket.on("endSearchSolutions", () => {
    console.log("echo endSearchSolutions");
  });
  socket.on("stopSearchSolutions", () => {
    console.log("echo stopSearchSolutions");
  });
  socket.on("describeSolution", () => {
    console.log("echo describeSolution");
  });
  socket.on("scoreSolution", () => {
    console.log("echo scoreSolution");
  });
  socket.on("getScoreSolutionResults", () => {
    console.log("echo getScoreSolutionResults");
  });
  socket.on("fitSolution", () => {
    console.log("echo fitSolution");
  });
  socket.on("getFitSolutionResults", () => {
    console.log("echo getFitSolutionResults");
  });
  socket.on("produceSolution", () => {
    console.log("echo produceSolution");
  });
  socket.on("getProduceSolutionResults", () => {
    console.log("echo getProduceSolutionResults");
  });
  socket.on("solutionExport", () => {
    console.log("echo solutionExport");
  });
  socket.on("updateProblem", () => {
    console.log("echo updateProblem");
  });
  socket.on("listPrimitives", () => {
    console.log("echo listPrimitives");
  });
});
