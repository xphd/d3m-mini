// import Dataset from "./Dataset.js";
// import Problem from "./Problem.js";

class Session {
  constructor(devMode = false) {
    this.devMode = devMode;
    console.log("this is session constructor", this.devMode);
    // * callbacks:
    this.datasetCallbacks = [];
    // * state objects
    this.dataset = null;
    this.problem = null;
    this.herald = null;
    // are we running in development mode (without a ta2)
    this.devMode = false;
  }

  //* callbacks:
  // datasetCallbacks = [];
  //* state objects
  // dataset = null;
  // problem = null;
  // are we running in development mode (without a ta2)
  // devMode = false;

  // getters
  getDataSet() {
    return this.dataset;
  }

  getProblem() {
    return this.problem;
  }

  getHerald() {
    return this.herald;
  }

  // setters
  setDataset(dataset) {
    // try {
    this.dataset = dataset;
    // this.handleDatasetChange();
    // } catch {
    //   console.log("WARNING: setting dataset to 'null'");
    //   if (this.dataset) {
    //     this.dataset = null;
    //     this.handleDatasetChange();
    //   }
    // }
  }

  setProblem(problem) {
    this.problem = problem;
  }

  setHerald(herald) {
    this.herald = herald;
  }

  /**
  all the methods for registering and handling callbacks (observer pattern)
  **/
  registerDatasetUpdates(f) {
    this.datasetCallbacks.push(f);
    if (this.dataset) {
      process.nextTick(() => f(this.dataset));
    }
  }

  handleDatasetChange() {
    this.datasetCallbacks.forEach(f => process.nextTick(() => f(this.dataset)));
  }
}

module.exports = Session;
