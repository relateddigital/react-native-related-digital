import { NativeModules, NativeEventEmitter, requireNativeComponent } from 'react-native'

const RelatedDigitalPushModule = NativeModules.RelatedDigitalPushModule
const RelatedDigitalPushNotificationEmitter = new NativeEventEmitter(RelatedDigitalPushModule)

const DEVICE_NOTIF_EVENT = 'remoteNotificationReceived';
const NOTIF_REGISTER_EVENT = 'remoteNotificationsRegistered';
const NOTIF_REGISTRATION_ERROR_EVENT = 'remoteNotificationRegistrationError';

const getDeviceParameters = RelatedDigitalPushModule.getDeviceParameters
const customEventNative = RelatedDigitalPushModule.customEvent
const getRecommendationsNative = RelatedDigitalPushModule.getRecommendations
const getStoriesNative = RelatedDigitalPushModule.getStories
const checkNotificationNative = RelatedDigitalPushModule.checkNotification
const getFavoriteAttributeActionsNative = RelatedDigitalPushModule.getFavoriteAttributeActions
const sendTheListOfAppsInstalledNative = RelatedDigitalPushModule.sendTheListOfAppsInstalled

const RDStoryViewNative = requireNativeComponent('StoryView')

export {
    RelatedDigitalPushModule,
    RelatedDigitalPushNotificationEmitter,

    DEVICE_NOTIF_EVENT,
    NOTIF_REGISTER_EVENT,
    NOTIF_REGISTRATION_ERROR_EVENT,

    getDeviceParameters,
    customEventNative,
    getRecommendationsNative,
    RDStoryViewNative,
    getStoriesNative,
    checkNotificationNative,
    getFavoriteAttributeActionsNative,
    sendTheListOfAppsInstalledNative
}