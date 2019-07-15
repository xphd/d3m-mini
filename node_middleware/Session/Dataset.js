const fs = require("fs");

class Dataset {
  // FIXME: constructor should take a path instead of the old schema
  constructor(datasetRootPath, datasetName = null) {
    let tempStr = datasetRootPath.endsWith("/")
      ? datasetRootPath.substring(0, datasetRootPath.length - 1)
      : datasetRootPath;
    this.datasetRootPath = tempStr;
    console.log("Create dataset from:", this.datasetRootPath);
    this.datasetName = datasetName;
    if (!this.datasetName) {
      // "/home/cong/d3mapp/node_middleware/static/local_testing_data/185_baseball",
      let tempStrArr = tempStr.split("/");
      let len = tempStrArr.length;
      this.datasetName = tempStrArr[len - 1];
    }
    this.datasetSchema = require(this.getDatasetPath() + "/datasetDoc.json");

    this.learningDataFile = this.getDatasetPath() + "/tables/learningData.csv";

    // all problems are only generated once
    this.isAllProblemsGenerated = false;
    this.allGeneratedProblemPaths = [];
    //
  }

  getDatasetName() {
    return this.datasetName;
  }
  getDatasetPath() {
    return this.datasetRootPath + "/" + this.datasetName + "_dataset";
  }
  getRootPath() {
    return this.datasetRootPath;
  }
  getProblemPath() {
    return this.datasetRootPath + "/" + this.datasetName + "_problem";
  }
  getDatasetSchema() {
    return this.datasetSchema;
  }

  getLearningDataFile() {
    return this.learningDataFile;
  }

  setAllGeneratedProblemPaths(allGeneratedProblemPaths) {
    if (this.isAllProblemsGenerated) {
      // notify
    } else {
      this.allGeneratedProblemPaths = allGeneratedProblemPaths;
    }
  }
}

module.exports = Dataset;
//
// from seed OR datamart?
//

// now get schema from datasetPath
// let files = fs
//   .readdirSync(datasetPath)
//   .filter(filename => filename.toLowerCase().endsWith("_dataset"));
// if (files.length != 1) {
//   console.log(
//     "None or more than one folder that ends in '_dataset'; can't find schema!"
//   );
//   // this.schema = null;
// } else {
//   let datasetPath = datasetPath;
//   if (!datasetPath.endsWith("/")) {
//     datasetPath = datasetPath + "/";
//   }
//   datasetPath = datasetPath + files[0];
//   this.datasetSchema = require(datasetPath + "/datasetDoc.json");
//   this.learningDataFile = datasetPath + "/tables/learningData.csv";
// }
