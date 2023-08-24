import * as React from 'react';
import { View, Button, ScrollView, SafeAreaView } from 'react-native';
import { RelatedDigital } from '@relateddigital/react-native-huawei';
import { RDInAppNotificationType, getInApps } from '../Helpers';
import styles from './../Styles';

export function TargetingActionScreen() {
  const inAppEvent = (queryStringFilter: string) => {
    let properties: Record<string, string> = {};
    properties['OM.inapptype'] = queryStringFilter;
    if (
      queryStringFilter.toLowerCase() ===
      RDInAppNotificationType.productStatNotifier.toLowerCase()
    ) {
      properties['OM.pv'] = 'CV7933-837-837';
    }
    RelatedDigital.customEvent('InAppTest', properties);
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {Object.entries(getInApps()).map(
          ([notificationType, inAppType], index) =>
            Object.entries(inAppType).map(
              ([queryStringFilter, actionId], subIndex) => (
                <View style={styles.button} key={`${index}-${subIndex}`}>
                  <Button
                    title={`TYPE: ${notificationType} \n QUERY: ${queryStringFilter} \n ACTION ID: ${actionId}`}
                    onPress={() => inAppEvent(queryStringFilter)}
                  />
                </View>
              )
            )
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
