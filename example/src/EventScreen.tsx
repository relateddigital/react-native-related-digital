import * as React from 'react';

import { StyleSheet, Text, View, Button } from 'react-native';

import RelatedDigital from 'react-native-related-digital';

function EventScreen() {
  const [result, setResult] = React.useState("");

  return (
    <View style={styles.container}>
      <Text>Home!</Text>
      <Button
        title={'Custom Event'}
        onPress={() => {
          RelatedDigital.customEvent("test_event", { "test": "test" });
        }}
      />
      <Text>Cust: {result}</Text>
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

export default EventScreen;
