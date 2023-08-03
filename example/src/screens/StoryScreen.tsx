import * as React from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Button,
  View,
} from 'react-native';
import { RDStoryView } from '@relateddigital/react-native-huawei';

export function StoryScreen() {
  function showStory() {}

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.button}>
          <Button title={'Show Story'} onPress={() => showStory()} />
        </View>
        <RDStoryView
          style={styles.container}
          onItemClicked={(event) => console.log(event)}
          actionId={'459'}
        />
      </ScrollView>
    </SafeAreaView>
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
