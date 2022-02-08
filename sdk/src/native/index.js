import { NativeModules, NativeEventEmitter, requireNativeComponent } from 'react-native'

const RelatedDigitalPushModule = NativeModules.RelatedDigitalPushModule
const RelatedDigitalPushNotificationEmitter = new NativeEventEmitter(RelatedDigitalPushModule)

const DEVICE_NOTIF_EVENT = 'remoteNotificationReceived';
const NOTIF_REGISTER_EVENT = 'remoteNotificationsRegistered';
const NOTIF_REGISTRATION_ERROR_EVENT = 'remoteNotificationRegistrationError';
const CAROUSEL_ITEM_CLICKED_EVENT = 'carouselItemClicked'; // android only

const getDeviceParameters = RelatedDigitalPushModule.getDeviceParameters
const customEventNative = RelatedDigitalPushModule.customEvent
const getRecommendationsNative = RelatedDigitalPushModule.getRecommendations
const trackRecommendationClickNative = RelatedDigitalPushModule.trackRecommendationClick
const getStoriesNative = RelatedDigitalPushModule.getStories
const checkNotificationNative = RelatedDigitalPushModule.checkNotification
const getFavoriteAttributeActionsNative = RelatedDigitalPushModule.getFavoriteAttributeActions
const sendTheListOfAppsInstalledNative = RelatedDigitalPushModule.sendTheListOfAppsInstalled
const sendLocationPermissionNative = RelatedDigitalPushModule.sendLocationPermission
const getPushMessagesNative = RelatedDigitalPushModule.getPushMessages

const RDStoryViewNative = requireNativeComponent('StoryView')

export {
    RelatedDigitalPushModule,
    RelatedDigitalPushNotificationEmitter,

    DEVICE_NOTIF_EVENT,
    NOTIF_REGISTER_EVENT,
    NOTIF_REGISTRATION_ERROR_EVENT,
    CAROUSEL_ITEM_CLICKED_EVENT,

    getDeviceParameters,
    customEventNative,
    getRecommendationsNative,
    trackRecommendationClickNative,
    RDStoryViewNative,
    getStoriesNative,
    checkNotificationNative,
    getFavoriteAttributeActionsNative,
    sendTheListOfAppsInstalledNative,
    sendLocationPermissionNative,
    getPushMessagesNative
}