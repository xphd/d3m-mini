const fs = require("fs");

export default class WrapperWrapper {

  grpcClientWrapper = require("../Wrapper/Wrapper.js");

  constructor(ta2host = "localhost", ta2port = 50051) {
    // check for now and warn users, refactor at some point
    if ("TA2_PORT" in process.env) {
      if (ta2port !== number(process.env["TA2_PORT"])) {
        console.log("WARNING: MISMATCHING TA2 PORTS: ", ta2port, process.env["TA2_PORT"]);
      }
    }
    this.ta2ConnectionString = ta2host + ":" + ta2port;
    console.log("new wrapper wrapper with ", this.ta2ta2ConnectionString);
  }

  init() {
    console.log("connecting to ta2");
    let ta2ConnectionString = "localhost:50051";
    console.log("ta2 connection string: ", this.ta2ConnectionString);
    this.grpcClientWrapper.connect(this.ta2ConnectionString);
    // for the old wrapper
    // grpcClientWrapper.runStartSession();
    // testing code for API
    function testApi(context) {
      return this.grpcClientWrapper
        .searchSolutions(context)
        .then(this.grpcClientWrapper.scoreSolutions)
        .then(this.grpcClientWrapper.describeSolutions)
        .then(this.grpcClientWrapper.fitSolutions)
        .then(this.grpcClientWrapper.produceSolutions)
        .then(this.grpcClientWrapper.endSearchSolutions)
        .catch(err => console.log("ERROR!", err));
    }

    function exit() {
      console.log("exiting...");
      process.exit();
    }

    if ("INTEGRATION_TEST" in process.env) {
      console.log("BACKEND STARTED IN INTEGRATION TEST MODE");
      grpcClientWrapper
        .helloLoop()
        .then(testApi)
        .then(function(context) {
          return new Promise(function(fulfill, reject) {
            console.log("FINAL RESULT", context);
            fulfill();
          });
        })
        // test api, then exit container
        .then(exit);
    } else {
      this.grpcClientWrapper.helloLoop();
    }
  }

  sendPredictions(file, response) {
    console.log("sending prediction ", file, response);
    // For now, we assume fileuri is a CSV
    // TODO handle different file types
    // TODO correct interpretation of fileuri
    file = file.replace(/^(file:\/\/)/, "");
    var stream = fs.createReadStream(handleUrl(file));
    papa.parse(stream, {
      header: true,
      error: function(err) {
        console.log("sendPredictions parsing error for file", file);
        console.log("error is", file);
      },
      complete: function(results) {
        response.results = results.data;
        response.fileUri = file;
        socket.emit("modelFinished", response);
      }
    });
  }

  createPipelines() {
    console.log("received socket request for create pipelines");
    // If running mode is development, we just return, one at a time, the specified
    // model output files.  Otherwise, we call out to TA2s.
    console.log(
      "node_backend_appp",
      evaluationConfig.running_mode,
      evaluationConfig.model_output_prediction_files
    );
    // do all the pipeline logic
    // TODO: clean up, improve, move to separate file, ...

    let localPrefix = appRoot;

    this.grpcClientWrapper
      .searchSolutions(this.grpcClientWrapper.sessionVar)
      .then(this.grpcClientWrapper.scoreSolutions)
      .then(this.grpcClientWrapper.describeSolutions)
      .then(this.grpcClientWrapper.fitSolutions)
      .then(this.grpcClientWrapper.produceSolutions)
      // .then(grpcClientWrapper.endSearchSolutions)
      // .then(console.log)
      .then(this.grpcClientWrapper.exportFittedSolutions)
      .then(function(sessionVar) {
        sessionVar.solutions.forEach(function(solution) {
          if (solution.fit) {
            console.log("OUTPUTCSV", solution.fit.outputCsv);
            let pipeline = {};
            pipeline.id = solution.solution_id;
            pipeline.scores = solution.scores;
            pipeline.results = [];
            let firstElement = "/" + solution.fit.outputCsv.split("/")[1];
            let outputPath = fs.existsSync(firstElement)
              ? solution.fit.outputCsv
              : localPrefix + solution.fit.outputCsv;
            pipeline.fileUri = outputPath;
            // socket.emit("modelFinished", pipeline);
            sendPredictions(outputPath, pipeline);
          }
        });
        socket.emit("backendFinished");
      })
      .catch(err => {
        console.log("PIPELINE FAILED!", err);
        socket.emit("pipelineFailed");
      });
  }

}
