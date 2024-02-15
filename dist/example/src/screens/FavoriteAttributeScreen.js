import * as React from 'react';
import { View, Button, TextInput, ScrollView, SafeAreaView, } from 'react-native';
import { RelatedDigital } from '@relateddigital/react-native-huawei';
import styles from './../Styles';
export function FavoriteAttributeScreen() {
    const [actionId, setActionId] = React.useState('188');
    const getFavoriteAttributeActions = () => {
        RelatedDigital.getFavoriteAttributeActions(actionId).then((favoriteAttributeActionResponse) => {
            console.log('Favorite Attribute Action Response:', favoriteAttributeActionResponse);
        });
    };
    return (React.createElement(SafeAreaView, null,
        React.createElement(ScrollView, { contentContainerStyle: styles.container },
            React.createElement(TextInput, { style: styles.input, placeholder: "Action Id(optional)", value: actionId, onChangeText: setActionId }),
            React.createElement(View, { style: styles.button },
                React.createElement(Button, { title: 'Get Favorite Attribute Actions', onPress: () => getFavoriteAttributeActions() })))));
}
