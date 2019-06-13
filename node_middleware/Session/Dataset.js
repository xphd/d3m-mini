const fs = require("fs");

export default class Dataset {
  // FIXME: constructor should take a path instead of the old schema
  constructor(path) {
    // now get schema from path
    let files = fs
      .readdirSync(path)
      .filter(filename => filename.toLowerCase().endsWith("_dataset"));
    if (files.length != 1) {
      console.log(
        "None or more than one folder that ends in '_dataset'; can't find schema!"
      );
      this.schema = null;
    } else {
      let datasetPath = path;
      if (!datasetPath.endsWith("/")) {
        datasetPath = datasetPath + "/";
      }
      datasetPath = datasetPath + files[0];
      this.schema = require(datasetPath + "/datasetDoc.json");
      this.learningDataFile = datasetPath + "/tables/learningData.csv";
    }
  }

  getSchema() {
    return this.schema;
  }

  getLearningDataFile() {
    return this.learningDataFile;
  }
}
