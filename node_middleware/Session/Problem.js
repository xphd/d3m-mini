class Problem {
  constructor(source) {
    if (typeof source === "string") {
      let problemPath = source;
      this.problemPath = problemPath;
      if (this.problemPath.endsWith("/problemDoc.json")) {
        this.problemPath = this.problemPath.substring(
          0,
          this.problemPath.length - 16
        );
      }
      console.log("Create problem from:", this.problemPath);
      this.problemSchema = require(this.problemPath + "/problemDoc.json");
    } else if (typeof source === "object") {
      console.log("loading problem from memory");
      this.problemPath = null;
      this.problemSchema = source;
    }
  }
  getProblemPath() {
    return this.problemPath;
  }
  getProblemSchema() {
    return this.problemSchema;
  }
}
module.exports = Problem;
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
