import * as React from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { RelatedDigital } from '@relateddigital/react-native-huawei';
import styles from './../Styles';

export function FavoriteAttributeScreen() {
  const [exVisitorId, setExVisitorId] = React.useState('');
  const [properties, setProperties] = React.useState('');
  const [pageName, setPageName] = React.useState('');

  const handleCustomEvent = () => {
    let parsedParameters = { key: 'value' };
    RelatedDigital.customEvent(pageName, parsedParameters);
    console.log('Custom event sent.');
  };

  const handleSignUp = () => {
    RelatedDigital.signUp(exVisitorId, {});
  };

  const handleLogin = () => {
    RelatedDigital.login(exVisitorId, {});
  };

  const handleLogout = () => {
    RelatedDigital.logout();
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Authentication</Text>
        <TextInput
          style={styles.input}
          onChangeText={setExVisitorId}
          value={exVisitorId}
          placeholder="exVisitorId"
        />
        <TextInput
          style={styles.input}
          onChangeText={setProperties}
          value={properties}
          placeholder='{"key": "value"}'
        />
        <View style={styles.buttonContainer}>
          <Button title="Sign Up" onPress={handleSignUp} />
          <Button title="Login" onPress={handleLogin} />
          <Button title="Logout" onPress={handleLogout} />
        </View>
        <Text style={styles.heading}>Custom Events</Text>
        <Text>Page Name:</Text>
        <TextInput
          style={styles.input}
          value={pageName}
          onChangeText={setPageName}
          placeholder="Enter page name"
        />
        <Button title="Send Custom Event" onPress={handleCustomEvent} />
      </ScrollView>
    </SafeAreaView>
  );
}
