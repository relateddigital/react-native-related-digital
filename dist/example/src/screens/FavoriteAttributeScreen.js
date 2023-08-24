import * as React from 'react';
import { Text, View, Button, TextInput, ScrollView, SafeAreaView, } from 'react-native';
import { RelatedDigital } from '@relateddigital/react-native-huawei';
import styles from './../Styles';
export function FavoriteAttributeScreen() {
    const [exVisitorId, setExVisitorId] = React.useState('');
    const [properties, setProperties] = React.useState('');
    const [pageName, setPageName] = React.useState('');
    const handleCustomEvent = () => {
        let parsedParameters = { key: 'value' };
        RelatedDigital.customEvent(pageName, parsedParameters);
        console.log('Custom event sent.');
    };
    const handleSignUp = () => {
        RelatedDigital.signUp(exVisitorId, {});
    };
    const handleLogin = () => {
        RelatedDigital.login(exVisitorId, {});
    };
    const handleLogout = () => {
        RelatedDigital.logout();
    };
    return (React.createElement(SafeAreaView, null,
        React.createElement(ScrollView, { contentContainerStyle: styles.container },
            React.createElement(Text, { style: styles.heading }, "Authentication"),
            React.createElement(TextInput, { style: styles.input, onChangeText: setExVisitorId, value: exVisitorId, placeholder: "exVisitorId" }),
            React.createElement(TextInput, { style: styles.input, onChangeText: setProperties, value: properties, placeholder: '{"key": "value"}' }),
            React.createElement(View, { style: styles.buttonContainer },
                React.createElement(Button, { title: "Sign Up", onPress: handleSignUp }),
                React.createElement(Button, { title: "Login", onPress: handleLogin }),
                React.createElement(Button, { title: "Logout", onPress: handleLogout })),
            React.createElement(Text, { style: styles.heading }, "Custom Events"),
            React.createElement(Text, null, "Page Name:"),
            React.createElement(TextInput, { style: styles.input, value: pageName, onChangeText: setPageName, placeholder: "Enter page name" }),
            React.createElement(Button, { title: "Send Custom Event", onPress: handleCustomEvent }))));
}
