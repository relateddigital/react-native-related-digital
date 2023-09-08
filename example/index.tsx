import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

import {
  RDEventType,
  RelatedDigital,
} from '@relateddigital/react-native-huawei';

RelatedDigital.addListener(
  RDEventType.NotificationRegistered,
  async (event) => {
    console.log('Push Notification Registered: ' + JSON.stringify(event));
  }
);

RelatedDigital.addListener(RDEventType.NotificationReceived, async (event) => {
  console.log('Push Notification Received: ' + JSON.stringify(event));
});

RelatedDigital.addListener(RDEventType.NotificationOpened, async (event) => {
  console.log('Push Notification Opened: ' + JSON.stringify(event));
});

AppRegistry.registerComponent(appName, () => App);
