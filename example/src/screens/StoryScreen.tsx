import * as React from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Button,
  View,
  TextInput,
} from 'react-native';
import { StoryView } from '@relateddigital/react-native-huawei';

export function StoryScreen() {
  const [showingStory, setShowingStory] = React.useState(false);
  const [actionId, setActionId] = React.useState('310');

  function showStory() {
    setShowingStory(true);
  }

  function showNpsWithNumbers() {}

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Action Id(optional)"
          value={actionId}
          onChangeText={setActionId}
        />
        <View style={styles.button}>
          <Button title={'Show Story'} onPress={() => showStory()} />
        </View>
        <View style={styles.button}>
          <Button
            title={'Show Nps With Numbers'}
            onPress={() => showNpsWithNumbers()}
          />
        </View>
        {showingStory && (
          <View style={styles.storyBackgroundContainer}>
            <StoryView
              actionId={actionId}
              onItemClicked={(event) => console.log(event)}
              // @ts-ignore
              style={{ flex: 1 }}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 0,
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
    margin: 16,
  },
  button: {
    marginBottom: 16,
  },
  storyBackgroundContainer: {
    height: 110,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
});
