import * as React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, SafeAreaView, } from 'react-native';
import { RelatedDigital } from '@relateddigital/react-native-huawei';
function TargetingActionScreen() {
    const [exVisitorId, setExVisitorId] = React.useState('');
    const [properties, setProperties] = React.useState('');
    const [pageName, setPageName] = React.useState('');
    const handleCustomEvent = () => {
        let parsedParameters = { 'OM.inapptype': 'image_text_button' };
        //let parsedParameters = { key: 'value' };
        RelatedDigital.customEvent('Test', parsedParameters);
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
export default TargetingActionScreen;
