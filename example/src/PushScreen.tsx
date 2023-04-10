import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import RelatedDigital from 'react-native-related-digital';

function PushScreen() {
  const [isInAppNotificationEnabled, setIsInAppNotificationEnabled] =
    React.useState(false);
  const [isPushNotificationEnabled, setIsPushNotificationEnabled] =
    React.useState(false);
  const [isGeofenceEnabled, setIsGeofenceEnabled] = React.useState(false);
  const [propertyKey, setPropertyKey] = React.useState('');
  const [propertyValue, setPropertyValue] = React.useState('');

  const handleIsInAppNotificationEnabled = (value: boolean) => {
    setIsInAppNotificationEnabled(value);
    RelatedDigital.setIsInAppNotificationEnabled(value);
  };

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

  const handleIsGeofenceEnabled = (value: boolean) => {
    setIsGeofenceEnabled(value);
    RelatedDigital.setIsGeofenceEnabled(value);
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
    RelatedDigital.askForPushNotificationPermission();
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Notifications</Text>
      <View style={styles.switchRow}>
        <Text>In-App Notification Enabled:</Text>
        <Switch
          value={isInAppNotificationEnabled}
          onValueChange={handleIsInAppNotificationEnabled}
        />
      </View>
      <View style={styles.switchRow}>
        <Text>Push Notification Enabled:</Text>
        <Switch
          value={isPushNotificationEnabled}
          onValueChange={handleIsPushNotificationEnabled}
        />
      </View>
      <View style={styles.switchRow}>
        <Text>Geofence Enabled:</Text>
        <Switch
          value={isGeofenceEnabled}
          onValueChange={handleIsGeofenceEnabled}
        />
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
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
  },
});

export default PushScreen;
