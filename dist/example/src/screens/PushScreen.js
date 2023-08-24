import * as React from 'react';
import { Text, View, Button, TextInput, ScrollView, Switch, Alert, SafeAreaView, } from 'react-native';
import { RelatedDigital } from '@relateddigital/react-native-huawei';
import styles from './../Styles';
export function PushScreen() {
    const [isPushNotificationEnabled, setIsPushNotificationEnabled] = React.useState(false);
    const [propertyKey, setPropertyKey] = React.useState('');
    const [propertyValue, setPropertyValue] = React.useState('');
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
        //RelatedDigital.askForPushNotificationPermission();
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
            React.createElement(Text, { style: styles.heading }, "Push Permissions"),
            React.createElement(View, { style: styles.switchRow },
                React.createElement(Text, null, "Push Notification Enabled:"),
                React.createElement(Switch, { value: isPushNotificationEnabled, onValueChange: handleIsPushNotificationEnabled })),
            React.createElement(View, { style: styles.sectionHeaderContainer },
                React.createElement(Text, { style: styles.cellTitle }, 'section.title.name'),
                React.createElement(Text, { style: styles.sectionSubtitle }, 'section.title.description')),
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
