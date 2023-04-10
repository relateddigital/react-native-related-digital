#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RelatedDigital, NSObject)


- (NSArray<NSString *> *)supportedEvents
{
  return @[@"blabla"];
}

//TODO: DELETE
RCT_EXTERN_METHOD(multiply:(float)a withB:(float)b
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)



RCT_EXTERN_METHOD(initialize:(NSString *) organizationId
                  withProfileId:(NSString *) profileId
                  withDataSource:(NSString *) dataSource
                  withAskLocationPermissionAtStart: (BOOL) askLocationPermissionAtStart)









RCT_EXTERN_METHOD(setIsInAppNotificationEnabled: (BOOL) isInAppNotificationEnabled)


RCT_EXTERN_METHOD(setIsGeofenceEnabled: (BOOL) isGeofenceEnabled)


RCT_EXTERN_METHOD(setAdvertisingIdentifier: (NSString *) advertisingIdentifier)


RCT_EXTERN_METHOD(signUp:(NSString *) exVisitorId
                  withProperties:(NSDictionary *)properties)


RCT_EXTERN_METHOD(login:(NSString *) exVisitorId
                  withProperties:(NSDictionary *)properties)


RCT_EXTERN_METHOD(logout)


RCT_EXTERN_METHOD(customEvent:(NSString *) pageName
                  withParameters:(NSDictionary *)parameters)


RCT_EXTERN_METHOD(setIsPushNotificationEnabled:(BOOL) isPushNotificationEnabled
                  withAppAlias:(NSString *)appAlias
                  withDeliveredBadge: (BOOL) deliveredBadge)


RCT_EXTERN_METHOD(setEmail: (NSString *) email
                  withPermission:(BOOL) permission)

RCT_EXTERN_METHOD(sendCampaignParameters:(NSDictionary *) parameters)

RCT_EXTERN_METHOD(setTwitterId: (NSString *) twitterId)

RCT_EXTERN_METHOD(setFacebookId: (NSString *) facebookId)

RCT_EXTERN_METHOD(setRelatedDigitalUserId: (NSString *) relatedDigitalUserId)

RCT_EXTERN_METHOD(setNotificationLoginId: (NSString *) notificationLoginId)

RCT_EXTERN_METHOD(setPhoneNumber: (NSString *) msisdn
                  withPermission: (BOOL) permission)

RCT_EXTERN_METHOD(setUserProperty: (NSString *) key
                  withValue: (NSString *) value)


RCT_EXTERN_METHOD(removeUserProperty: (NSString *) key)

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

@end
