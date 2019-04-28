const blacklist = require("metro-config/src/defaults/blacklist");
const path = require("path");

module.exports = {
  extraNodeModules: {
    "react-native": path.resolve(__dirname, "node_modules/react-native")
  },
  getBlacklistRE() {
    return blacklist([/react-native\/local-cli\/core\/__fixtures__.*/]);
  },
  projectRoot: path.resolve(__dirname),
  watchFolders: [path.resolve(__dirname, "../..", "node_modules")]
};
