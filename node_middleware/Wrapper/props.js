const grpc = require("grpc");
const APP_ROOT_PATH = require("app-root-path");

const VERSION = "2019.4.11"; // ta3-ta2-api version
const CONFIG_FILENAME = "tufts_gt_wisc_configuration.json";
const PROTO_PATH = APP_ROOT_PATH + "/lib/js/protos/v" + VERSION + "/core.proto";
const CONFIG_PATH = APP_ROOT_PATH + "/" + CONFIG_FILENAME;

const props = {
  //   dynamic
  client: null,

  sessionVar: {
    search_id: "",
    ta2Ident: null,
    connected: false,
    solutions: new Map(),
    //produceSolutionRequests: [],
    //solutionResults: [],
    // NIST eval plan: only ranks 1-20 are considered (lower is better)
    rankVar: 20
  },
  evaluationConfig: null,

  // static
  proto: grpc.load(PROTO_PATH),
  userAgentTA3: "TA3-TGW",
  grpcVersion: VERSION,
  allowed_val_types: [1, 2, 3],
  CONFIG_PATH: CONFIG_PATH
};
module.exports = props;
