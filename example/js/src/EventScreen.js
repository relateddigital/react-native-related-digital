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
var react_native_1 = require("react-native");
var react_native_related_digital_1 = __importDefault(require("react-native-related-digital"));
function EventScreen() {
    var _a = React.useState(''), exVisitorId = _a[0], setExVisitorId = _a[1];
    var _b = React.useState(''), properties = _b[0], setProperties = _b[1];
    var _c = React.useState(''), pageName = _c[0], setPageName = _c[1];
    var _d = React.useState(''), parameters = _d[0], setParameters = _d[1];
    var handleCustomEvent = function () {
        var parsedParameters = {};
        try {
            parsedParameters = JSON.parse(parameters);
        }
        catch (error) {
            console.error('Error parsing JSON:', error);
            console.log('Parameters must be a valid JSON object.');
            return;
        }
        react_native_related_digital_1.default.customEvent(pageName, parsedParameters);
        console.log('Custom event sent.');
    };
    var handleSignUp = function () {
        react_native_related_digital_1.default.signUp(exVisitorId, {});
    };
    var handleLogin = function () {
        react_native_related_digital_1.default.login(exVisitorId, {});
    };
    var handleLogout = function () {
        react_native_related_digital_1.default.logout();
    };
    return (React.createElement(react_native_1.ScrollView, { contentContainerStyle: styles.container },
        React.createElement(react_native_1.Text, { style: styles.heading }, "Authentication"),
        React.createElement(react_native_1.TextInput, { style: styles.input, onChangeText: setExVisitorId, value: exVisitorId, placeholder: "exVisitorId" }),
        React.createElement(react_native_1.TextInput, { style: styles.input, onChangeText: setProperties, value: properties, placeholder: '{"key": "value"}' }),
        React.createElement(react_native_1.View, { style: styles.buttonContainer },
            React.createElement(react_native_1.Button, { title: "Sign Up", onPress: handleSignUp }),
            React.createElement(react_native_1.Button, { title: "Login", onPress: handleLogin }),
            React.createElement(react_native_1.Button, { title: "Logout", onPress: handleLogout })),
        React.createElement(react_native_1.Text, { style: styles.heading }, "Custom Events"),
        React.createElement(react_native_1.Text, null, "Page Name:"),
        React.createElement(react_native_1.TextInput, { style: styles.input, value: pageName, onChangeText: setPageName, placeholder: "Enter page name" }),
        React.createElement(react_native_1.Text, null, "Parameters (JSON):"),
        React.createElement(react_native_1.TextInput, { style: [styles.input, { height: 100 }], value: parameters, onChangeText: setParameters, placeholder: "Enter parameters as a JSON object", multiline: true }),
        React.createElement(react_native_1.Button, { title: "Send Custom Event", onPress: handleCustomEvent })));
}
var styles = react_native_1.StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 8,
        paddingRight: 8,
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 16,
    },
});
exports.default = EventScreen;
