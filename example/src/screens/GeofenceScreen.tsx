import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './../Styles';

export interface GeofenceItem {
  id: number;
  name: string;
  description: string;
}

export const geofenceData: GeofenceItem[] = [
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
  const renderItem = ({ item }: { item: GeofenceItem }) => {
    return (
      <View style={styles.geofenceRow}>
        <Text style={styles.geofenceName}>{item.name}</Text>
        <Text style={styles.geofenceDescription}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.geofenceContainer}>
      <FlatList
        data={geofenceData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
