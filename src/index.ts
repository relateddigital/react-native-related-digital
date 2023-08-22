'use strict';

export * from './RDBannerView';
export * from './RDStoryView';
export * from './models/RDRecommendation';
export * from './RelatedDigital';

/*

export const { RelatedDigital } = NativeModules;
const RelatedDigitalPushNotificationEmitter = new NativeEventEmitter(
  RelatedDigital
);

const onNotificationRegistered = 'onNotificationRegistered';
const onNotificationReceived = 'onNotificationReceived';
const onNotificationOpened = 'onNotificationOpened';

export {
  RelatedDigitalPushNotificationEmitter,
  onNotificationRegistered,
  onNotificationReceived,
  onNotificationOpened,
};

export * from './RDStoryView';
export default RelatedDigital as RelatedDigitalType;
 */
