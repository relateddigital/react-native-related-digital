import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
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
        return (React.createElement(View, { style: styles.row },
            React.createElement(Text, { style: styles.name }, item.name),
            React.createElement(Text, { style: styles.description }, item.description)));
    };
    return (React.createElement(View, { style: styles.container },
        React.createElement(FlatList, { data: geofenceData, renderItem: renderItem, keyExtractor: (item) => item.id.toString() })));
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#777',
    },
});
