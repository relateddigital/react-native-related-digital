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
function PushScreen() {
    var _a = React.useState(false), isInAppNotificationEnabled = _a[0], setIsInAppNotificationEnabled = _a[1];
    var _b = React.useState(false), isPushNotificationEnabled = _b[0], setIsPushNotificationEnabled = _b[1];
    var _c = React.useState(''), propertyKey = _c[0], setPropertyKey = _c[1];
    var _d = React.useState(''), propertyValue = _d[0], setPropertyValue = _d[1];
    var handleIsInAppNotificationEnabled = function (value) {
        setIsInAppNotificationEnabled(value);
        react_native_related_digital_1.default.setIsInAppNotificationEnabled(value);
    };
    var handleIsPushNotificationEnabled = function (value) {
        setIsPushNotificationEnabled(value);
        react_native_related_digital_1.default.setIsPushNotificationEnabled(value, 'yourAppAlias', 'relateddigital-android-test', 'relateddigital-android-huawei-test', true);
    };
    var handleSetUserProperty = function () {
        react_native_related_digital_1.default.setUserProperty(propertyKey, propertyValue);
        console.log('User property set.');
    };
    var handleRemoveUserProperty = function () {
        react_native_related_digital_1.default.removeUserProperty(propertyKey);
        console.log('User property removed.');
    };
    var handleGetToken = function () {
        react_native_related_digital_1.default.getToken().then(function (token) {
            console.log(token);
            react_native_1.Alert.alert('Push Token', token);
        });
    };
    var handleAskForPushNotificationPermission = function () {
        react_native_related_digital_1.default.askForPushNotificationPermission();
    };
    var handleSetEmail = function () {
        react_native_related_digital_1.default.setEmail('random@gmail.com', true);
    };
    var handleGetPushMessages = function () {
        react_native_related_digital_1.default.getPushMessages().then(function (pushMessages) {
            console.log(pushMessages);
        });
    };
    return (React.createElement(react_native_1.ScrollView, { contentContainerStyle: styles.container },
        React.createElement(react_native_1.Text, { style: styles.heading }, "Notifications"),
        React.createElement(react_native_1.View, { style: styles.switchRow },
            React.createElement(react_native_1.Text, null, "In-App Notification Enabled:"),
            React.createElement(react_native_1.Switch, { value: isInAppNotificationEnabled, onValueChange: handleIsInAppNotificationEnabled })),
        React.createElement(react_native_1.View, { style: styles.switchRow },
            React.createElement(react_native_1.Text, null, "Push Notification Enabled:"),
            React.createElement(react_native_1.Switch, { value: isPushNotificationEnabled, onValueChange: handleIsPushNotificationEnabled })),
        React.createElement(react_native_1.Text, { style: styles.heading }, "User Properties"),
        React.createElement(react_native_1.Text, null, "Property Key:"),
        React.createElement(react_native_1.TextInput, { style: styles.input, value: propertyKey, onChangeText: setPropertyKey, placeholder: "Enter property key" }),
        React.createElement(react_native_1.Text, null, "Property Value:"),
        React.createElement(react_native_1.TextInput, { style: styles.input, value: propertyValue, onChangeText: setPropertyValue, placeholder: "Enter property value" }),
        React.createElement(react_native_1.View, { style: styles.button },
            React.createElement(react_native_1.Button, { title: "Set User Property", onPress: handleSetUserProperty })),
        React.createElement(react_native_1.View, { style: styles.button },
            React.createElement(react_native_1.Button, { title: "Remove User Property", onPress: handleRemoveUserProperty })),
        React.createElement(react_native_1.View, { style: styles.button },
            React.createElement(react_native_1.Button, { title: "Get Token", onPress: handleGetToken })),
        React.createElement(react_native_1.View, { style: styles.button },
            React.createElement(react_native_1.Button, { title: "Ask for Push Notification Permission", onPress: handleAskForPushNotificationPermission })),
        React.createElement(react_native_1.View, { style: styles.button },
            React.createElement(react_native_1.Button, { title: "Set Email", onPress: handleSetEmail })),
        React.createElement(react_native_1.View, { style: styles.button },
            React.createElement(react_native_1.Button, { title: "Get Push Messages", onPress: handleGetPushMessages }))));
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
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        paddingLeft: 8,
        paddingRight: 8,
        marginBottom: 16,
    },
    button: {
        marginBottom: 16,
    },
});
exports.default = PushScreen;
