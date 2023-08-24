import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './../Styles';
export const geofenceData = [
    {
        id: 1,
        name: 'Geofence 1',
        description: 'This is geofence 1',
    },
    {
        id: 2,
        name: 'Geofence 2',
        description: 'This is geofence 2',
    },
];
export function GeofenceScreen() {
    const renderItem = ({ item }) => {
        return (React.createElement(View, { style: styles.geofenceRow },
            React.createElement(Text, { style: styles.geofenceName }, item.name),
            React.createElement(Text, { style: styles.geofenceDescription }, item.description)));
    };
    return (React.createElement(View, { style: styles.geofenceContainer },
        React.createElement(FlatList, { data: geofenceData, renderItem: renderItem, keyExtractor: (item) => item.id.toString() })));
}
