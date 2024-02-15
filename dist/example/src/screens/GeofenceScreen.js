import React from 'react';
import { View, Button, SafeAreaView, ScrollView } from 'react-native';
import styles from './../Styles';
import { RelatedDigital } from '@relateddigital/react-native-huawei';
import crashlytics from '@react-native-firebase/crashlytics';
const CustomButton = ({ title, onPress }) => (React.createElement(View, { style: styles.button },
    React.createElement(Button, { title: title, onPress: onPress })));
export function GeofenceScreen() {
    return (React.createElement(SafeAreaView, null,
        React.createElement(ScrollView, { contentContainerStyle: styles.container },
            React.createElement(CustomButton, { title: 'Request Location Permissions', onPress: () => RelatedDigital.requestLocationPermissions() }),
            React.createElement(CustomButton, { title: 'Clear History', onPress: () => console.log('asd') }),
            React.createElement(CustomButton, { title: 'Refresh', onPress: () => console.log('asd') }),
            React.createElement(CustomButton, { title: 'Test Crash', onPress: () => crashlytics().crash() }))));
}
