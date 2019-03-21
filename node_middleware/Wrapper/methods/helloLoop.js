const fs = require("fs");
const fse = require("fs-extra");

// import variables
const props = require("../props");
const proto = props.proto;
const sessionVar = props.sessionVar;

function helloLoop() {
  // Added by Alex, for the purpose of Pipeline Visulization
  console.log("helloLoop begin");
  let pathPrefix = "responses/";
  if (fs.existsSync(pathPrefix)) {
    console.log("Remove old responses folder!");
    fse.removeSync(pathPrefix);
  }
  console.log("Create a new responses folder!!");
  fs.mkdirSync(pathPrefix);

  let promise = new Promise((fulfill, reject) => {
    let request = new proto.HelloRequest();
    let waiting = false;
    setInterval(() => {
      // let sessionVar = props.sessionVar;
      if (waiting || sessionVar.connected) return;
      waiting = true;
      let client = props.client;
      client.Hello(request, (err, response) => {
        if (err) {
          console.log("Error!Hello", err);
          sessionVar.connected = false;
          waiting = false;
          // we do not reject here, because ta2 can becaome available at some point
          // reject(err);
        } else {
          sessionVar.connected = true;
          console.log("Success!Hello", response);
          sessionVar.ta2Ident = response;
          fulfill(sessionVar);

          // Added by Alex, for the purpose of Pipeline Visulization
          let pathPrefix = "responses/";
          let pathMid = "helloResponse";
          let pathAffix = ".json";
          let path = pathPrefix + pathMid + pathAffix;
          let responseStr = JSON.stringify(response);
          fs.writeFileSync(path, responseStr);
        }
      });
    }, 10000);
  });
  return promise;
}

module.exports = helloLoop;
