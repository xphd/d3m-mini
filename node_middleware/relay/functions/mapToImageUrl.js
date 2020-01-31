function mapToImageUrl(url) {
  // if (url.includes("augment_data")) {
  //   let splitUrl = url.split("/");
  //   let i = splitUrl.indexOf("augment_data");
  //   let out_url = "/output/" + splitUrl.slice(i , splitUrl.length).join("/");
  //   return out_url;
  // }
  // if (url.startsWith("/input")) return url;
  // let splitUrl = url.split("/");
  // let i = splitUrl.indexOf("local_testing_data");
  // let out_url = "/input/" + splitUrl.slice(i + 1, splitUrl.length).join("/");
  // return out_url;
  let index = 0;
  if (url.includes("input")) {
    index = url.lastIndexOf("input");
  } else if (url.includes("output")) {
    index = url.lastIndexOf("output");
  }
  let out_url = url.substring(index);
  return out_url
}

module.exports = mapToImageUrl;
