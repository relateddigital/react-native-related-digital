import * as React from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import { RelatedDigital } from '@relateddigital/react-native-huawei';
import styles from './../Styles';

export function RecommendationScreen() {
  const [propertyKey, setPropertyKey] = React.useState('');
  const [propertyValue, setPropertyValue] = React.useState('');

  const handleSetUserProperty = () => {
    RelatedDigital.setUserProperty(propertyKey, propertyValue);
    console.log('User property set.');
  };

  const handleRemoveUserProperty = () => {
    RelatedDigital.removeUserProperty(propertyKey);
    console.log('User property removed.');
  };

  const handleGetToken = () => {
    RelatedDigital.getToken().then((token) => {
      console.log(token);
      Alert.alert('Push Token', token);
    });
  };

  const handleAskForPushNotificationPermission = () => {
    //RelatedDigital.askForPushNotificationPermission();
  };

  const handleSetEmail = () => {
    RelatedDigital.setEmail('random@gmail.com', true);
  };

  const handleGetPushMessages = () => {
    RelatedDigital.getPushMessages().then((pushMessages) => {
      console.log(pushMessages);
    });
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>User Properties</Text>
        <Text>Property Key:</Text>
        <TextInput
          style={styles.input}
          value={propertyKey}
          onChangeText={setPropertyKey}
          placeholder="Enter property key"
        />
        <Text>Property Value:</Text>
        <TextInput
          style={styles.input}
          value={propertyValue}
          onChangeText={setPropertyValue}
          placeholder="Enter property value"
        />
        <View style={styles.button}>
          <Button title="Set User Property" onPress={handleSetUserProperty} />
        </View>
        <View style={styles.button}>
          <Button
            title="Remove User Property"
            onPress={handleRemoveUserProperty}
          />
        </View>
        <View style={styles.button}>
          <Button title="Get Token" onPress={handleGetToken} />
        </View>
        <View style={styles.button}>
          <Button
            title="Ask for Push Notification Permission"
            onPress={handleAskForPushNotificationPermission}
          />
        </View>
        <View style={styles.button}>
          <Button title="Set Email" onPress={handleSetEmail} />
        </View>
        <View style={styles.button}>
          <Button title="Get Push Messages" onPress={handleGetPushMessages} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
