import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import RelatedDigital from 'react-native-related-digital';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    RelatedDigital.multiply(3, 47).then(setResult);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Resultss: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
