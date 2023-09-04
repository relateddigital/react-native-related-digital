import * as React from 'react';
import { SafeAreaView, Button, View, TextInput } from 'react-native';
import {
  StoryView,
  InlineNpsWithNumbersView,
  BannerView,
} from '@relateddigital/react-native-huawei';
import styles from './../Styles';

enum ViewType {
  None,
  Story,
  Nps,
  Banner,
}

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const CustomButton: React.FC<ButtonProps> = ({ title, onPress }) => (
  <View style={styles.button}>
    <Button title={title} onPress={onPress} />
  </View>
);

export function StoryScreen() {
  const [viewType, setViewType] = React.useState<ViewType>(ViewType.None);
  const [actionId, setActionId] = React.useState('310');

  const getContentComponent = () => {
    switch (viewType) {
      case ViewType.Story:
        return (
          <StoryView
            actionId={actionId}
            onClicked={(event) => console.log(event)}
            style={styles.flex1}
          />
        );
      case ViewType.Nps:
        return (
          <InlineNpsWithNumbersView
            properties={{ 'OM.inapptype': 'inapp_nps_with_numbers_inline' }}
            onClicked={(event) => console.log(event)}
            style={styles.flex1}
          />
        );
      case ViewType.Banner:
        return (
          <BannerView
            properties={{ 'OM.inapptype': 'banner_carousel' }}
            onClicked={(event) => console.log(event)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.storyActionIdInput}
        placeholder="Action Id(optional)"
        value={actionId}
        onChangeText={setActionId}
      />
      <CustomButton
        title={'Show Story'}
        onPress={() => setViewType(ViewType.Story)}
      />
      <CustomButton
        title={'Show Inline Nps With Numbers'}
        onPress={() => setViewType(ViewType.Nps)}
      />
      <CustomButton
        title={'Show Banner'}
        onPress={() => setViewType(ViewType.Banner)}
      />

      {viewType !== ViewType.None && (
        <View style={styles.storyBackgroundContainer}>
          {getContentComponent()}
        </View>
      )}
    </SafeAreaView>
  );
}
