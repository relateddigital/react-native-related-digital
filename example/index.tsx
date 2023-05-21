import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

import {
  RelatedDigital,
  RelatedDigitalPushNotificationEmitter,
  onNotificationRegistered,
  onNotificationReceived,
  onNotificationOpened,
} from '@relateddigital/react-native-huawei';

RelatedDigital.initialize(
  '676D325830564761676D453D',
  '356467332F6533766975593D',
  'visistore',
  false // askLocationPermissionAtStart
);

RelatedDigitalPushNotificationEmitter.addListener(
  onNotificationRegistered,
  (token) => {
    console.log(onNotificationRegistered);
    console.log(token);
  }
);

RelatedDigitalPushNotificationEmitter.addListener(
  onNotificationReceived,
  (payload) => {
    console.log(onNotificationReceived);
    console.log(payload);
  }
);

RelatedDigitalPushNotificationEmitter.addListener(
  onNotificationOpened,
  (payload) => {
    console.log(onNotificationOpened);
    console.log(payload);
  }
);

RelatedDigital.registerNotificationListeners();

AppRegistry.registerComponent(appName, () => App);
