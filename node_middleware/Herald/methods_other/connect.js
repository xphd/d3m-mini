const grpc = require("grpc");

function connect(ta2_url) {
  console.log("Connect to:" + ta2_url);
  const props = this.props;
  const proto = props.proto;

  let client = new proto.Core(ta2_url, grpc.credentials.createInsecure());
  props.client = client;
}

module.exports = connect;
