class Herald {
  constructor(id) {
    // to be private, getters and setters
    console.log("New herald created", id);
    this.id = id; // new
    this.dataset = null;
    this.problem = null;
    this.client = null;
    this.port = null; // port for ta2
    this.solutions = null;

    // not to be private
    this.isConnected = false;
    this.ta2Ident = null; // string
    this.search_id = null; // {}
    this.rankVar = 20;

    // legacy (legacy), for frontend
    // this.user_problem_root = "./static/output/problems"; // string, path, "./static/output/problems"
    // this.running_mode = "development"; // string, "development"
    // this.model_comparison_type = "regression"; // string, "regression"
    // this.model_output_prediction_files = [
    //   "static/local_testing_data/196_autoMpg/196_autoMpg_solution/model_A.csv",
    //   "static/local_testing_data/196_autoMpg/196_autoMpg_solution/model_B.csv",
    //   "static/local_testing_data/196_autoMpg/196_autoMpg_solution/model_C.csv"
    // ]; // []
  }

  getId() {
    return this.id;
  }

  // getters
  getDataset() {
    return this.dataset;
  }

  getProblem() {
    return this.problem;
  }

  getClient() {
    return this.client;
  }

  getPort() {
    return this.port;
  }

  getSolutions() {
    return this.solutions;
  }

  // setters
  // setId(id) {
  //   this.id = id;
  // }
  setDataset(dataset) {
    this.dataset = dataset;
  }

  setProblem(problem) {
    this.problem = problem;
  }

  setClient(client) {
    this.client = client;
  }

  setPort(port) {
    this.port = port;
  }

  setSolutions(solutions) {
    this.solutions = solutions;
  }
}

module.exports = Herald;

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
//      isResponse: true, // true if responses folder is wanted
//       RESPONSES_PATH: APP_ROOT_PATH + "/output/responses/",

//       // create folder to store request to ta2
//      isRequest: true, // true if requests folder is wanted
//       REQUESTS_PATH: APP_ROOT_PATH + "/output/requests/"
//     };
