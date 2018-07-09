const keys = require("./keys");
const request = require("../request");
module.exports = (requestUrl) =>
    request(requestUrl + (requestUrl.indexOf("?") === -1 ? "?" : "&") + `app_id=${keys.appID}&app_key=${keys.appKey}`);