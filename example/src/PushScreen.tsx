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
  //const [email, setEmail] = React.useState('');
  //const [phone, setPhone] = React.useState('');
  //const [emailPermission, setEmailPermission] = React.useState(false);
  //const [phonePermission, setPhonePermission] = React.useState(false);
  const [propertyKey, setPropertyKey] = React.useState('');
  const [propertyValue, setPropertyValue] = React.useState('');

  // ...other state variables for other methods

  const handleIsInAppNotificationEnabled = (value: boolean) => {
    setIsInAppNotificationEnabled(value);
    RelatedDigital.setIsInAppNotificationEnabled(value);
  };

  const handleIsPushNotificationEnabled = (value: boolean) => {
    setIsPushNotificationEnabled(value);
    RelatedDigital.setIsPushNotificationEnabled(
      value,
      'yourAppAlias',
      'yourHuaweiAppAlias',
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
      Alert.alert('Push Token', token);
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
      <Button title="Set User Property" onPress={handleSetUserProperty} />
      <Button title="Remove User Property" onPress={handleRemoveUserProperty} />
      <Button title="Get Token" onPress={handleGetToken} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '100%',
    marginBottom: 10,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
});

export default PushScreen;
