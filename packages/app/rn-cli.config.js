const blacklist = require("metro-config/src/defaults/blacklist");
const path = require("path");

module.exports = {
  getBlacklistRE() {
    return blacklist([/react-native\/local-cli\/core\/__fixtures__.*/]);
  },
  projectRoot: path.resolve(__dirname),
  watchFolders: [
    path.resolve(__dirname, "../..", "node_modules"),
    path.resolve(__dirname, "../common"),
    path.resolve(__dirname, "../controller")
  ]
};
