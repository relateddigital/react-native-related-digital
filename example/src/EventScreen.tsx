import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
} from 'react-native';
import RelatedDigital from 'react-native-related-digital';

function EventScreen() {
  const [exVisitorId, setExVisitorId] = React.useState('');
  const [properties, setProperties] = React.useState('');
  const [pageName, setPageName] = React.useState('');
  const [parameters, setParameters] = React.useState('');

  const handleCustomEvent = () => {
    let parsedParameters = {};
    try {
      parsedParameters = JSON.parse(parameters);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      console.log('Parameters must be a valid JSON object.');
      return;
    }
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
      <Text>Parameters (JSON):</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={parameters}
        onChangeText={setParameters}
        placeholder="Enter parameters as a JSON object"
        multiline
      />
      <Button title="Send Custom Event" onPress={handleCustomEvent} />
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
});

export default EventScreen;
