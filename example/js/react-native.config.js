"use strict";
var _a;
var path = require('path');
var pak = require('../package.json');
module.exports = {
    dependencies: (_a = {},
        _a[pak.name] = {
            root: path.join(__dirname, '..'),
        },
        _a),
};
