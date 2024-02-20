"use strict";
import config from "config";
import { init } from "./api/webmixer";
import Mapper from "./mapping/SD-mapping";
import { Fetcher } from "./api/planningCenter";

console.log(config);
// const config = require("config"),
//   webmixer = require("./api/webmixer");

if (config.has("ignore_channels")) {
  console.log(
    'default.json needs to be updated. "ignore_channels" has been changed to be channels. Instead of a list of "channels" to ignore please add the channels that you would like to include.'
  );
  process.exit();
}

if (!config.has("channels")) {
  console.log(
    'default.json file does not contain channels key. Please add it to continue. If you don\'t know the channels to use please add a blank array ("channels": []).'
  );
  process.exit();
}

if (!config.has("desk.receive_port")) {
  console.log("default.json must include the desk.receive_port");
  process.exit();
}

if (config.has("desk.channel_count")) {
  console.warn(
    "desk.channel_count is no longer necessary. This config entry has been ignored."
  );
}

let type = "SD";
if (config.has("desk.type")) {
  type = config.get("desk.type");
}

console.log("Loading DiGiCo " + type + " configuration");

const planningCenter = new Fetcher(config.get("planningCenter"));
console.log(config.get("planningCenter"));

init(
  config.get("desk.send_port"),
  config.get("desk.receive_port"),
  config.get("desk.ip"), //remoteAddress
  config.get("aux"), //The AUX channels for the session file you will be connecting to
  config.get("channels"), // A list of channels that are available to mix with.
  config.get("server.port"), // The port for the web server
  new Mapper(config),
  config.get("auth"),
  planningCenter
);
