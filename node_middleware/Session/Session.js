import Dataset from "./Dataset.js";
import Problem from "./Problem.js";

export default class Session {
  constructor(devMode = false) {
    this.devMode = devMode;
    console.log("this is session constructor", this.devMode);
  }

  //* callbacks:
  datasetCallbacks = [];
  //* state objects
  dataset = null;
  modeling_config = null;
  // are we running in development mode (without a ta2)
  devMode = false;

  setProblem(problem_schema) {
    this.modeling_config = new Problem(problem_schema);
  }

  setDataset(path) {
    try {
      this.dataset = new Dataset(path);
      this.handleDatasetChange();
    } catch {
      console.log("WARNING: setting dataset to 'null'");
      if (this.dataset) {
        this.dataset = null;
        this.handleDatasetChange();
      }
    }
  }

  getDataSet() {
    return this.dataset;
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
