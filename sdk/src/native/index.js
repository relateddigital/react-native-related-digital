import { NativeModules, NativeEventEmitter, requireNativeComponent } from 'react-native'

const RelatedDigitalPushModule = NativeModules.RelatedDigitalPushModule
const RelatedDigitalPushNotificationEmitter = new NativeEventEmitter(RelatedDigitalPushModule)

const DEVICE_NOTIF_EVENT = 'remoteNotificationReceived';
const NOTIF_REGISTER_EVENT = 'remoteNotificationsRegistered';
const NOTIF_REGISTRATION_ERROR_EVENT = 'remoteNotificationRegistrationError';
const CAROUSEL_ITEM_CLICKED_EVENT = 'carouselItemClicked'; // android only
const ACTION_BUTTON_CLICKED_EVENT = 'ActionButtonClicked';

const getDeviceParameters = RelatedDigitalPushModule.getDeviceParameters
const customEventNative = RelatedDigitalPushModule.customEvent
const logoutNative = RelatedDigitalPushModule.logout
const getRecommendationsNative = RelatedDigitalPushModule.getRecommendations
const trackRecommendationClickNative = RelatedDigitalPushModule.trackRecommendationClick
const searchRecommendationNative = RelatedDigitalPushModule.searchRecommendation
const trackSearchRecommendationClickNative = RelatedDigitalPushModule.trackSearchRecommendationClick
const getStoriesNative = RelatedDigitalPushModule.getStories
const checkNotificationNative = RelatedDigitalPushModule.checkNotification
const getFavoriteAttributeActionsNative = RelatedDigitalPushModule.getFavoriteAttributeActions
const sendTheListOfAppsInstalledNative = RelatedDigitalPushModule.sendTheListOfAppsInstalled
const sendLocationPermissionNative = RelatedDigitalPushModule.sendLocationPermission
const getPushMessagesNative = RelatedDigitalPushModule.getPushMessages
const getPushMessagesWithIDNative = RelatedDigitalPushModule.getPushMessagesWithID
const readPushMessagesNative = RelatedDigitalPushModule.readPushMessages
const readPushMessagesWithIdNative = RelatedDigitalPushModule.readPushMessagesWithId
const deletePushNotificationNative = RelatedDigitalPushModule.deletePushNotification
const deleteAllPushNotificationsNative = RelatedDigitalPushModule.deleteAllPushNotifications
const deletePushMessagesNative = RelatedDigitalPushModule.deletePushMessages
const deletePushMessagesWithIdNative = RelatedDigitalPushModule.deletePushMessagesWithId
const getUserNative = RelatedDigitalPushModule.getUser
const getSubscriptionNative = RelatedDigitalPushModule.getSubscription
const setUserPropertyNative = RelatedDigitalPushModule.setUserProperty
const setNotificationLoginIdNative = RelatedDigitalPushModule.setNotificationLoginId
const sendLogToGraylogNative = RelatedDigitalPushModule.sendLogToGraylog

const RDStoryViewNative = requireNativeComponent('StoryView')
const RDBannerViewNative = requireNativeComponent('BannerView')

export {
    RelatedDigitalPushModule,
    RelatedDigitalPushNotificationEmitter,

    DEVICE_NOTIF_EVENT,
    NOTIF_REGISTER_EVENT,
    NOTIF_REGISTRATION_ERROR_EVENT,
    CAROUSEL_ITEM_CLICKED_EVENT,
    ACTION_BUTTON_CLICKED_EVENT,

    getDeviceParameters,
    customEventNative,
    logoutNative,
    getRecommendationsNative,
    trackRecommendationClickNative,
    searchRecommendationNative,
    trackSearchRecommendationClickNative,
    RDStoryViewNative,
    RDBannerViewNative,
    getStoriesNative,
    checkNotificationNative,
    getFavoriteAttributeActionsNative,
    sendTheListOfAppsInstalledNative,
    sendLocationPermissionNative,
    getPushMessagesNative,
    getPushMessagesWithIDNative,
    readPushMessagesNative,
    readPushMessagesWithIdNative,
    deletePushNotificationNative,
    deleteAllPushNotificationsNative,
    deletePushMessagesNative,
    deletePushMessagesWithIdNative,
    getUserNative,
    getSubscriptionNative,
    setUserPropertyNative,
    setNotificationLoginIdNative,
    sendLogToGraylogNative
}