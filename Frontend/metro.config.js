// const { getDefaultConfig } = require("expo/metro-config");
// const { withNativeWind } = require("nativewind/metro");

// const config = getDefaultConfig(__dirname);

// module.exports = withNativeWind(config, {
//   input: "./src/app/global.css",
// });



const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// SVG configuration
config.transformer.babelTransformerPath = require.resolve(
  "react-native-svg-transformer/expo"
);

config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== "svg"
);

config.resolver.sourceExts.push("svg");

// NativeWind configuration
module.exports = withNativeWind(config, {
  input: "./src/app/global.css",
});