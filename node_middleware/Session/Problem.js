class Problem {
  constructor(problemPath) {
    this.problemPath = problemPath;
    this.problemSchema = require(problemPath + "/problemDoc.json");
    // now get schema from path
    // let files = fs
    //   .readdirSync(problemPath)
    //   .filter(filename => filename.toLowerCase().endsWith("_problem"));
    // if (files.length != 1) {
    //   console.log(
    //     "None or more than one folder that ends in '_dataset'; can't find schema!"
    //   );
    //   this.problemSchema = null;
    // } else {
    //   let problemPath = path;
    //   if (!problemPath.endsWith("/")) {
    //     problemPath = problemPath + "/";
    //   }
    //   problemPath = problemPath + files[0];
    //   this.problemSchema = require(problemPath + "/problemDoc.json");

    // }
  }

  getProblemPath() {
    return this.problemPath;
  }

  getProblemSchema() {
    return this.problemSchema;
  }
}

module.exports = Problem;
