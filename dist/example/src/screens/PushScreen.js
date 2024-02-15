import * as React from 'react';
import { Text, View, Button, TextInput, ScrollView, Alert, SafeAreaView, } from 'react-native';
import styles from './../Styles';
import { RDEventType, RelatedDigital, } from '@relateddigital/react-native-huawei';
const CustomButton = ({ title, onPress }) => (React.createElement(View, { style: styles.button },
    React.createElement(Button, { title: title, onPress: onPress })));
export function PushScreen() {
    const [email, setEmail] = React.useState('');
    const [relatedDigitalUserId, setRelatedDigitalUserId] = React.useState('');
    const handlePushPermission = (permission) => {
        RelatedDigital.setIsPushNotificationEnabled(permission, 'RDIOSExample', 'relateddigital-android-test', 'relateddigital-android-huawei-test', permission);
    };
    const handlePhonePermission = (permission) => {
        RelatedDigital.setPhoneNumber('05559990000', permission);
    };
    const handleEmailPermission = (permission) => {
        RelatedDigital.setEmail(email, permission);
    };
    const handleRegisterEmail = () => {
        RelatedDigital.registerEmail(email, true, true);
    };
    const handleGetToken = () => {
        RelatedDigital.getToken().then((token) => {
            console.log('Push Token', token);
            Alert.alert('Push Token', token);
        });
    };
    const handleGetPushMessages = (withId) => {
        const fetchMethod = withId
            ? RelatedDigital.getPushMessagesWithId
            : RelatedDigital.getPushMessages;
        fetchMethod().then(console.log);
    };
    const handleCreateListeners = () => {
        RelatedDigital.addListener(RDEventType.NotificationRegistered, async (event) => {
            console.log('Push Notification Registered: ' + JSON.stringify(event));
        });
        RelatedDigital.addListener(RDEventType.NotificationReceived, async (event) => {
            console.log('Push Notification Received: ' + JSON.stringify(event));
        });
        RelatedDigital.addListener(RDEventType.NotificationOpened, async (event) => {
            console.log('Push Notification Opened: ' + JSON.stringify(event));
        });
    };
    return (React.createElement(SafeAreaView, null,
        React.createElement(ScrollView, { contentContainerStyle: styles.container },
            React.createElement(CustomButton, { title: 'Ask For Push Notification Permission', onPress: () => RelatedDigital.askForNotificationPermission() }),
            React.createElement(CustomButton, { title: 'Ask For Push Notification Permission Provisional', onPress: () => RelatedDigital.askForNotificationPermissionProvisional() }),
            React.createElement(Text, null, "Email:"),
            React.createElement(TextInput, { style: styles.input, value: email, onChangeText: setEmail }),
            React.createElement(Text, null, "User Id:"),
            React.createElement(TextInput, { style: styles.input, value: relatedDigitalUserId, onChangeText: setRelatedDigitalUserId }),
            React.createElement(CustomButton, { title: 'Enable Push Notification', onPress: () => handlePushPermission(true) }),
            React.createElement(CustomButton, { title: 'Disable Push Notification', onPress: () => handlePushPermission(false) }),
            React.createElement(CustomButton, { title: 'Enable Phone Permission', onPress: () => handlePhonePermission(true) }),
            React.createElement(CustomButton, { title: 'Disable Phone Permission', onPress: () => handlePhonePermission(false) }),
            React.createElement(CustomButton, { title: 'Enable Email Permission', onPress: () => handleEmailPermission(true) }),
            React.createElement(CustomButton, { title: 'Disable Email Permission', onPress: () => handleEmailPermission(false) }),
            React.createElement(CustomButton, { title: 'Set Email', onPress: () => handleEmailPermission(true) }),
            React.createElement(CustomButton, { title: 'Register Email', onPress: () => handleRegisterEmail() }),
            React.createElement(CustomButton, { title: 'Set Twitter Id', onPress: () => RelatedDigital.setTwitterId('123456789') }),
            React.createElement(CustomButton, { title: 'Set Facebook Id', onPress: () => RelatedDigital.setFacebookId('123456789') }),
            React.createElement(CustomButton, { title: 'Set Related Digital Id', onPress: () => RelatedDigital.setRelatedDigitalUserId(relatedDigitalUserId) }),
            React.createElement(CustomButton, { title: 'Set Notification Login Id', onPress: () => RelatedDigital.setNotificationLoginId('987654321') }),
            React.createElement(CustomButton, { title: 'Set User Property', onPress: () => RelatedDigital.setUserProperty('key', 'value') }),
            React.createElement(CustomButton, { title: 'Remove User Property', onPress: () => RelatedDigital.removeUserProperty('key') }),
            React.createElement(CustomButton, { title: 'Get Token', onPress: handleGetToken }),
            React.createElement(CustomButton, { title: 'Get Push Messages', onPress: () => handleGetPushMessages(false) }),
            React.createElement(CustomButton, { title: 'Get Push Messages With Id', onPress: () => handleGetPushMessages(true) }),
            React.createElement(CustomButton, { title: 'Create Listeners', onPress: () => handleCreateListeners() }))));
}
