import * as React from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  Switch,
  Alert,
  SafeAreaView,
} from 'react-native';
import styles from './../Styles';
import { RelatedDigital } from '@relateddigital/react-native-huawei';

export function PushScreen() {
  const [isPushNotificationEnabled, setIsPushNotificationEnabled] =
    React.useState(false);
  const [propertyKey, setPropertyKey] = React.useState('');
  const [propertyValue, setPropertyValue] = React.useState('');
  const handleIsPushNotificationEnabled = (value: boolean) => {
    setIsPushNotificationEnabled(value);
    RelatedDigital.setIsPushNotificationEnabled(
      value,
      'yourAppAlias',
      'relateddigital-android-test',
      'relateddigital-android-huawei-test',
      true
    );
  };

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
        <Text style={styles.heading}>Push Permissions</Text>
        <View style={styles.switchRow}>
          <Text>Push Notification Enabled:</Text>
          <Switch
            value={isPushNotificationEnabled}
            onValueChange={handleIsPushNotificationEnabled}
          />
        </View>
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.cellTitle}>{'section.title.name'}</Text>
          <Text style={styles.sectionSubtitle}>
            {'section.title.description'}
          </Text>
        </View>

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