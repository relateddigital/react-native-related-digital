const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const path = require('path');
const sdkRoot = path.resolve(__dirname, '..'); //
/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders: [sdkRoot],
  resolver: {
    nodeModulesPaths: [
      path.join(__dirname, 'node_modules'),
      path.join(sdkRoot, 'node_modules'),
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
