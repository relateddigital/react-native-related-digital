import * as React from 'react';
import { View, Button, ScrollView, SafeAreaView } from 'react-native';
import { RelatedDigital } from '@relateddigital/react-native-huawei';
import { RDInAppNotificationType, getInApps } from '../Helpers';
import styles from './../Styles';
export function TargetingActionScreen() {
    const inAppEvent = (queryStringFilter) => {
        let properties = {};
        properties['OM.inapptype'] = queryStringFilter;
        if (queryStringFilter.toLowerCase() ===
            RDInAppNotificationType.productStatNotifier.toLowerCase()) {
            properties['OM.pv'] = 'CV7933-837-837';
        }
        RelatedDigital.customEvent('InAppTest', properties);
    };
    return (React.createElement(SafeAreaView, null,
        React.createElement(ScrollView, { contentContainerStyle: styles.container }, Object.entries(getInApps()).map(([notificationType, inAppType], index) => Object.entries(inAppType).map(([queryStringFilter, actionId], subIndex) => (React.createElement(View, { style: styles.button, key: `${index}-${subIndex}` },
            React.createElement(Button, { title: `TYPE: ${notificationType} \n QUERY: ${queryStringFilter} \n ACTION ID: ${actionId}`, onPress: () => inAppEvent(queryStringFilter) }))))))));
}
