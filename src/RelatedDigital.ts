'use strict';

import { NativeModules, Platform } from 'react-native';
import { RDEventEmitter } from './RDEventEmitter';
import type { JsonObject, JsonValue } from './Json';

const RDModule = NativeModules.RelatedDigitalReactModule;

const EventEmitter = new RDEventEmitter();

enum InternalEventType {
  Registration = 'com.relateddigital.registration',
  NotificationResponse = 'com.relateddigital.notification_response',
  PushReceived = 'com.relateddigital.push_received',
  DeepLink = 'com.relateddigital.deep_link',
  InboxUpdated = 'com.relateddigital.inbox_updated',
  NotificationOptInStatus = 'com.relateddigital.notification_opt_in_status',
  ShowInbox = 'com.relateddigital.show_inbox',
  ConversationUpdated = 'com.relateddigital.conversation_updated',
  OpenChat = 'com.relateddigital.open_chat',
  OpenPreferenceCenter = 'com.relateddigital.open_preference_center',
}

/**
 * Enum of event type names.
 */
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
   * Deep link event.
   */
  DeepLink = 'deepLink',
  /**
   * Notification opt-in status event.
   */
  NotificationOptInStatus = 'notificationOptInStatus',
  /**
   * Inbox updated event.
   */
  InboxUpdated = 'inboxUpdated',
  /**
   * Show inbox event.
   */
  ShowInbox = 'showInbox',
  /**
   * Chat conversation updated.
   */
  ConversationUpdated = 'conversationUpdated',
  /**
   * Open chat event.
   */
  OpenChat = 'openChat',
  /**
   * Open preference center event.
   */
  OpenPreferenceCenter = 'openPreferenceCenter',
}

/**
 * Inbox message object.
 */
export interface InboxMessage {
  /**
   * The message ID. Needed to display, mark as read, or delete the message.
   */
  id: string;
  /**
   * The message title.
   */
  title: string;
  /**
   * The message sent date in milliseconds.
   */
  sentDate: number;
  /**
   * Optional - The icon url for the message.
   */
  listIconUrl: string;
  /**
   * The unread / read status of the message.
   */
  isRead: boolean;
  /**
   * The deleted status of the message.
   */
  isDeleted: boolean;
  /**
   * String to String map of any message extras.
   */
  extras: Record<string, string>;
}

/**
 * Event fired when a push is received.
 */
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

/**
 * Event fired when the user initiates a notification response.
 */
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
 * Possible sites.
 */
export type Site = 'us' | 'eu';

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
   * Cloud site.
   */
  site?: Site;

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
   * Chat config. Only needed with the chat module.
   */
  chat?: {
    webSocketUrl: string;
    url: string;
  };
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
 * Subscription Scope types.
 */
export enum SubscriptionScope {
  App = 'app',
  Web = 'web',
  Sms = 'sms',
  Email = 'email',
}

/**
 * iOS options
 */
export namespace iOS {
  /**
   * Enum of notification options. iOS only.
   */
  export enum NotificationOption {
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
     * Car play.
     */
    CarPlay = 'carPlay',
    /**
     * Critical Alert.
     */
    CriticalAlert = 'criticalAlert',
    /**
     * Provides app notification settings.
     */
    ProvidesAppNotificationSettings = 'providesAppNotificationSettings',
    /**
     * Provisional.
     */
    Provisional = 'provisional',
  }

  /**
   * Enum of foreground notification options.
   */
  export enum ForegroundPresentationOption {
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

  /**
   * Enum of authorized status.
   */
  export enum AuthorizedNotificationStatus {
    /**
     * Not determined.
     */
    NotDetermined = 'notDetermined',

    /**
     * Denied.
     */
    Denied = 'denied',

    /**
     * Authorized.
     */
    Authorized = 'authorized',

    /**
     * Provisional.
     */
    Provisional = 'provisional',

    /**
     * Ephemeral.
     */
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
 * Event fired when the inbox is updated.
 */
export interface InboxUpdatedEvent {
  /**
   * The unread message count.
   */
  messageUnreadCount: number;
  /**
   * The total message count.
   */
  messageCount: number;
}

/**
 * Event fired when the message center requests the inbox to be displayed.
 */
export interface ShowInboxEvent {
  /**
   * The message ID, if available.
   */
  messageId?: string;
}

/**
 * Event fired when a deep link is opened.
 */
export interface DeepLinkEvent {
  /**
   * The deep link string.
   */
  deepLink: string;
}

/**
 * Event fired when a preference center requests to be displayed.
 */
export interface OpenPreferenceCenterEvent {
  /**
   * The preference center Id.
   */
  preferenceCenterId: string;
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
  } else if (type == EventType.DeepLink) {
    return InternalEventType.DeepLink;
  } else if (type == EventType.NotificationOptInStatus) {
    return InternalEventType.NotificationOptInStatus;
  } else if (type == EventType.InboxUpdated) {
    return InternalEventType.InboxUpdated;
  } else if (type == EventType.ShowInbox) {
    return InternalEventType.ShowInbox;
  } else if (type == EventType.ConversationUpdated) {
    return InternalEventType.ConversationUpdated;
  } else if (type == EventType.OpenChat) {
    return InternalEventType.OpenChat;
  } else if (type == EventType.OpenPreferenceCenter) {
    return InternalEventType.OpenPreferenceCenter;
  }

  throw new Error('Invalid event name: ' + type);
}

function convertFeatureEnum(feature: String): Feature {
  if (feature == 'FEATURE_NONE') {
    return Feature.FEATURE_NONE;
  } else if (feature == 'FEATURE_IN_APP_AUTOMATION') {
    return Feature.FEATURE_IN_APP_AUTOMATION;
  } else if (feature == 'FEATURE_MESSAGE_CENTER') {
    return Feature.FEATURE_MESSAGE_CENTER;
  } else if (feature == 'FEATURE_PUSH') {
    return Feature.FEATURE_PUSH;
  } else if (feature == 'FEATURE_CHAT') {
    return Feature.FEATURE_CHAT;
  } else if (feature == 'FEATURE_ANALYTICS') {
    return Feature.FEATURE_ANALYTICS;
  } else if (feature == 'FEATURE_TAGS_AND_ATTRIBUTES') {
    return Feature.FEATURE_TAGS_AND_ATTRIBUTES;
  } else if (feature == 'FEATURE_CONTACTS') {
    return Feature.FEATURE_CONTACTS;
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
  FEATURE_MESSAGE_CENTER = 'FEATURE_MESSAGE_CENTER',
  FEATURE_PUSH = 'FEATURE_PUSH',
  FEATURE_CHAT = 'FEATURE_CHAT',
  FEATURE_ANALYTICS = 'FEATURE_ANALYTICS',
  FEATURE_TAGS_AND_ATTRIBUTES = 'FEATURE_TAGS_AND_ATTRIBUTES',
  FEATURE_CONTACTS = 'FEATURE_CONTACTS',
  FEATURE_LOCATION = 'FEATURE_LOCATION',
  FEATURE_ALL = 'FEATURE_ALL',
}

/**
 * The main RelatedDigital API.
 */
export class RelatedDigital {
  setIsInAppNotificationEnabled(isInAppNotificationEnabled: boolean): void {
    RDModule.setIsInAppNotificationEnabled(isInAppNotificationEnabled);
  }
  setIsGeofenceEnabled(isGeofenceEnabled: boolean): void {
    RDModule.setIsGeofenceEnabled(isGeofenceEnabled);
  }
  setAdvertisingIdentifier(advertisingIdentifier: string): void {
    RDModule.setAdvertisingIdentifier(advertisingIdentifier);
  }
  signUp(exVisitorId: string, properties: object): void {
    RDModule.signUp(exVisitorId, properties);
  }
  login(exVisitorId: string, properties: object): void {
    RDModule.login(exVisitorId, properties);
  }
  logout(): void {
    RDModule.logout();
  }
  customEvent(pageName: string, parameters: object): void {
    RDModule.customEvent(pageName, parameters);
  }
  askForPushNotificationPermission(): void {
    RDModule.askForPushNotificationPermission();
  }
  setIsPushNotificationEnabled(
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
  setEmail(email: string, permission: boolean): void {
    RDModule.setEmail(email, permission);
  }
  sendCampaignParameters(parameters: object): void {
    RDModule.sendCampaignParameters(parameters);
  }
  setTwitterId(twitterId: string): void {
    RDModule.setTwitterId(twitterId);
  }
  setFacebookId(facebookId: string): void {
    RDModule.setFacebookId(facebookId);
  }
  setRelatedDigitalUserId(relatedDigitalUserId: string): void {
    RDModule.setRelatedDigitalUserId(relatedDigitalUserId);
  }
  setNotificationLoginId(notificationLoginId: string): void {
    RDModule.setNotificationLoginId(notificationLoginId);
  }
  setPhoneNumber(msisdn: string, permission: boolean): void {
    RDModule.setPhoneNumber(msisdn, permission);
  }
  setUserProperty(key: string, value: string): void {
    RDModule.setUserProperty(key, value);
  }
  removeUserProperty(key: string): void {
    RDModule.removeUserProperty(key);
  }
  registerEmail(
    email: String,
    permission: Boolean,
    isCommercial: Boolean
  ): Promise<boolean> {
    return RDModule.registerEmail(email, permission, isCommercial);
  }
  getPushMessages(): Promise<any> {
    return RDModule.getPushMessages();
  }
  getToken(): Promise<string> {
    return RDModule.getToken();
  }

  //TODO: kaldırılabilir
  registerNotificationListeners(): void {
    RDModule.registerNotificationListeners();
  }

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
        var convertedFeatures: Feature[] = new Array();
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

  /**
   * Adds a listener for an RelatedDigital event.
   *
   * @param eventType The event type. Either EventType.NotificationResponse, EventType.PushReceived,
   * EventType.Register, EventType.Registration, EventType.DeepLink, EventType.NotificationOptInStatus,
   * @param listener The event listener.
   * @return A subscription.
   */
  static addListener(
    eventType: EventType,
    listener: (...args: any[]) => any
  ): Subscription {
    EventEmitter.addListener(convertEventEnum(eventType), listener);
    return new Subscription(() => {
      RelatedDigital.removeListener(eventType, listener);
    });
  }

  /**
   * Removes a listener for an RelatedDigital event.
   *
   * @param eventType The event type. Either EventType.NotificationResponse, EventType.PushReceived,
   * EventType.Register, EventType.Registration, EventType.DeepLink, EventType.NotificationOptInStatus,
   * EventType.InboxUpdated, or EventType.ShowInbox.
   * @param listener The event listener. Should be a reference to the function passed into addListener.
   */
  static removeListener(
    eventType: EventType,
    listener: (...args: any[]) => any
  ) {
    EventEmitter.removeListener(convertEventEnum(eventType), listener);
  }

  /**
   * Removes all listeners for Urban RelatedDigital events.
   *
   * @param eventType The event type. Either EventType.NotificationResponse, EventType.PushReceived,
   * EventType.Register, EventType.Registration, EventType.DeepLink, EventType.NotificationOptInStatus,
   * EventType.InboxUpdated, or EventType.ShowInbox.
   */
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
   * Retrieves the current inbox messages.
   *
   * @return A promise with the result.
   */
  static getInboxMessages(): Promise<InboxMessage[]> {
    return RDModule.getInboxMessages();
  }

  /**
   * Deletes an inbox message.
   *
   * @param messageId The id of the message to be deleted.
   * @return A promise with the result.
   */
  static deleteInboxMessage(messageId: string): Promise<boolean> {
    return RDModule.deleteInboxMessage(messageId);
  }

  /**
   * Marks an inbox message as read.
   *
   * @param messageId The id of the message to be marked as read.
   * @return A promise with the result.
   */
  static markInboxMessageRead(messageId: string): Promise<boolean> {
    return RDModule.markInboxMessageRead(messageId);
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
   * Overriding the locale.
   *
   * @param localeIdentifier The locale identifier.
   */
  static setCurrentLocale(localeIdentifier: String) {
    RDModule.setCurrentLocale(localeIdentifier);
  }

  /**
   * Getting the locale currently used by RelatedDigital.
   *
   */
  static getCurrentLocale(): Promise<String> {
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

  /**
   * Sets the in-app message display interval on the default display coordinator.
   *
   * @param seconds The minimum number of seconds between message displays.
   */
  static setInAppAutomationDisplayInterval(seconds: number) {
    RDModule.setInAppAutomationDisplayInterval(seconds);
  }
}