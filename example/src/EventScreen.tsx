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

  const handleSignUp = () => {
    const parsedProperties = JSON.parse(properties);
    RelatedDigital.signUp(exVisitorId, parsedProperties);
  };

  const handleLogin = () => {
    const parsedProperties = JSON.parse(properties);
    RelatedDigital.login(exVisitorId, parsedProperties);
  };

  const handleLogout = () => {
    RelatedDigital.logout();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Events</Text>
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
