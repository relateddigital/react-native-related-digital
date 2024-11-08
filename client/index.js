/**
 * @format
 */

import { AppRegistry } from 'react-native';
import Home from './Home';
import { name as appName } from './app.json';
import Root from './Root';

import messaging from '@react-native-firebase/messaging';

messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    // Gelen bildirimi işleyin
    console.log('Bildirim arka planda alındı:', remoteMessage);
    return; // Bildirimi Firebase tarafından işlenmesini engeller
  });

async function onMessageReceived(message) {
    console.log('Bildirim alındı:', message);
}

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);


console.log("listenerler okey");

AppRegistry.registerComponent(appName, () => Root);
