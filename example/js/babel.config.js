"use strict";
var _a;
var path = require('path');
var pak = require('../package.json');
module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                extensions: ['.tsx', '.ts', '.js', '.json'],
                alias: (_a = {},
                    _a[pak.name] = path.join(__dirname, '..', pak.source),
                    _a),
            },
        ],
    ],
};
