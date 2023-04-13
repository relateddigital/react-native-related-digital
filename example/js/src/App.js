"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var native_1 = require("@react-navigation/native");
var bottom_tabs_1 = require("@react-navigation/bottom-tabs");
var react_native_1 = require("react-native");
var EventScreen_1 = __importDefault(require("./EventScreen"));
var PushScreen_1 = __importDefault(require("./PushScreen"));
var Tab = (0, bottom_tabs_1.createBottomTabNavigator)();
function App() {
    return (React.createElement(native_1.NavigationContainer, null,
        React.createElement(Tab.Navigator, { screenOptions: function (_a) {
                var route = _a.route;
                return ({
                    tabBarIcon: function (_a) {
                        var focused = _a.focused;
                        var iconName;
                        if (route.name === 'Event') {
                            iconName = focused
                                ? require('./img/analytics.png')
                                : require('./img/analytics.png');
                        }
                        else if (route.name === 'Push') {
                            iconName = focused
                                ? require('./img/notification.png')
                                : require('./img/notification.png');
                        }
                        return React.createElement(react_native_1.Image, { source: iconName, style: styles.img });
                    },
                });
            } },
            React.createElement(Tab.Screen, { name: "Event", component: EventScreen_1.default }),
            React.createElement(Tab.Screen, { name: "Push", component: PushScreen_1.default }))));
}
var styles = react_native_1.StyleSheet.create({
    img: {
        width: 24,
        height: 24,
    },
});
exports.default = App;
