const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
// Add resolution for Firebase subpath exports
config.resolver.sourceExts = [...config.resolver.sourceExts, "mjs", "cjs"];
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
};
config.resolver.sourceExts.push("cjs");
config.resolver.unstable_enablePackageExports = false;

// Export with NativeWind configuration
module.exports = withNativeWind(config, { input: "./global.css" });
