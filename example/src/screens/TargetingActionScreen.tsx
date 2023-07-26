import * as React from 'react';
import {
  StyleSheet,
  View,
  Button,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { RelatedDigital } from '@relateddigital/react-native-huawei';
import { RDInAppNotificationType, getInApps } from '../Helpers';

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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
  },
});
