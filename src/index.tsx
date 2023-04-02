import { NativeModules } from 'react-native';

type RelatedDigitalType = {
  initialize(
    organizationId: string,
    profileId: string,
    dataSource: string,
    askLocationPermissionAtStart: boolean
  ): void;
  setIsInAppNotificationEnabled(isInAppNotificationEnabled: boolean): void;
  setIsGeofenceEnabled(isGeofenceEnabled: boolean): void;
  setAdvertisingIdentifier(advertisingIdentifier: string): void;
  signUp(exVisitorId: string, properties: object): void;
  login(exVisitorId: string, properties: object): void;
  logout(): void;
  customEvent(pageName: string, parameters: object): void;
  setIsPushNotificationEnabled(
    isPushNotificationEnabled: boolean,
    appAlias: string,
    huaweiAppAlias: string,
    deliveredBadge: boolean
  ): void;
  setEmail(email: string, permission: boolean): void;
  sendCampaignParameters(parameters: object): void;
  setTwitterId(twitterId: string): void;
  setFacebookId(facebookId: string): void;
  setRelatedDigitalUserId(relatedDigitalUserId: string): void;
  setNotificationLoginId(notificationLoginId: string): void;
  setPhoneNumber(msisdn: string, permission: boolean): void;
  setUserProperty(key: string, value: string): void;
  removeUserProperty(key: string): void;
  registerEmail(email: String, permission: Boolean, isCommercial: Boolean): Promise<boolean>;
  getPushMessages(): Promise<any>;
  getToken(): Promise<string>;
  registerNotificationListeners(): void;
};

const { RelatedDigital } = NativeModules;

RelatedDigital?.registerNotificationListeners();

export default RelatedDigital as RelatedDigitalType;
