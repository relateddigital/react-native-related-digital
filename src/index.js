import { NativeModules, NativeEventEmitter } from 'react-native';
export const { RelatedDigital } = NativeModules;
const RelatedDigitalPushNotificationEmitter = new NativeEventEmitter(RelatedDigital);
const onNotificationRegistered = 'onNotificationRegistered';
const onNotificationReceived = 'onNotificationReceived';
const onNotificationOpened = 'onNotificationOpened';
export { RelatedDigitalPushNotificationEmitter, onNotificationRegistered, onNotificationReceived, onNotificationOpened, };
export default RelatedDigital;
