#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE (RelatedDigital, NSObject)

- (NSArray<NSString *> *)supportedEvents
{
  return @[
    @"onNotificationRegistered",
    @"onNotificationReceived",
    @"onNotificationOpened"
  ];
}

RCT_EXTERN_METHOD (initialize
                   : (NSString *)organizationId withProfileId
                   : (NSString *)profileId withDataSource
                   : (NSString *)dataSource withAskLocationPermissionAtStart
                   : (BOOL)askLocationPermissionAtStart)

RCT_EXTERN_METHOD (setIsInAppNotificationEnabled
                   : (BOOL)isInAppNotificationEnabled)

RCT_EXTERN_METHOD (setIsGeofenceEnabled : (BOOL)isGeofenceEnabled)

RCT_EXTERN_METHOD (setAdvertisingIdentifier : (NSString *)advertisingIdentifier)

RCT_EXTERN_METHOD (signUp
                   : (NSString *)exVisitorId withProperties
                   : (NSDictionary *)properties)

RCT_EXTERN_METHOD (login
                   : (NSString *)exVisitorId withProperties
                   : (NSDictionary *)properties)

RCT_EXTERN_METHOD (logout)

RCT_EXTERN_METHOD (customEvent
                   : (NSString *)pageName withParameters
                   : (NSDictionary *)parameters)

RCT_EXTERN_METHOD (askForPushNotificationPermission)

RCT_EXTERN_METHOD (setIsPushNotificationEnabled
                   : (BOOL)isPushNotificationEnabled withIosAppAlias
                   : (NSString *)iosAppAlias withGoogleAppAlias
                   : (NSString *)googleAppAlias withHuaweiAppAlias
                   : (NSString *)huaweiAppAlias withDeliveredBadge
                   : (BOOL)deliveredBadge)

RCT_EXTERN_METHOD (setEmail
                   : (NSString *)email withPermission
                   : (BOOL)permission)

RCT_EXTERN_METHOD (sendCampaignParameters : (NSDictionary *)parameters)

RCT_EXTERN_METHOD (setTwitterId : (NSString *)twitterId)

RCT_EXTERN_METHOD (setFacebookId : (NSString *)facebookId)

RCT_EXTERN_METHOD (setRelatedDigitalUserId : (NSString *)relatedDigitalUserId)

RCT_EXTERN_METHOD (setNotificationLoginId : (NSString *)notificationLoginId)

RCT_EXTERN_METHOD (setPhoneNumber
                   : (NSString *)msisdn withPermission
                   : (BOOL)permission)

RCT_EXTERN_METHOD (setUserProperty
                   : (NSString *)key withValue
                   : (NSString *)value)

RCT_EXTERN_METHOD (removeUserProperty : (NSString *)key)

RCT_EXTERN_METHOD (getToken
                   : (RCTPromiseResolveBlock)resolve reject
                   : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD (registerEmail
                   : (NSString *)email withPermission
                   : (BOOL)permission withIsCommercial
                   : (BOOL)isCommercial withResolve
                   : (RCTPromiseResolveBlock)resolve withReject
                   : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD (getPushMessages
                   : (RCTPromiseResolveBlock)resolve withReject
                   : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD (getToken
                   : (RCTPromiseResolveBlock)resolve withReject
                   : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD (registerNotificationListeners)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end



@interface RCT_EXTERN_MODULE(RDStoryViewManager, RCTViewManager)
    RCT_EXPORT_VIEW_PROPERTY(actionId, NSString)
    RCT_EXPORT_VIEW_PROPERTY(onItemClicked, RCTBubblingEventBlock)
@end
