'use strict';

import { NativeModules } from 'react-native';
import { RDEventEmitter } from './RDEventEmitter';
import type {
  RDRecommendationFilter,
  RDRecommendationResponse,
} from './models/RDRecommendation';
import type { RDFavoriteAttributeActionResponse } from './models/RDFavoriteAttribute';
import { RDEventType, RDSubscription } from './models/RDSubscription';
import type { RDPushMessage } from './models/RDPushMessage';
import type { RDUser } from './models/RDUser';

export type RDProps = Record<string, string>;

const RDModule = NativeModules.RelatedDigitalReactModule;

const EventEmitter = new RDEventEmitter();

/**
 * The main RelatedDigital API.
 */
export class RelatedDigital {
  static setIsInAppNotificationEnabled(enabled: boolean): void {
    RDModule.setIsInAppNotificationEnabled(enabled);
  }
  static setIsGeofenceEnabled(enabled: boolean): void {
    RDModule.setIsGeofenceEnabled(enabled);
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
  static askForNotificationPermissionProvisional(): void {
    RDModule.askForNotificationPermissionProvisional();
  }
  static setIsPushNotificationEnabled(
    enabled: boolean,
    iosAppAlias: string,
    googleAppAlias: string,
    huaweiAppAlias: string,
    deliveredBadge: boolean
  ): void {
    RDModule.setIsPushNotificationEnabled(
      enabled,
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
  static getPushMessages(): Promise<RDPushMessage[]> {
    return RDModule.getPushMessages();
  }
  static getPushMessagesWithId(): Promise<RDPushMessage[]> {
    return RDModule.getPushMessagesWithID();
  }
  static getToken(): Promise<string> {
    return RDModule.getToken();
  }
  static getUser(): Promise<RDUser> {
    return RDModule.getUser();
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
  static addListener(
    eventType: RDEventType,
    listener: (...args: any[]) => any
  ): RDSubscription {
    EventEmitter.addListener(eventType, listener);
    return new RDSubscription(() => {
      RelatedDigital.removeListener(eventType, listener);
    });
  }
  static removeListener(
    eventType: RDEventType,
    listener: (...args: any[]) => any
  ) {
    EventEmitter.removeListener(eventType, listener);
  }
  static removeAllListeners(eventType: RDEventType) {
    EventEmitter.removeAllListeners(eventType);
  }
}
