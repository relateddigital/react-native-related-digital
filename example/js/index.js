"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var App_1 = __importDefault(require("./src/App"));
var app_json_1 = require("./app.json");
var react_native_related_digital_1 = require("react-native-related-digital");
react_native_related_digital_1.RelatedDigital.initialize('676D325830564761676D453D', '356467332F6533766975593D', 'visistore', false // askLocationPermissionAtStart
);
react_native_related_digital_1.RelatedDigital.registerNotificationListeners();
react_native_related_digital_1.RelatedDigitalPushNotificationEmitter.addListener(react_native_related_digital_1.onNotificationRegistered, function (token) {
    console.log(react_native_related_digital_1.onNotificationRegistered);
    console.log(token);
});
react_native_related_digital_1.RelatedDigitalPushNotificationEmitter.addListener(react_native_related_digital_1.onNotificationReceived, function (payload) {
    console.log(react_native_related_digital_1.onNotificationReceived);
    console.log(payload);
});
react_native_related_digital_1.RelatedDigitalPushNotificationEmitter.addListener(react_native_related_digital_1.onNotificationOpened, function (payload) {
    console.log(react_native_related_digital_1.onNotificationOpened);
    console.log(payload);
});
react_native_1.AppRegistry.registerComponent(app_json_1.name, function () { return App_1.default; });
