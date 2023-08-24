import * as React from 'react';
import { SafeAreaView, Button, View, TextInput } from 'react-native';
import { StoryView } from '@relateddigital/react-native-huawei';
import styles from './../Styles';

export function StoryScreen() {
  const [showingStory, setShowingStory] = React.useState(false);
  const [showingNps, setShowingNps] = React.useState(false);
  const [actionId, setActionId] = React.useState('310');

  function showStory() {
    setShowingStory(false);
    setShowingStory(true);
    setShowingNps(false);
  }

  function showNpsWithNumbers() {
    setShowingNps(false);
    setShowingNps(true);
    setShowingStory(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.storyActionIdInput}
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
            style={styles.flex1}
          />
        </View>
      )}
      {showingNps && (
        <View style={styles.storyBackgroundContainer}>
          <StoryView
            actionId={actionId}
            onItemClicked={(event) => console.log(event)}
            // @ts-ignore
            style={styles.flex1}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
