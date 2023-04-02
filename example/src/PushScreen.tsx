import * as React from 'react';

import { StyleSheet, Text, View, Button } from 'react-native';

import RelatedDigital from 'react-native-related-digital';

function PushScreen() {
  const [result, setResult] = React.useState("");

  return (
    <View style={styles.container}>
      <Text>PushScreen!</Text>
      <Button
        title={'Read Token'}
        onPress={() => {
          RelatedDigital.getToken().then((res) => {
            console.log(res);
            setResult(res);
          });
        }}
      />
      <Text>Token: {result}</Text>
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
export default PushScreen;
