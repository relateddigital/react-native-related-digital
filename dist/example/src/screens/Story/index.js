import * as React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Switch, Alert, SafeAreaView, } from 'react-native';
import RelatedDigital from 'react-native-related-digital';
function StoryScreen() {
    const [isInAppNotificationEnabled, setIsInAppNotificationEnabled] = React.useState(false);
    const [isPushNotificationEnabled, setIsPushNotificationEnabled] = React.useState(false);
    const [propertyKey, setPropertyKey] = React.useState('');
    const [propertyValue, setPropertyValue] = React.useState('');
    const handleIsInAppNotificationEnabled = (value) => {
        setIsInAppNotificationEnabled(value);
        RelatedDigital.setIsInAppNotificationEnabled(value);
    };
    const handleIsPushNotificationEnabled = (value) => {
        setIsPushNotificationEnabled(value);
        RelatedDigital.setIsPushNotificationEnabled(value, 'yourAppAlias', 'relateddigital-android-test', 'relateddigital-android-huawei-test', true);
    };
    const handleSetUserProperty = () => {
        RelatedDigital.setUserProperty(propertyKey, propertyValue);
        console.log('User property set.');
    };
    const handleRemoveUserProperty = () => {
        RelatedDigital.removeUserProperty(propertyKey);
        console.log('User property removed.');
    };
    const handleGetToken = () => {
        RelatedDigital.getToken().then((token) => {
            console.log(token);
            Alert.alert('Push Token', token);
        });
    };
    const handleAskForPushNotificationPermission = () => {
        RelatedDigital.askForPushNotificationPermission();
    };
    const handleSetEmail = () => {
        RelatedDigital.setEmail('random@gmail.com', true);
    };
    const handleGetPushMessages = () => {
        RelatedDigital.getPushMessages().then((pushMessages) => {
            console.log(pushMessages);
        });
    };
    return (React.createElement(SafeAreaView, null,
        React.createElement(ScrollView, { contentContainerStyle: styles.container },
            React.createElement(Text, { style: styles.heading }, "Notifications"),
            React.createElement(View, { style: styles.switchRow },
                React.createElement(Text, null, "In-App Notification Enabled:"),
                React.createElement(Switch, { value: isInAppNotificationEnabled, onValueChange: handleIsInAppNotificationEnabled })),
            React.createElement(View, { style: styles.switchRow },
                React.createElement(Text, null, "Push Notification Enabled:"),
                React.createElement(Switch, { value: isPushNotificationEnabled, onValueChange: handleIsPushNotificationEnabled })),
            React.createElement(Text, { style: styles.heading }, "User Properties"),
            React.createElement(Text, null, "Property Key:"),
            React.createElement(TextInput, { style: styles.input, value: propertyKey, onChangeText: setPropertyKey, placeholder: "Enter property key" }),
            React.createElement(Text, null, "Property Value:"),
            React.createElement(TextInput, { style: styles.input, value: propertyValue, onChangeText: setPropertyValue, placeholder: "Enter property value" }),
            React.createElement(View, { style: styles.button },
                React.createElement(Button, { title: "Set User Property", onPress: handleSetUserProperty })),
            React.createElement(View, { style: styles.button },
                React.createElement(Button, { title: "Remove User Property", onPress: handleRemoveUserProperty })),
            React.createElement(View, { style: styles.button },
                React.createElement(Button, { title: "Get Token", onPress: handleGetToken })),
            React.createElement(View, { style: styles.button },
                React.createElement(Button, { title: "Ask for Push Notification Permission", onPress: handleAskForPushNotificationPermission })),
            React.createElement(View, { style: styles.button },
                React.createElement(Button, { title: "Set Email", onPress: handleSetEmail })),
            React.createElement(View, { style: styles.button },
                React.createElement(Button, { title: "Get Push Messages", onPress: handleGetPushMessages })))));
}
const styles = StyleSheet.create({
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
export default StoryScreen;
