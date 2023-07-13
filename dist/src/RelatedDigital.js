'use strict';
import { NativeModules, Platform } from 'react-native';
import { RDEventEmitter } from './RDEventEmitter';
const RDModule = NativeModules.RelatedDigitalReactModule;
const EventEmitter = new RDEventEmitter();
var InternalEventType;
(function (InternalEventType) {
    InternalEventType["Registration"] = "com.relateddigital.registration";
    InternalEventType["NotificationResponse"] = "com.relateddigital.notification_response";
    InternalEventType["PushReceived"] = "com.relateddigital.push_received";
    InternalEventType["NotificationOptInStatus"] = "com.relateddigital.notification_opt_in_status";
})(InternalEventType || (InternalEventType = {}));
export var EventType;
(function (EventType) {
    /**
     * Notification response event. On Android, this event will be dispatched
     * in the background for background notifications actions.
     */
    EventType["NotificationResponse"] = "notificationResponse";
    /**
     * Push received event. On Android, this event will only be dispatched
     * in the background if the app is able to start a service or by sending a
     * high priority FCM message.
     */
    EventType["PushReceived"] = "pushReceived";
    /**
     * Register event.
     */
    EventType["Register"] = "register";
    /**
     * Registration event.
     */
    EventType["Registration"] = "registration";
    /**
     * Notification opt-in status event.
     */
    EventType["NotificationOptInStatus"] = "notificationOptInStatus";
})(EventType || (EventType = {}));
/**
 * iOS options
 */
export var iOS;
(function (iOS) {
    /**
     * Enum of notification options. iOS only.
     */
    let NotificationOption;
    (function (NotificationOption) {
        NotificationOption["Alert"] = "alert";
        NotificationOption["Sound"] = "sound";
        NotificationOption["Badge"] = "badge";
        NotificationOption["CarPlay"] = "carPlay";
        NotificationOption["CriticalAlert"] = "criticalAlert";
        NotificationOption["ProvidesAppNotificationSettings"] = "providesAppNotificationSettings";
        NotificationOption["Provisional"] = "provisional";
    })(NotificationOption = iOS.NotificationOption || (iOS.NotificationOption = {}));
    /**
     * Enum of foreground notification options.
     */
    let ForegroundPresentationOption;
    (function (ForegroundPresentationOption) {
        ForegroundPresentationOption["Alert"] = "alert";
        ForegroundPresentationOption["Sound"] = "sound";
        ForegroundPresentationOption["Badge"] = "badge";
    })(ForegroundPresentationOption = iOS.ForegroundPresentationOption || (iOS.ForegroundPresentationOption = {}));
    /**
     * Enum of authorized notification settings.
     */
    let AuthorizedNotificationSetting;
    (function (AuthorizedNotificationSetting) {
        /**
         * Alerts.
         */
        AuthorizedNotificationSetting["Alert"] = "alert";
        /**
         * Sounds.
         */
        AuthorizedNotificationSetting["Sound"] = "sound";
        /**
         * Badges.
         */
        AuthorizedNotificationSetting["Badge"] = "badge";
        /**
         * CarPlay.
         */
        AuthorizedNotificationSetting["CarPlay"] = "carPlay";
        /**
         * Lock screen.
         */
        AuthorizedNotificationSetting["LockScreen"] = "lockScreen";
        /**
         * Notification center.
         */
        AuthorizedNotificationSetting["NotificationCenter"] = "notificationCenter";
        /**
         * Critical alert.
         */
        AuthorizedNotificationSetting["CriticalAlert"] = "criticalAlert";
        /**
         * Announcement.
         */
        AuthorizedNotificationSetting["Announcement"] = "announcement";
        /**
         * Scheduled delivery.
         */
        AuthorizedNotificationSetting["ScheduledDelivery"] = "scheduledDelivery";
        /**
         * Time sensitive.
         */
        AuthorizedNotificationSetting["TimeSensitive"] = "timeSensitive";
    })(AuthorizedNotificationSetting = iOS.AuthorizedNotificationSetting || (iOS.AuthorizedNotificationSetting = {}));
    let AuthorizedNotificationStatus;
    (function (AuthorizedNotificationStatus) {
        AuthorizedNotificationStatus["NotDetermined"] = "notDetermined";
        AuthorizedNotificationStatus["Denied"] = "denied";
        AuthorizedNotificationStatus["Authorized"] = "authorized";
        AuthorizedNotificationStatus["Provisional"] = "provisional";
        AuthorizedNotificationStatus["Ephemeral"] = "ephemeral";
    })(AuthorizedNotificationStatus = iOS.AuthorizedNotificationStatus || (iOS.AuthorizedNotificationStatus = {}));
})(iOS || (iOS = {}));
/**
 * A listener subscription.
 */
export class Subscription {
    onRemove;
    constructor(onRemove) {
        this.onRemove = onRemove;
    }
    /**
     * Removes the listener.
     */
    remove() {
        this.onRemove();
    }
}
/**
 * Converts between public and internal event types.
 * @hidden
 */
function convertEventEnum(type) {
    if (type === EventType.NotificationResponse) {
        return InternalEventType.NotificationResponse;
    }
    else if (type === EventType.PushReceived) {
        return InternalEventType.PushReceived;
    }
    else if (type === EventType.Register || type === EventType.Registration) {
        return InternalEventType.Registration;
    }
    else if (type == EventType.NotificationOptInStatus) {
        return InternalEventType.NotificationOptInStatus;
    }
    throw new Error('Invalid event name: ' + type);
}
function convertFeatureEnum(feature) {
    if (feature == 'FEATURE_NONE') {
        return Feature.FEATURE_NONE;
    }
    else if (feature == 'FEATURE_IN_APP_AUTOMATION') {
        return Feature.FEATURE_IN_APP_AUTOMATION;
    }
    else if (feature == 'FEATURE_PUSH') {
        return Feature.FEATURE_PUSH;
    }
    else if (feature == 'FEATURE_ANALYTICS') {
        return Feature.FEATURE_ANALYTICS;
    }
    else if (feature == 'FEATURE_LOCATION') {
        return Feature.FEATURE_LOCATION;
    }
    else if (feature == 'FEATURE_ALL') {
        return Feature.FEATURE_ALL;
    }
    throw new Error('Invalid feature name: ' + feature);
}
/**
 * Enum of authorized Features.
 */
export var Feature;
(function (Feature) {
    Feature["FEATURE_NONE"] = "FEATURE_NONE";
    Feature["FEATURE_IN_APP_AUTOMATION"] = "FEATURE_IN_APP_AUTOMATION";
    Feature["FEATURE_PUSH"] = "FEATURE_PUSH";
    Feature["FEATURE_ANALYTICS"] = "FEATURE_ANALYTICS";
    Feature["FEATURE_LOCATION"] = "FEATURE_LOCATION";
    Feature["FEATURE_ALL"] = "FEATURE_ALL";
})(Feature || (Feature = {}));
/**
 * The main RelatedDigital API.
 */
export class RelatedDigital {
    static setIsInAppNotificationEnabled(isInAppNotificationEnabled) {
        RDModule.setIsInAppNotificationEnabled(isInAppNotificationEnabled);
    }
    static setIsGeofenceEnabled(isGeofenceEnabled) {
        RDModule.setIsGeofenceEnabled(isGeofenceEnabled);
    }
    static setAdvertisingIdentifier(advertisingIdentifier) {
        RDModule.setAdvertisingIdentifier(advertisingIdentifier);
    }
    static signUp(exVisitorId, properties) {
        RDModule.signUp(exVisitorId, properties);
    }
    static login(exVisitorId, properties) {
        RDModule.login(exVisitorId, properties);
    }
    static logout() {
        RDModule.logout();
    }
    static customEvent(pageName, parameters) {
        RDModule.customEvent(pageName, parameters);
    }
    static askForPushNotificationPermission() {
        RDModule.askForPushNotificationPermission();
    }
    static setIsPushNotificationEnabled(isPushNotificationEnabled, iosAppAlias, googleAppAlias, huaweiAppAlias, deliveredBadge) {
        RDModule.setIsPushNotificationEnabled(isPushNotificationEnabled, iosAppAlias, googleAppAlias, huaweiAppAlias, deliveredBadge);
    }
    static setEmail(email, permission) {
        RDModule.setEmail(email, permission);
    }
    static sendCampaignParameters(parameters) {
        RDModule.sendCampaignParameters(parameters);
    }
    static setTwitterId(twitterId) {
        RDModule.setTwitterId(twitterId);
    }
    static setFacebookId(facebookId) {
        RDModule.setFacebookId(facebookId);
    }
    static setRelatedDigitalUserId(relatedDigitalUserId) {
        RDModule.setRelatedDigitalUserId(relatedDigitalUserId);
    }
    static setNotificationLoginId(notificationLoginId) {
        RDModule.setNotificationLoginId(notificationLoginId);
    }
    static setPhoneNumber(msisdn, permission) {
        RDModule.setPhoneNumber(msisdn, permission);
    }
    static setUserProperty(key, value) {
        RDModule.setUserProperty(key, value);
    }
    static removeUserProperty(key) {
        RDModule.removeUserProperty(key);
    }
    static registerEmail(email, permission, isCommercial) {
        return RDModule.registerEmail(email, permission, isCommercial);
    }
    static getPushMessages() {
        return RDModule.getPushMessages();
    }
    static getToken() {
        return RDModule.getToken();
    }
    //TODO: kaldırılabilir
    static registerNotificationListeners() {
        RDModule.registerNotificationListeners();
    }
    /**
     * Checks if RelatedDigital is initialized.
     *
     * @return A promise with the result. The result will be true if RelatedDigital is initialized, otherwise false.
     */
    static isFlying() {
        return RDModule.isFlying();
    }
    /**
     * Sets the Android notification config. Values not set will fallback to any values set in the relateddigital config options.
     *
     * @param config The notification config object.
     */
    static setAndroidNotificationConfig(config) {
        RDModule.setAndroidNotificationConfig(config);
    }
    /**
     * Sets user notifications enabled. The first time user notifications are enabled
     * on iOS, it will prompt the user for notification permissions.
     *
     * @param enabled true to enable notifications, false to disable.
     */
    static setUserNotificationsEnabled(enabled) {
        RDModule.setUserNotificationsEnabled(enabled);
    }
    /**
     * Checks if user notifications are enabled or not.
     *
     * @return A promise with the result.
     */
    static isUserNotificationsEnabled() {
        return RDModule.isUserNotificationsEnabled();
    }
    /**
     * Sets the SDK features that will be enabled. The rest of the features will be disabled.
     *
     * If all features are disabled the SDK will not make any network requests or collect data.
     *
     * @note All features are enabled by default.
     * @param feature An array of `Features` to enable.
     * @return A promise that returns true if the enablement was authorized.
     */
    static setEnabledFeatures(features) {
        return RDModule.setEnabledFeatures(features);
    }
    /**
     * Gets a Feature array with the enabled features.
     *
     * @return A promise that returns the enabled features as a Feature array.
     */
    static getEnabledFeatures() {
        return new Promise((resolve, reject) => {
            RDModule.getEnabledFeatures().then((features) => {
                let convertedFeatures = new Array();
                for (const feature of features) {
                    convertedFeatures.push(convertFeatureEnum(feature));
                }
                resolve(convertedFeatures);
            }),
                (error) => {
                    reject(error);
                };
        });
    }
    /**
     * Enables one or many features.
     *
     * @param feature An array of `Feature` to enable.
     * @return A promise that returns true if the enablement was authorized.
     */
    static enableFeature(features) {
        return RDModule.enableFeature(features);
    }
    /**
     * Disables one or many features.
     *
     * @param feature An array of `Feature` to disable.
     * @return A promise that returns true if the disablement was authorized.
     */
    static disableFeature(features) {
        return RDModule.disableFeature(features);
    }
    /**
     * Checks if a given feature is enabled or not.
     *
     * @return A promise that returns true if the features are enabled, false otherwise.
     */
    static isFeatureEnabled(features) {
        return RDModule.isFeatureEnabled(features);
    }
    /**
     * Enables user notifications.
     *
     * @return A promise that returns true if enablement was authorized
     * or false if enablement was rejected
     */
    static enableUserPushNotifications() {
        return RDModule.enableUserPushNotifications();
    }
    /**
     * Enables channel creation if `channelCreationDelayEnabled` was
     * enabled in the config.
     */
    static enableChannelCreation() {
        RDModule.enableChannelCreation();
    }
    /**
     * Gets the count of Unread messages in the inbox.
     */
    static getUnreadMessageCount() {
        return RDModule.getUnreadMessagesCount();
    }
    /**
     * Checks if app notifications are enabled or not. Its possible to have `userNotificationsEnabled`
     * but app notifications being disabled if the user opted out of notifications.
     *
     * @return A promise with the result.
     * @deprecated Use getNotificationStatus() instead.
     */
    static isUserNotificationsOptedIn() {
        return RDModule.isUserNotificationsOptedIn();
    }
    /**
     * Checks if app notifications are enabled at a system level or not. Its possible to have `userNotificationsEnabled`
     * but app notifications being disabled if the user opted out of notifications.
     *
     * @return A promise with the result.
     * @deprecated Use getNotificationStatus() instead.
     */
    static isSystemNotificationsEnabledForApp() {
        return RDModule.isSystemNotificationsEnabledForApp();
    }
    /**
     * Gets the notification status for the app.
     *
     * @return A promise with the result.
     */
    static getNotificationStatus() {
        return RDModule.getNotificationStatus();
    }
    /**
     * Gets the status of the specified Notification Channel.
     * This method is only supported on Android. iOS will throw an error.
     *
     * @param channel The channel's name.
     * @return A promise with the result.
     */
    static getNotificationChannelStatus(channel) {
        if (Platform.OS != 'android') {
            throw new Error('This method is only supported on Android devices.');
        }
        return RDModule.getNotificationChannelStatus(channel);
    }
    /**
     * Sets the named user.
     *
     * @param namedUser The named user string, or null/undefined to clear the named user.
     */
    static setNamedUser(namedUser) {
        RDModule.setNamedUser(namedUser);
    }
    /**
     * Gets the named user.
     *
     * @return A promise with the result.
     */
    static getNamedUser() {
        return RDModule.getNamedUser();
    }
    /**
     * Adds a channel tag.
     *
     * @param tag A channel tag.
     */
    static addTag(tag) {
        RDModule.addTag(tag);
    }
    /**
     * Enables or disables analytics.
     *
     * Disabling analytics will delete any locally stored events
     * and prevent any events from uploading. Features that depend on analytics being
     * enabled may not work properly if it's disabled (reports, region triggers,
     * location segmentation, push to local time).
     *
     * @param enabled true to enable notifications, false to disable.
     */
    static setAnalyticsEnabled(enabled) {
        RDModule.setAnalyticsEnabled(enabled);
    }
    /**
     * Checks if analytics is enabled or not.
     *
     * @return A promise with the result.
     */
    static isAnalyticsEnabled() {
        return RDModule.isAnalyticsEnabled();
    }
    /**
     * Initiates screen tracking for a specific app screen, must be called once per tracked screen.
     *
     * @param screen The screen's string identifier
     */
    static trackScreen(screen) {
        RDModule.trackScreen(screen);
    }
    /**
     * Gets the channel ID.
     *
     * @return A promise with the result.
     */
    static getChannelId() {
        return RDModule.getChannelId();
    }
    /**
     * Gets the registration token.
     *
     * @return A promise with the result. The registration token might be undefined
     * if registration is currently in progress, if the app is not setup properly
     * for remote notifications, if running on an iOS simulator, or if running on
     * an Android device that has an outdated or missing version of Google Play Services.
     */
    static getRegistrationToken() {
        return RDModule.getRegistrationToken();
    }
    /**
     * Associates an identifier for the Connect data stream.
     *
     * @param key The identifier's key.
     * @param id The identifier's id, or null/undefined to clear.
     */
    static associateIdentifier(key, id) {
        RDModule.associateIdentifier(key, id);
    }
    /**
     * Runs an RelatedDigital action.
     *
     * @param name The name of the action.
     * @param value The action's value.
     * @return A promise that returns the action result if the action
     * successfully runs, or the Error if the action was unable to be run.
     */
    static runAction(name, value) {
        return RDModule.runAction(name, value);
    }
    /**
     * Sets the foreground presentation options for iOS.
     * This method is only supported on iOS. Android will no-op.
     *
     * @param options The array of foreground presentation options.
     */
    static setForegroundPresentationOptions(options) {
        if (Platform.OS == 'ios') {
            if (Array.isArray(options)) {
                return RDModule.setForegroundPresentationOptions(options);
            }
            else {
                var converted = [];
                if (options.alert) {
                    converted.push(iOS.ForegroundPresentationOption.Alert);
                }
                if (options.badge) {
                    converted.push(iOS.ForegroundPresentationOption.Badge);
                }
                if (options.sound) {
                    converted.push(iOS.ForegroundPresentationOption.Sound);
                }
                return RDModule.setForegroundPresentationOptions(converted);
            }
        }
    }
    /**
     * Sets the notification options for iOS.
     * This method is only supported on iOS. Android will no-op.
     *
     * @param options The array of notification options.
     */
    static setNotificationOptions(options) {
        if (Platform.OS == 'ios') {
            return RDModule.setNotificationOptions(options);
        }
    }
    /**
     * Adds a listener for an RelatedDigital event.
     *
     * @param eventType The event type. Either EventType.NotificationResponse, EventType.PushReceived,
     * EventType.Register, EventType.Registration, EventType.NotificationOptInStatus,
     * @param listener The event listener.
     * @return A subscription.
     */
    static addListener(eventType, listener) {
        EventEmitter.addListener(convertEventEnum(eventType), listener);
        return new Subscription(() => {
            RelatedDigital.removeListener(eventType, listener);
        });
    }
    /**
     * Removes a listener for an RelatedDigital event.
     *
     * @param eventType The event type. Either EventType.NotificationResponse, EventType.PushReceived,
     * EventType.Register, EventType.Registration, EventType.NotificationOptInStatus,
     * EventType.InboxUpdated, or EventType.ShowInbox.
     * @param listener The event listener. Should be a reference to the function passed into addListener.
     */
    static removeListener(eventType, listener) {
        EventEmitter.removeListener(convertEventEnum(eventType), listener);
    }
    /**
     * Removes all listeners for Urban RelatedDigital events.
     *
     * @param eventType The event type. Either EventType.NotificationResponse, EventType.PushReceived,
     * EventType.Register, EventType.Registration, EventType.NotificationOptInStatus,
     * EventType.InboxUpdated, or EventType.ShowInbox.
     */
    static removeAllListeners(eventType) {
        EventEmitter.removeAllListeners(convertEventEnum(eventType));
    }
    /**
     * Enables or disables autobadging on iOS. Badging is not supported for Android.
     *
     * @param enabled Whether or not to enable autobadging.
     */
    static setAutobadgeEnabled(enabled) {
        if (Platform.OS == 'ios') {
            RDModule.setAutobadgeEnabled(enabled);
        }
        else {
            console.log('This feature is not supported on this platform.');
        }
    }
    /**
     * Checks to see if autobadging on iOS is enabled. Badging is not supported for Android.
     *
     * @return A promise with the result, either true or false.
     */
    static isAutobadgeEnabled() {
        if (Platform.OS == 'ios') {
            return RDModule.isAutobadgeEnabled();
        }
        else {
            console.log('This feature is not supported on this platform.');
            return new Promise((resolve) => resolve(false));
        }
    }
    /**
     * Sets the badge number for iOS. Badging is not supported for Android.
     *
     * @param badgeNumber The badge number.
     */
    static setBadgeNumber(badgeNumber) {
        if (Platform.OS == 'ios') {
            RDModule.setBadgeNumber(badgeNumber);
        }
        else {
            console.log('This feature is not supported on this platform.');
        }
    }
    /**
     * Gets the current badge number for iOS. Badging is not supported for Android
     * and this method will always return 0.
     *
     * @return A promise with the result.
     */
    static getBadgeNumber() {
        if (Platform.OS != 'ios') {
            console.log('This feature is not supported on this platform.');
        }
        return RDModule.getBadgeNumber();
    }
    /**
     * Displays the default message center.
     */
    static displayMessageCenter() {
        RDModule.displayMessageCenter();
    }
    /**
     * Dismisses the default message center.
     */
    static dismissMessageCenter() {
        RDModule.dismissMessageCenter();
    }
    /**
     * Displays an inbox message.
     *
     * @param messageId The id of the message to be displayed.
     * @return A promise with the result.
     */
    static displayMessage(messageId) {
        return RDModule.displayMessage(messageId);
    }
    /**
     * Dismisses the currently displayed inbox message.
     */
    static dismissMessage() {
        RDModule.dismissMessage();
    }
    /**
     * Forces the inbox to refresh. This is normally not needed as the inbox will
     * automatically refresh on foreground or when a push arrives that's associated
     * with a message.
     *
     * @return{Promise.<boolean>} A promise with the result.
     */
    static refreshInbox() {
        return RDModule.refreshInbox();
    }
    /**
     * Sets the default behavior when the message center is launched from a push
     * notification. If set to false the message center must be manually launched.
     *
     * @param enabled true to automatically launch the default message center, false to disable.
     */
    static setAutoLaunchDefaultMessageCenter(enabled) {
        RDModule.setAutoLaunchDefaultMessageCenter(enabled);
    }
    /**
     * Overriding the locale.
     *
     * @param localeIdentifier The locale identifier.
     */
    static setCurrentLocale(localeIdentifier) {
        RDModule.setCurrentLocale(localeIdentifier);
    }
    /**
     * Getting the locale currently used by RelatedDigital.
     *
     */
    static getCurrentLocale() {
        return RDModule.getCurrentLocale();
    }
    /**
     * Resets the current locale.
     *
     */
    static clearLocale() {
        RDModule.clearLocale();
    }
    /**
     * Gets all the active notifications for the application.
     * Supported on Android Marshmallow (23)+ and iOS 10+.
     *
     * @return A promise with the result.
     */
    static getActiveNotifications() {
        return RDModule.getActiveNotifications();
    }
    /**
     * Clears all notifications for the application.
     * Supported on Android and iOS 10+. For older iOS devices, you can set
     * the badge number to 0 to clear notifications.
     */
    static clearNotifications() {
        RDModule.clearNotifications();
    }
    /**
     * Clears a specific notification.
     * Supported on Android and iOS 10+.
     *
     * @param identifier The notification identifier. The identifier will be
     * available in the PushReceived event and in the active notification response
     * under the "notificationId" field.
     */
    static clearNotification(identifier) {
        RDModule.clearNotification(identifier);
    }
    /**
     * Sets the in-app message display interval on the default display coordinator.
     *
     * @param seconds The minimum number of seconds between message displays.
     */
    static setInAppAutomationDisplayInterval(seconds) {
        RDModule.setInAppAutomationDisplayInterval(seconds);
    }
}
