'use strict';

import { NativeModules, Platform } from 'react-native';
import { RDEventEmitter } from './RDEventEmitter';
import type { JsonObject, JsonValue } from './Json';

export type Dictionary = Record<string, string>;

const RDModule = NativeModules.RelatedDigitalReactModule;

const EventEmitter = new RDEventEmitter();

enum InternalEventType {
  Registration = 'com.relateddigital.registration',
  NotificationResponse = 'com.relateddigital.notification_response',
  PushReceived = 'com.relateddigital.push_received',
  NotificationOptInStatus = 'com.relateddigital.notification_opt_in_status',
}

export enum EventType {
  /**
   * Notification response event. On Android, this event will be dispatched
   * in the background for background notifications actions.
   */
  NotificationResponse = 'notificationResponse',
  /**
   * Push received event. On Android, this event will only be dispatched
   * in the background if the app is able to start a service or by sending a
   * high priority FCM message.
   */
  PushReceived = 'pushReceived',
  /**
   * Register event.
   */
  Register = 'register',
  /**
   * Registration event.
   */
  Registration = 'registration',
  /**
   * Notification opt-in status event.
   */
  NotificationOptInStatus = 'notificationOptInStatus',
}

export interface PushReceivedEvent {
  /**
   * The alert.
   */
  alert?: string;
  /**
   * The title.
   */
  title?: string;
  /**
   * The notification ID.
   */
  notificationId: string;
  /**
   * The notification extras.
   */
  extras: JsonObject;
}

export interface NotificationResponseEvent {
  /**
   * The push notification.
   */
  notification: PushReceivedEvent;
  /**
   * The action button ID, if available.
   */
  actionId?: string;
  /**
   * Indicates whether the response was a foreground action.
   * This value is always if the user taps the main notification,
   * otherwise it is defined by the notification action button.
   */
  isForeground: boolean;
}

/**
 * RelatedDigital config environment
 */
export interface ConfigEnvironment {
  /**
   * App key.
   */
  appKey: string;

  /**
   * App secret.
   */
  appSecret: string;

  /**
   * Optional log level.
   */
  logLevel?: LogLevel;
}

/**
 * Log levels.
 */
export type LogLevel =
  | 'verbose'
  | 'debug'
  | 'info'
  | 'warning'
  | 'error'
  | 'none';

/**
 * RelatedDigital config
 */
export interface RelatedDigitalConfig {
  /**
   * Default environment.
   */
  default?: ConfigEnvironment;

  /**
   * Development environment. Overrides default environment if inProduction is false.
   */
  development?: ConfigEnvironment;

  /**
   * Production environment. Overrides default environment if inProduction is true.
   */
  production?: ConfigEnvironment;

  /**
   * Switches the environment from development or production. If the value is not
   * set, RelatedDigital will determine the value at runtime.
   */
  inProduction?: boolean;

  /**
   * URL allow list.
   */
  urlAllowList?: string[];

  /**
   * URL allow list for open URL scope.
   */
  urlAllowListScopeOpenUrl?: string[];

  /**
   * URL allow list for JS bridge injection.
   */
  urlAllowListScopeJavaScriptInterface?: string[];

  /**
   * Enables channel capture feature.
   * This config is enabled by default.
   */
  isChannelCaptureEnabled?: boolean;

  /**
   * Whether to suppress console error messages about missing allow list entries during takeOff.
   * This config is disabled by default.
   */
  suppressAllowListError?: boolean;

  /**
   * Enables delayed channel creation.
   */
  isChannelCreationDelayEnabled?: boolean;

  /**
   * Initial config URL for custom RelatedDigital domains. The URL
   * should also be added to the urlAllowList.
   */
  initialConfigUrl?: String;

  /**
   * Enables/disables requiring initial remote config fetch before
   * creating a channel.
   * @deprecated This config is enabled by default.
   */
  requireInitialRemoteConfigEnabled?: boolean;

  /**
   * Enabled features. Defaults to all.
   */
  enabledFeatures?: Feature[];

  /**
   * iOS config.
   */
  ios?: {
    /**
     * itunesId for rate app and app store deep links.
     */
    itunesId?: string;
  };

  /**
   * Android config.
   */
  android?: {
    /**
     * App store URI
     */
    appStoreUri?: string;

    /**
     * Fcm app name if using multiple FCM projects.
     */
    fcmFirebaseAppName?: string;

    /**
     * Notification config.
     */
    notificationConfig?: NotificationConfigAndroid;
  };
}

/**
 * iOS options
 */
export namespace iOS {
  /**
   * Enum of notification options. iOS only.
   */
  export enum NotificationOption {
    Alert = 'alert',
    Sound = 'sound',
    Badge = 'badge',
    CarPlay = 'carPlay',
    CriticalAlert = 'criticalAlert',
    ProvidesAppNotificationSettings = 'providesAppNotificationSettings',
    Provisional = 'provisional',
  }

  /**
   * Enum of foreground notification options.
   */
  export enum ForegroundPresentationOption {
    Alert = 'alert',
    Sound = 'sound',
    Badge = 'badge',
  }

  /**
   * Enum of authorized notification settings.
   */
  export enum AuthorizedNotificationSetting {
    /**
     * Alerts.
     */
    Alert = 'alert',
    /**
     * Sounds.
     */
    Sound = 'sound',
    /**
     * Badges.
     */
    Badge = 'badge',
    /**
     * CarPlay.
     */
    CarPlay = 'carPlay',
    /**
     * Lock screen.
     */
    LockScreen = 'lockScreen',
    /**
     * Notification center.
     */
    NotificationCenter = 'notificationCenter',
    /**
     * Critical alert.
     */
    CriticalAlert = 'criticalAlert',
    /**
     * Announcement.
     */
    Announcement = 'announcement',
    /**
     * Scheduled delivery.
     */
    ScheduledDelivery = 'scheduledDelivery',
    /**
     * Time sensitive.
     */
    TimeSensitive = 'timeSensitive',
  }
  export enum AuthorizedNotificationStatus {
    NotDetermined = 'notDetermined',
    Denied = 'denied',
    Authorized = 'authorized',
    Provisional = 'provisional',
    Ephemeral = 'ephemeral',
  }
}

export interface NotificationStatus {
  /**
   * If relateddigital is opted in for push notifications are not.
   */
  rdOptIn: boolean;

  /**
   * If notifications are enabled on RelatedDigital or not.
   */
  rdEnabled: boolean;

  /**
   * If notifications are enabled in the app settings or not.
   */
  systemEnabled: boolean;

  /**
   * iOS status.
   */
  ios?: {
    /**
     * Authorized settings.
     */
    authorizedSettings: [iOS.AuthorizedNotificationSetting];

    /**
     * Authorized status.
     */
    authorizedStatus: iOS.AuthorizedNotificationStatus;
  };
}

/**
 * Enum of notification options. iOS only.
 * @deprecated This enum is poorly named and refers to foreground presentation
 * options instead of notification options. Use iOS.ForegroundPresentationOption instead.
 */
export type NotificationOptionsIOS = iOS.ForegroundPresentationOption;

/**
 * A map of notification options. iOS only.
 * @deprecated Not used.
 */
export type NotificationOptionsMapIOS = {
  [option in iOS.ForegroundPresentationOption]: boolean;
};

/**
 * A map of foreground notification options. iOS only.
 * @deprecated Use iOS.ForegroundPresentationOption[] instead of a map.
 */
export type ForegroundNotificationOptionsIOS = {
  [option in iOS.ForegroundPresentationOption]: boolean | null | undefined;
};

/**
 * Enum of authorized notification settings. iOS only.
 * @deprecated Use iOS.AuthorizedNotificationSetting instead.
 */
export type AuthorizedNotificationSettingsIOS =
  iOS.AuthorizedNotificationSetting;

/**
 * A map of authorized notification settings.
 * @deprecated Use [iOS.AuthorizedNotificationSetting] instead.
 */
export type iOSAuthorizedNotificationSettingsMap = {
  [setting in iOS.AuthorizedNotificationSetting]: boolean;
};

/**
 * Event fired when the notification opt-in status changes.
 */
export interface NotificationOptInStatusEvent {
  /**
   * Whether the user is opted in to notifications.
   */
  optIn: boolean;

  /**
   * The authorized notification settings map. iOS only.
   * @deprecated Use authorizedSettings instead.
   */
  authorizedNotificationSettings?: [AuthorizedNotificationSettingsIOS];

  /**
   * The authorized notification settings. iOS only.
   */
  authorizedSettings?: [iOS.AuthorizedNotificationSetting];
}

/**
 * A listener subscription.
 */
export class Subscription {
  onRemove: () => void;
  constructor(onRemove: () => void) {
    this.onRemove = onRemove;
  }
  /**
   * Removes the listener.
   */
  remove(): void {
    this.onRemove();
  }
}

/**
 * Event fired when a channel registration occurs.
 */
export interface RegistrationEvent {
  /**
   * The channel ID.
   */
  channelId: string;
  /**
   * The registration token. The registration token might be undefined
   * if registration is currently in progress, if the app is not setup properly
   * for remote notifications, if running on an iOS simulator, or if running on
   * an Android device that has an outdated or missing version of Google Play Services.
   */
  registrationToken?: string;
}

/**
 * Converts between public and internal event types.
 * @hidden
 */
function convertEventEnum(type: EventType): string {
  if (type === EventType.NotificationResponse) {
    return InternalEventType.NotificationResponse;
  } else if (type === EventType.PushReceived) {
    return InternalEventType.PushReceived;
  } else if (type === EventType.Register || type === EventType.Registration) {
    return InternalEventType.Registration;
  } else if (type == EventType.NotificationOptInStatus) {
    return InternalEventType.NotificationOptInStatus;
  }

  throw new Error('Invalid event name: ' + type);
}

function convertFeatureEnum(feature: String): Feature {
  if (feature == 'FEATURE_NONE') {
    return Feature.FEATURE_NONE;
  } else if (feature == 'FEATURE_IN_APP_AUTOMATION') {
    return Feature.FEATURE_IN_APP_AUTOMATION;
  } else if (feature == 'FEATURE_PUSH') {
    return Feature.FEATURE_PUSH;
  } else if (feature == 'FEATURE_ANALYTICS') {
    return Feature.FEATURE_ANALYTICS;
  } else if (feature == 'FEATURE_LOCATION') {
    return Feature.FEATURE_LOCATION;
  } else if (feature == 'FEATURE_ALL') {
    return Feature.FEATURE_ALL;
  }

  throw new Error('Invalid feature name: ' + feature);
}

/**
 * Android notification config.
 */
export interface NotificationConfigAndroid {
  /**
   * The icon resource name.
   */
  icon?: string;
  /**
   * The large icon resource name.
   */
  largeIcon?: string;
  /**
   * The default android notification channel ID.
   */
  defaultChannelId?: string;
  /**
   * The accent color. Must be a hex value #AARRGGBB.
   */
  accentColor?: string;
}

/**
 * Enum of authorized Features.
 */
export enum Feature {
  FEATURE_NONE = 'FEATURE_NONE',
  FEATURE_IN_APP_AUTOMATION = 'FEATURE_IN_APP_AUTOMATION',
  FEATURE_PUSH = 'FEATURE_PUSH',
  FEATURE_ANALYTICS = 'FEATURE_ANALYTICS',
  FEATURE_LOCATION = 'FEATURE_LOCATION',
  FEATURE_ALL = 'FEATURE_ALL',
}

/**
 * The main RelatedDigital API.
 */
export class RelatedDigital {
  static setIsInAppNotificationEnabled(
    isInAppNotificationEnabled: boolean
  ): void {
    RDModule.setIsInAppNotificationEnabled(isInAppNotificationEnabled);
  }
  static setIsGeofenceEnabled(isGeofenceEnabled: boolean): void {
    RDModule.setIsGeofenceEnabled(isGeofenceEnabled);
  }
  static setAdvertisingIdentifier(advertisingIdentifier: string): void {
    RDModule.setAdvertisingIdentifier(advertisingIdentifier);
  }
  static signUp(exVisitorId: string, properties: Dictionary): void {
    RDModule.signUp(exVisitorId, properties);
  }
  static login(exVisitorId: string, properties: Dictionary): void {
    RDModule.login(exVisitorId, properties);
  }
  static logout(): void {
    RDModule.logout();
  }
  static customEvent(pageName: string, parameters: Dictionary): void {
    RDModule.customEvent(pageName, parameters);
  }
  static askForPushNotificationPermission(): void {
    RDModule.askForPushNotificationPermission();
  }
  static setIsPushNotificationEnabled(
    isPushNotificationEnabled: boolean,
    iosAppAlias: string,
    googleAppAlias: string,
    huaweiAppAlias: string,
    deliveredBadge: boolean
  ): void {
    RDModule.setIsPushNotificationEnabled(
      isPushNotificationEnabled,
      iosAppAlias,
      googleAppAlias,
      huaweiAppAlias,
      deliveredBadge
    );
  }
  static setEmail(email: string, permission: boolean): void {
    RDModule.setEmail(email, permission);
  }
  static sendCampaignParameters(parameters: object): void {
    RDModule.sendCampaignParameters(parameters);
  }
  static setTwitterId(twitterId: string): void {
    RDModule.setTwitterId(twitterId);
  }
  static setFacebookId(facebookId: string): void {
    RDModule.setFacebookId(facebookId);
  }
  static setRelatedDigitalUserId(relatedDigitalUserId: string): void {
    RDModule.setRelatedDigitalUserId(relatedDigitalUserId);
  }
  static setNotificationLoginId(notificationLoginId: string): void {
    RDModule.setNotificationLoginId(notificationLoginId);
  }
  static setPhoneNumber(msisdn: string, permission: boolean): void {
    RDModule.setPhoneNumber(msisdn, permission);
  }
  static setUserProperty(key: string, value: string): void {
    RDModule.setUserProperty(key, value);
  }
  static removeUserProperty(key: string): void {
    RDModule.removeUserProperty(key);
  }
  static registerEmail(
    email: String,
    permission: Boolean,
    isCommercial: Boolean
  ): Promise<boolean> {
    return RDModule.registerEmail(email, permission, isCommercial);
  }
  static getPushMessages(): Promise<any> {
    return RDModule.getPushMessages();
  }
  static getToken(): Promise<string> {
    return RDModule.getToken();
  }

  /*  //TODO: kaldırılabilir
  static registerNotificationListeners(): void {
    RDModule.registerNotificationListeners();
  }*/

  /**
   * Checks if RelatedDigital is initialized.
   *
   * @return A promise with the result. The result will be true if RelatedDigital is initialized, otherwise false.
   */
  static isFlying(): Promise<boolean> {
    return RDModule.isFlying();
  }

  /**
   * Sets the Android notification config. Values not set will fallback to any values set in the relateddigital config options.
   *
   * @param config The notification config object.
   */
  static setAndroidNotificationConfig(config: NotificationConfigAndroid) {
    RDModule.setAndroidNotificationConfig(config);
  }

  /**
   * Sets user notifications enabled. The first time user notifications are enabled
   * on iOS, it will prompt the user for notification permissions.
   *
   * @param enabled true to enable notifications, false to disable.
   */
  static setUserNotificationsEnabled(enabled: boolean) {
    RDModule.setUserNotificationsEnabled(enabled);
  }

  /**
   * Checks if user notifications are enabled or not.
   *
   * @return A promise with the result.
   */
  static isUserNotificationsEnabled(): Promise<boolean> {
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
  static setEnabledFeatures(features: Feature[]): Promise<boolean> {
    return RDModule.setEnabledFeatures(features);
  }

  /**
   * Gets a Feature array with the enabled features.
   *
   * @return A promise that returns the enabled features as a Feature array.
   */
  static getEnabledFeatures(): Promise<Feature[]> {
    return new Promise((resolve, reject) => {
      RDModule.getEnabledFeatures().then((features: String[]) => {
        let convertedFeatures: Feature[] = new Array();
        for (const feature of features) {
          convertedFeatures.push(convertFeatureEnum(feature));
        }
        resolve(convertedFeatures);
      }),
        (error: Error) => {
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
  static enableFeature(features: Feature[]): Promise<boolean> {
    return RDModule.enableFeature(features);
  }

  /**
   * Disables one or many features.
   *
   * @param feature An array of `Feature` to disable.
   * @return A promise that returns true if the disablement was authorized.
   */
  static disableFeature(features: Feature[]): Promise<boolean> {
    return RDModule.disableFeature(features);
  }

  /**
   * Checks if a given feature is enabled or not.
   *
   * @return A promise that returns true if the features are enabled, false otherwise.
   */
  static isFeatureEnabled(features: Feature[]): Promise<boolean> {
    return RDModule.isFeatureEnabled(features);
  }

  /**
   * Enables user notifications.
   *
   * @return A promise that returns true if enablement was authorized
   * or false if enablement was rejected
   */
  static enableUserPushNotifications(): Promise<boolean> {
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
  static getUnreadMessageCount(): Promise<number> {
    return RDModule.getUnreadMessagesCount();
  }

  /**
   * Checks if app notifications are enabled or not. Its possible to have `userNotificationsEnabled`
   * but app notifications being disabled if the user opted out of notifications.
   *
   * @return A promise with the result.
   * @deprecated Use getNotificationStatus() instead.
   */
  static isUserNotificationsOptedIn(): Promise<boolean> {
    return RDModule.isUserNotificationsOptedIn();
  }

  /**
   * Checks if app notifications are enabled at a system level or not. Its possible to have `userNotificationsEnabled`
   * but app notifications being disabled if the user opted out of notifications.
   *
   * @return A promise with the result.
   * @deprecated Use getNotificationStatus() instead.
   */
  static isSystemNotificationsEnabledForApp(): Promise<boolean> {
    return RDModule.isSystemNotificationsEnabledForApp();
  }

  /**
   * Gets the notification status for the app.
   *
   * @return A promise with the result.
   */
  static getNotificationStatus(): Promise<NotificationStatus> {
    return RDModule.getNotificationStatus();
  }

  /**
   * Gets the status of the specified Notification Channel.
   * This method is only supported on Android. iOS will throw an error.
   *
   * @param channel The channel's name.
   * @return A promise with the result.
   */
  static getNotificationChannelStatus(channel: string): Promise<string> {
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
  static setNamedUser(namedUser: string | null | undefined) {
    RDModule.setNamedUser(namedUser);
  }

  /**
   * Gets the named user.
   *
   * @return A promise with the result.
   */
  static getNamedUser(): Promise<string | null | undefined> {
    return RDModule.getNamedUser();
  }

  /**
   * Adds a channel tag.
   *
   * @param tag A channel tag.
   */
  static addTag(tag: string) {
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
  static setAnalyticsEnabled(enabled: boolean) {
    RDModule.setAnalyticsEnabled(enabled);
  }

  /**
   * Checks if analytics is enabled or not.
   *
   * @return A promise with the result.
   */
  static isAnalyticsEnabled(): Promise<boolean> {
    return RDModule.isAnalyticsEnabled();
  }

  /**
   * Initiates screen tracking for a specific app screen, must be called once per tracked screen.
   *
   * @param screen The screen's string identifier
   */
  static trackScreen(screen: string) {
    RDModule.trackScreen(screen);
  }

  /**
   * Gets the channel ID.
   *
   * @return A promise with the result.
   */
  static getChannelId(): Promise<string | null | undefined> {
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
  static getRegistrationToken(): Promise<string | null | undefined> {
    return RDModule.getRegistrationToken();
  }

  /**
   * Associates an identifier for the Connect data stream.
   *
   * @param key The identifier's key.
   * @param id The identifier's id, or null/undefined to clear.
   */
  static associateIdentifier(key: string, id?: string) {
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
  static runAction(
    name: string,
    value?: JsonValue
  ): Promise<JsonValue | Error> {
    return RDModule.runAction(name, value);
  }

  /**
   * Sets the foreground presentation options for iOS.
   * This method is only supported on iOS. Android will no-op.
   *
   * @param options The array of foreground presentation options.
   */
  static setForegroundPresentationOptions(
    options:
      | ForegroundNotificationOptionsIOS
      | [iOS.ForegroundPresentationOption]
  ) {
    if (Platform.OS == 'ios') {
      if (Array.isArray(options)) {
        return RDModule.setForegroundPresentationOptions(options);
      } else {
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
  static setNotificationOptions(options: [iOS.NotificationOption]) {
    if (Platform.OS == 'ios') {
      return RDModule.setNotificationOptions(options);
    }
  }
  static addListener(
    eventType: EventType,
    listener: (...args: any[]) => any
  ): Subscription {
    EventEmitter.addListener(convertEventEnum(eventType), listener);
    return new Subscription(() => {
      RelatedDigital.removeListener(eventType, listener);
    });
  }
  static removeListener(
    eventType: EventType,
    listener: (...args: any[]) => any
  ) {
    EventEmitter.removeListener(convertEventEnum(eventType), listener);
  }
  static removeAllListeners(eventType: EventType) {
    EventEmitter.removeAllListeners(convertEventEnum(eventType));
  }

  /**
   * Enables or disables autobadging on iOS. Badging is not supported for Android.
   *
   * @param enabled Whether or not to enable autobadging.
   */
  static setAutobadgeEnabled(enabled: boolean) {
    if (Platform.OS == 'ios') {
      RDModule.setAutobadgeEnabled(enabled);
    } else {
      console.log('This feature is not supported on this platform.');
    }
  }

  /**
   * Checks to see if autobadging on iOS is enabled. Badging is not supported for Android.
   *
   * @return A promise with the result, either true or false.
   */
  static isAutobadgeEnabled(): Promise<boolean> {
    if (Platform.OS == 'ios') {
      return RDModule.isAutobadgeEnabled();
    } else {
      console.log('This feature is not supported on this platform.');
      return new Promise((resolve) => resolve(false));
    }
  }

  /**
   * Sets the badge number for iOS. Badging is not supported for Android.
   *
   * @param badgeNumber The badge number.
   */
  static setBadgeNumber(badgeNumber: number) {
    if (Platform.OS == 'ios') {
      RDModule.setBadgeNumber(badgeNumber);
    } else {
      console.log('This feature is not supported on this platform.');
    }
  }

  /**
   * Gets the current badge number for iOS. Badging is not supported for Android
   * and this method will always return 0.
   *
   * @return A promise with the result.
   */
  static getBadgeNumber(): Promise<number> {
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
  static displayMessage(messageId: string): Promise<boolean> {
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
  static refreshInbox(): Promise<boolean> {
    return RDModule.refreshInbox();
  }

  /**
   * Sets the default behavior when the message center is launched from a push
   * notification. If set to false the message center must be manually launched.
   *
   * @param enabled true to automatically launch the default message center, false to disable.
   */
  static setAutoLaunchDefaultMessageCenter(enabled: boolean) {
    RDModule.setAutoLaunchDefaultMessageCenter(enabled);
  }

  /**
   * Gets all the active notifications for the application.
   * Supported on Android Marshmallow (23)+ and iOS 10+.
   *
   * @return A promise with the result.
   */
  static getActiveNotifications(): Promise<PushReceivedEvent[]> {
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
  static clearNotification(identifier: string) {
    RDModule.clearNotification(identifier);
  }
}
