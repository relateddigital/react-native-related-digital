import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';

//import RelatedDigital from 'react-native-related-digital';

function EventScreen() {
  return (
    <View style={styles.container}>
      <Text>Home!</Text>
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
