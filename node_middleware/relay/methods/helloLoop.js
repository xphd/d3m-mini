const proto = require("../proto.js");

const fs = require("fs");
// const fse = require("fs-extra");

function helloLoop(herald) {
  console.log("helloLoop begin");
  // if (props.isRequest) {
  //   let pathPrefix = props.REQUESTS_PATH;
  //   if (fs.existsSync(pathPrefix)) {
  //     console.log("Remove old request folder!");
  //     fse.removeSync(pathPrefix);
  //   }
  //   console.log("Create new request folder!!");
  //   fs.mkdirSync(pathPrefix);
  // }

  // if (props.isResponse) {
  //   let pathPrefix = props.RESPONSES_PATH;
  //   if (fs.existsSync(pathPrefix)) {
  //     console.log("Remove old responses folder!");
  //     fse.removeSync(pathPrefix);
  //   }
  //   console.log("Create new responses folder!!");
  //   fs.mkdirSync(pathPrefix);
  // }
  let request = new proto.HelloRequest();
  let waiting = false;
  let promise = new Promise((fulfill, reject) => {
    setInterval(() => {
      if (waiting || herald.isConnected) {
        return;
      }
      waiting = true;
      let client = herald.getClient();
      client.Hello(request, (err, response) => {
        if (err) {
          console.log("Error!Hello", err);
          herald.isConnected = false;
          waiting = false;
          // we do not reject here, because ta2 can becaome available at some point
          // reject(err);
        } else {
          console.log("Success!Hello");
          herald.isConnected = true;
          herald.ta2Ident = response;
          // props.allowed_val_types = response.allowed_value_types;
          console.log("response");
          fulfill(herald);

          // Added by Alex, for the purpose of Pipeline Visulization
          // if (props.isResponse) {
          //   let pathPrefix = props.RESPONSES_PATH;
          //   let pathMid = "helloResponse";
          //   let pathAffix = ".json";
          //   let path = pathPrefix + pathMid + pathAffix;
          //   let responseStr = JSON.stringify(response);
          //   fs.writeFileSync(path, responseStr);
          // }
        }
      });
    }, 10000);
  });
  // let promise = new Promise(fun);
  return promise;
}

module.exports = helloLoop;
