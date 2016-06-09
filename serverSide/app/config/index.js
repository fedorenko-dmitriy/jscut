var nconf = require("nconf");
var path = require("path");

module.exports.init = function(customConfigName) {

  var configName = customConfigName ? customConfigName+".json" : 'mainConfig.json';

  nconf.argv()
    .env()
    .file({file: path.join(__dirname, configName)});

  module.exports = nconf;

  return nconf;
};
