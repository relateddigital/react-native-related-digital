'use strict';

import { NativeModules } from 'react-native';
import { RDEventEmitter } from './RDEventEmitter';

export type RDProps = Record<string, string>;

const RDModule = NativeModules.RelatedDigitalReactModule;

const EventEmitter = new RDEventEmitter();

enum InternalEventType {
  NotificationRegistered = 'com.relateddigital.notification_registered',
  NotificationReceived = 'com.relateddigital.notification_received',
  NotificationOpened = 'com.relateddigital.notification_opened',
}

export enum EventType {
  NotificationRegistered = 'notificationRegistered',
  NotificationReceived = 'notificationReceived',
  NotificationOpened = 'notificationOpened',
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
function convertEventEnum(type: EventType): string {
  if (type === EventType.NotificationRegistered) {
    return InternalEventType.NotificationRegistered;
  } else if (type === EventType.NotificationReceived) {
    return InternalEventType.NotificationReceived;
  } else if (type === EventType.NotificationOpened) {
    return InternalEventType.NotificationOpened;
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
}
