import * as React from 'react';
import {
  View,
  Button,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { RelatedDigital } from '@relateddigital/react-native-huawei';
import styles from './../Styles';

export function FavoriteAttributeScreen() {
  const [actionId, setActionId] = React.useState('188');
  const getFavoriteAttributeActions = () => {
    RelatedDigital.getFavoriteAttributeActions(actionId).then(
      (favoriteAttributeActionResponse) => {
        console.log(
          'Favorite Attribute Action Response:',
          favoriteAttributeActionResponse
        );
      }
    );
  };

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
          <Button
            title={'Get Favorite Attribute Actions'}
            onPress={() => getFavoriteAttributeActions()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
