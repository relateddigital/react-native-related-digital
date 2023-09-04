import * as React from 'react';
import { SafeAreaView, Button, View, TextInput } from 'react-native';
import {
  StoryView,
  InlineNpsWithNumbersView,
} from '@relateddigital/react-native-huawei';
import styles from './../Styles';

enum ViewType {
  Story,
  Nps,
}

export function StoryScreen() {
  const [showingStory, setShowingStory] = React.useState(false);
  const [showingNps, setShowingNps] = React.useState(false);
  const [actionId, setActionId] = React.useState('310');

  function show(viewType: ViewType) {
    setShowingStory(false);
    setShowingNps(false);
    viewType === ViewType.Story ? setShowingStory(true) : setShowingNps(true);
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
        <Button title={'Show Story'} onPress={() => show(ViewType.Story)} />
      </View>
      <View style={styles.button}>
        <Button
          title={'Show Nps With Numbers'}
          onPress={() => show(ViewType.Nps)}
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
          <InlineNpsWithNumbersView
            properties={{ 'OM.inapptype': 'inapp_nps_with_numbers_inline' }}
            npsItemClicked={(event) => console.log(event)}
            // @ts-ignore
            style={styles.flex1}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
