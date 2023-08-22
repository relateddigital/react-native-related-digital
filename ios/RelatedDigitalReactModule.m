//
//  RelatedDigitalReactModule.m
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 4.07.2023.
//

#import <UserNotifications/UserNotifications.h>
#import "RelatedDigitalReactModule.h"
#import "react_native_related_digital-Swift.h"

@interface RelatedDigitalReactModule ()
//@property(nonatomic, strong) RDRCTListener *rdListener;
@end

@implementation RelatedDigitalReactModule

NSString *const RDRCTErrorDomain = @"com.relateddigital.react";

#pragma mark -
#pragma mark Module setup

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

- (void)setBridge:(RCTBridge *)bridge {
  [RDRCTEventEmitter shared].bridge = bridge;
}

- (RCTBridge *)bridge {
  return [RDRCTEventEmitter shared].bridge;
}

+ (BOOL)requiresMainQueueSetup {
  return YES;
}

#pragma mark -
#pragma mark Module methods

RCT_EXPORT_METHOD(addListener : (NSString *)eventName) {}

RCT_EXPORT_METHOD(removeListeners : (NSInteger)count) {}

RCT_EXPORT_METHOD(onRDListenerAdded : (NSString *)eventName) {
  [RDRCTEventEmitter.shared onRelatedDigitalListenerAddedForType:eventName];
}

// TODO: RELATED DIGITAL

RCT_EXPORT_METHOD(setIsInAppNotificationEnabled : (BOOL)isInAppNotificationEnabled) {
  [RDRCTHelper.shared setIsInAppNotificationEnabled:isInAppNotificationEnabled];
}

RCT_EXPORT_METHOD(setIsGeofenceEnabled : (BOOL)isGeofenceEnabled) {
  [RDRCTHelper.shared setIsGeofenceEnabled:isGeofenceEnabled];
}

RCT_EXPORT_METHOD(setAdvertisingIdentifier : (NSString *)advertisingIdentifier) {
  [RDRCTHelper.shared setAdvertisingIdentifier:advertisingIdentifier];
}

RCT_EXPORT_METHOD(signUp : (NSString *)exVisitorId withProperties : (NSDictionary *)properties) {
  [RDRCTHelper.shared signUp:exVisitorId withProperties:properties];
}

RCT_EXPORT_METHOD(login : (NSString *)exVisitorId withProperties : (NSDictionary *)properties) {
  [RDRCTHelper.shared login:exVisitorId withProperties:properties];
}

RCT_EXPORT_METHOD(logout) { [RDRCTHelper.shared logout]; }

RCT_EXPORT_METHOD(customEvent : (NSString *)pageName withParameters : (NSDictionary *)parameters) {
  [RDRCTHelper.shared customEvent:pageName withParameters:parameters];
}

RCT_EXPORT_METHOD(askForNotificationPermission) {
  [RDRCTHelper.shared askForNotificationPermission];
}

RCT_EXPORT_METHOD(setIsPushNotificationEnabled
                  : (BOOL)isPushNotificationEnabled withIosAppAlias
                  : (NSString *)iosAppAlias withGoogleAppAlias
                  : (NSString *)googleAppAlias withHuaweiAppAlias
                  : (NSString *)huaweiAppAlias withDeliveredBadge
                  : (BOOL)deliveredBadge) {
  [RDRCTHelper.shared setIsPushNotificationEnabled:isPushNotificationEnabled
                                   withIosAppAlias:iosAppAlias
                                withGoogleAppAlias:googleAppAlias
                                withHuaweiAppAlias:huaweiAppAlias
                                withDeliveredBadge:deliveredBadge];
}

RCT_EXPORT_METHOD(setEmail : (NSString *)email withPermission : (BOOL)permission) {
  [RDRCTHelper.shared setEmail:email withPermission:permission];
}

RCT_EXPORT_METHOD(sendCampaignParameters : (NSDictionary *)parameters) {
  [RDRCTHelper.shared sendCampaignParameters:parameters];
}

RCT_EXPORT_METHOD(setTwitterId : (NSString *)twitterId) {
  [RDRCTHelper.shared setTwitterId:twitterId];
}

RCT_EXPORT_METHOD(setFacebookId : (NSString *)facebookId) {
  [RDRCTHelper.shared setFacebookId:facebookId];
}

RCT_EXPORT_METHOD(setRelatedDigitalUserId : (NSString *)relatedDigitalUserId) {
  [RDRCTHelper.shared setRelatedDigitalUserId:relatedDigitalUserId];
}

RCT_EXPORT_METHOD(setNotificationLoginId : (NSString *)notificationLoginId) {
  [RDRCTHelper.shared setNotificationLoginId:notificationLoginId];
}

RCT_EXPORT_METHOD(setPhoneNumber : (NSString *)msisdn withPermission : (BOOL)permission) {
  [RDRCTHelper.shared setPhoneNumber:msisdn withPermission:permission];
}

RCT_EXPORT_METHOD(setUserProperty : (NSString *)key withValue : (NSString *)value) {
  [RDRCTHelper.shared setUserProperty:key withValue:value];
}

RCT_EXPORT_METHOD(removeUserProperty : (NSString *)key) {
  [RDRCTHelper.shared removeUserProperty:key];
}

RCT_EXPORT_METHOD(getToken
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  [RDRCTHelper.shared getToken:resolve withReject:reject];
}

RCT_EXPORT_METHOD(registerEmail
                  : (NSString *)email withPermission
                  : (BOOL)permission withIsCommercial
                  : (BOOL)isCommercial withResolve
                  : (RCTPromiseResolveBlock)resolve withReject
                  : (RCTPromiseRejectBlock)reject) {
  [RDRCTHelper.shared registerEmail:email
                     withPermission:permission
                   withIsCommercial:isCommercial
                        withResolve:resolve
                         withReject:reject];
}

RCT_EXPORT_METHOD(getPushMessages
                  : (RCTPromiseResolveBlock)resolve withReject
                  : (RCTPromiseRejectBlock)reject) {
  [RDRCTHelper.shared getPushMessages:resolve withReject:reject];
}

RCT_EXPORT_METHOD(getToken
                  : (RCTPromiseResolveBlock)resolve withReject
                  : (RCTPromiseRejectBlock)reject) {
  [RDRCTHelper.shared getToken:resolve withReject:reject];
}

RCT_EXPORT_METHOD(getUser
                  : (RCTPromiseResolveBlock)resolve withReject
                  : (RCTPromiseRejectBlock)reject) {
  [RDRCTHelper.shared getUser:resolve withReject:reject];
}

@end
