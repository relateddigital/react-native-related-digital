import * as React from 'react';

import { StyleSheet, Text, View, Button } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import RelatedDigital from 'react-native-related-digital';

export default function PushScreen() {
  const navigation = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      console.log('PushScreen');
    }, [])
  );
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>-:Push Notification:-</Text>
      <Button
        title={'custom event'}
        onPress={() => {
          RelatedDigital.customEvent('ProductView', { key: 'value' });
        }}
      />
      <Button
        title={'go home'}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text> On goBack</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  heading: {
    fontWeight: 'bold',
    marginTop: 20,
  },
});
