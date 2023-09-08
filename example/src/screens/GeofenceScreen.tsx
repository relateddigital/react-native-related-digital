import React from 'react';
import { View, Button, SafeAreaView, ScrollView } from 'react-native';
import styles from './../Styles';
import { RelatedDigital } from '@relateddigital/react-native-huawei';

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
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <CustomButton
          title={'Request Location Permissions'}
          onPress={() => RelatedDigital.requestLocationPermissions()}
        />
        <CustomButton
          title={'Clear History'}
          onPress={() => console.log('asd')}
        />
        <CustomButton title={'Refresh'} onPress={() => console.log('asd')} />
      </ScrollView>
    </SafeAreaView>
  );
}
