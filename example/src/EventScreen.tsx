import * as React from 'react';

import { StyleSheet, Text, View, Button } from 'react-native';

import RelatedDigital from 'react-native-related-digital';

function EventScreen() {
  const [result, setResult] = React.useState(0.0);

  return (
    <View style={styles.container}>
      <Text>Home!</Text>
      <Button
        title={'Multiply'}
        onPress={() => {
          RelatedDigital.multiply(5.0, 23.0).then((res) => {
            console.log(res);
            setResult(res);
          });
        }}
      />
      <Text>{result}</Text>
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
