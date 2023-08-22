'use strict';

import { NativeModules } from 'react-native';
import { RDEventEmitter } from './RDEventEmitter';
import type {
  RDRecommendationFilter,
  RDRecommendationResponse,
} from './models/RDRecommendation';
import type { RDFavoriteAttributeActionResponse } from './models/RDFavoriteAttribute';

export type RDProps = Record<string, string>;

const RDModule = NativeModules.RelatedDigitalReactModule;

const EventEmitter = new RDEventEmitter();

export enum RDEventType {
  NotificationRegistered = 'com.relateddigital.notification_registered',
  NotificationReceived = 'com.relateddigital.notification_received',
  NotificationOpened = 'com.relateddigital.notification_opened',
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
 * Converts between public and internal event types.
 * @hidden
 */
function convertEventEnum(type: RDEventType): string {
  if (type === RDEventType.NotificationRegistered) {
    return RDEventType.NotificationRegistered;
  } else if (type === RDEventType.NotificationReceived) {
    return RDEventType.NotificationReceived;
  } else if (type === RDEventType.NotificationOpened) {
    return RDEventType.NotificationOpened;
  }

  throw new Error('Invalid event name: ' + type);
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
  static signUp(exVisitorId: string, properties: RDProps): void {
    RDModule.signUp(exVisitorId, properties);
  }
  static login(exVisitorId: string, properties: RDProps): void {
    RDModule.login(exVisitorId, properties);
  }
  static logout(): void {
    RDModule.logout();
  }
  static customEvent(pageName: string, parameters: RDProps): void {
    RDModule.customEvent(pageName, parameters);
  }
  static askForNotificationPermission(): void {
    RDModule.askForNotificationPermission();
  }
  static askForNotificationPermissionProvisional(
    register: Boolean = false
  ): void {
    RDModule.askForNotificationPermissionProvisional(register);
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
  static getPushMessagesWithID(): Promise<any> {
    return RDModule.getPushMessagesWithID();
  }
  static getToken(): Promise<string> {
    return RDModule.getToken();
  }
  static getUser(): Promise<any> {
    return RDModule.getUser();
  }
  static addListener(
    eventType: RDEventType,
    listener: (...args: any[]) => any
  ): Subscription {
    EventEmitter.addListener(convertEventEnum(eventType), listener);
    return new Subscription(() => {
      RelatedDigital.removeListener(eventType, listener);
    });
  }
  static removeListener(
    eventType: RDEventType,
    listener: (...args: any[]) => any
  ) {
    EventEmitter.removeListener(convertEventEnum(eventType), listener);
  }
  static removeAllListeners(eventType: RDEventType) {
    EventEmitter.removeAllListeners(convertEventEnum(eventType));
  }

  static requestIDFA(): void {
    RDModule.requestIDFA();
  }

  static sendLocationPermission(): void {
    RDModule.sendLocationPermission();
  }

  static requestLocationPermissions(): void {
    RDModule.requestLocationPermissions();
  }

  static sendTheListOfAppsInstalled(): void {
    RDModule.sendTheListOfAppsInstalled();
  }

  static setNotificationLoginID(notificationLoginID: string | null): void {
    RDModule.setNotificationLoginID(notificationLoginID);
  }

  static recommend(
    zoneId: string,
    productCode: string | null = null,
    filters: RDRecommendationFilter[] = [],
    properties: RDProps
  ): Promise<RDRecommendationResponse> {
    return RDModule.recommend(zoneId, productCode, filters, properties);
  }

  static trackRecommendationClick(qs: string): void {
    RDModule.trackRecommendationClick(qs);
  }

  static getFavoriteAttributeActions(
    actionId: string | null = null
  ): Promise<RDFavoriteAttributeActionResponse> {
    return RDModule.getFavoriteAttributeActions(actionId);
  }
}
