const path = require('path');

const projectRoot = path.resolve(__dirname,'../');

module.exports = {
  resolver: {
    extraNodeModules: new Proxy(
      {},
      {
        get: (_, name) =>
          path.resolve(projectRoot, 'client', 'node_modules', name),
      }
    ),
  },

  watchFolders: [
    path.resolve(projectRoot, 'client'),
    path.resolve(projectRoot, 'sdk'),
  ],
};