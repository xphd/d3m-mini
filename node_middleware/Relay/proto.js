const grpc = require("grpc");

const grpcVersion = require("./config.js").grpcVersion;
// const VERSION = "2019.4.11"; // ta3-ta2-api version

const APP_ROOT_PATH = require("app-root-path");
// const PROTO_PATH =
//   APP_ROOT_PATH + "/lib/js/protos/v" + grpcVersion + "/core.proto";

const PROTO_PATH = APP_ROOT_PATH + "/protos/" + grpcVersion + "/core.proto";
const proto = grpc.load(PROTO_PATH);
module.exports = proto;
