import React from 'react';
import { View, Text, FlatList, Button, SafeAreaView } from 'react-native';
import styles from './../Styles';
import { RelatedDigital } from '@relateddigital/react-native-huawei';

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

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const CustomButton: React.FC<ButtonProps> = ({ title, onPress }) => (
  <View style={styles.button}>
    <Button title={title} onPress={onPress} />
  </View>
);

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
    <SafeAreaView style={styles.container}>
      <CustomButton
        title={'Request Location Permissions'}
        onPress={() => RelatedDigital.requestLocationPermissions()}
      />
      <CustomButton
        title={'Clear History'}
        onPress={() => console.log('asd')}
      />
      <CustomButton title={'Refresh'} onPress={() => console.log('asd')} />
      <FlatList
        data={geofenceData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}
