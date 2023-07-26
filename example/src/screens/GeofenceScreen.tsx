import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

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
      <View style={styles.row}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={geofenceData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
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
