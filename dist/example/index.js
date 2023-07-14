import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { RelatedDigital, EventType } from '@relateddigital/react-native-huawei';
RelatedDigital.addListener(EventType.NotificationRegistered, async (event) => {
    console.log('Push Notification Registered: ' + JSON.stringify(event));
});
RelatedDigital.addListener(EventType.NotificationReceived, async (event) => {
    console.log('Push Notification Received: ' + JSON.stringify(event));
});
RelatedDigital.addListener(EventType.NotificationOpened, async (event) => {
    console.log('Push Notification Opened: ' + JSON.stringify(event));
});
AppRegistry.registerComponent(appName, () => App);
