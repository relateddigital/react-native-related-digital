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

export function RecommendationScreen() {
  const [zoneId, setZoneId] = React.useState('1');
  const [productCode, setProductCode] = React.useState('');
  const recommend = () => {
    console.log('Zone Id:', zoneId);
    console.log('Product Code:', productCode);
    RelatedDigital.recommend(zoneId, productCode, [], {}).then(
      (rdRecommendationResponse) => {
        console.log('Recommendation Response:', rdRecommendationResponse);
      }
    );
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Zone Id(required)"
          value={zoneId}
          onChangeText={setZoneId}
        />
        <TextInput
          style={styles.input}
          placeholder="Product Code(optional)"
          value={productCode}
          onChangeText={setProductCode}
        />
        <View style={styles.button}>
          <Button title={'Recommend'} onPress={() => recommend()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
