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
@property(nonatomic, strong) RDRCTListener *rdListener;
@end

@implementation RelatedDigitalReactModule

NSString *const RDRCTStatusMessageNotFound = @"STATUS_MESSAGE_NOT_FOUND";
NSString *const RDRCTStatusInboxRefreshFailed = @"STATUS_INBOX_REFRESH_FAILED";
NSString *const RDRCTErrorDescriptionMessageNotFound = @"Message not found for provided id.";
NSString *const RDRCTErrorDescriptionInboxRefreshFailed = @"Failed to refresh inbox.";

int const RDRCTErrorCodeMessageNotFound = 0;
int const RDRCTErrorCodeInboxRefreshFailed = 1;

NSString *const RDRCTErrorDomain = @"com.relateddigital.react";
NSString *const RDRCTStatusUnavailable = @"UNAVAILABLE";
NSString *const RDRCTStatusInvalidFeature = @"INVALID_FEATURE";
NSString *const RDRCTErrorDescriptionInvalidFeature = @"Invalid feature, cancelling the action.";
int const RDRCTErrorCodeInvalidFeature = 2;

#pragma mark -
#pragma mark Module setup

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

- (void)setBridge:(RCTBridge *)bridge {
  [RDRCTEventEmitter shared].bridge = bridge;
  [self attemptTakeOff];
}

- (RCTBridge *)bridge {
  return [RDRCTEventEmitter shared].bridge;
}

+ (BOOL)requiresMainQueueSetup {
  return YES;
}

- (void)attemptTakeOff {
  //[RDRCTAutopilot takeOffWithLaunchOptions:self.bridge.launchOptions];
}

#pragma mark -
#pragma mark Module methods

RCT_EXPORT_METHOD(addListener : (NSString *)eventName) {}

RCT_EXPORT_METHOD(removeListeners : (NSInteger)count) {}

RCT_EXPORT_METHOD(onRDListenerAdded : (NSString *)eventName) {
  //[[RDRCTEventEmitter shared] onRDListenerAddedForType:eventName];
}

// TODO: RELATED DIGITAL

RCT_EXPORT_METHOD(setIsInAppNotificationEnabled : (BOOL)isInAppNotificationEnabled) {
  [RDHelper.shared setIsInAppNotificationEnabled:isInAppNotificationEnabled];
}

RCT_EXPORT_METHOD(setIsGeofenceEnabled : (BOOL)isGeofenceEnabled) {
  [RDHelper.shared setIsGeofenceEnabled:isGeofenceEnabled];
}

RCT_EXPORT_METHOD(setAdvertisingIdentifier : (NSString *)advertisingIdentifier) {
  [RDHelper.shared setAdvertisingIdentifier:advertisingIdentifier];
}

RCT_EXPORT_METHOD(signUp : (NSString *)exVisitorId withProperties : (NSDictionary *)properties) {
  [RDHelper.shared signUp:exVisitorId withProperties:properties];
}

RCT_EXPORT_METHOD(login : (NSString *)exVisitorId withProperties : (NSDictionary *)properties) {
  [RDHelper.shared login:exVisitorId withProperties:properties];
}

RCT_EXPORT_METHOD(logout) { [RDHelper.shared logout]; }

RCT_EXPORT_METHOD(customEvent : (NSString *)pageName withParameters : (NSDictionary *)parameters) {
  [RDHelper.shared customEvent:pageName withParameters:parameters];
}

RCT_EXPORT_METHOD(askForPushNotificationPermission) {
  [RDHelper.shared askForPushNotificationPermission];
}

RCT_EXPORT_METHOD(setIsPushNotificationEnabled
                  : (BOOL)isPushNotificationEnabled withIosAppAlias
                  : (NSString *)iosAppAlias withGoogleAppAlias
                  : (NSString *)googleAppAlias withHuaweiAppAlias
                  : (NSString *)huaweiAppAlias withDeliveredBadge
                  : (BOOL)deliveredBadge) {
  [RDHelper.shared setIsPushNotificationEnabled:isPushNotificationEnabled
                                withIosAppAlias:iosAppAlias
                             withGoogleAppAlias:googleAppAlias
                             withHuaweiAppAlias:huaweiAppAlias
                             withDeliveredBadge:deliveredBadge];
}

RCT_EXPORT_METHOD(setEmail : (NSString *)email withPermission : (BOOL)permission) {
  [RDHelper.shared setEmail:email withPermission:permission];
}

RCT_EXPORT_METHOD(sendCampaignParameters : (NSDictionary *)parameters) {
  [RDHelper.shared sendCampaignParameters:parameters];
}

RCT_EXPORT_METHOD(setTwitterId : (NSString *)twitterId) {
  [RDHelper.shared setTwitterId:twitterId];
}

RCT_EXPORT_METHOD(setFacebookId : (NSString *)facebookId) {
  [RDHelper.shared setFacebookId:facebookId];
}

RCT_EXPORT_METHOD(setRelatedDigitalUserId : (NSString *)relatedDigitalUserId) {
  [RDHelper.shared setRelatedDigitalUserId:relatedDigitalUserId];
}

RCT_EXPORT_METHOD(setNotificationLoginId : (NSString *)notificationLoginId) {
  [RDHelper.shared setNotificationLoginId:notificationLoginId];
}

RCT_EXPORT_METHOD(setPhoneNumber : (NSString *)msisdn withPermission : (BOOL)permission) {
  [RDHelper.shared setPhoneNumber:msisdn withPermission:permission];
}

RCT_EXPORT_METHOD(setUserProperty : (NSString *)key withValue : (NSString *)value) {
  [RDHelper.shared setUserProperty:key withValue:value];
}

RCT_EXPORT_METHOD(removeUserProperty : (NSString *)key) {
  [RDHelper.shared removeUserProperty:key];
}

RCT_EXPORT_METHOD(getToken
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  [RDHelper.shared getToken:resolve withReject:reject];
}

RCT_EXPORT_METHOD(registerEmail
                  : (NSString *)email withPermission
                  : (BOOL)permission withIsCommercial
                  : (BOOL)isCommercial withResolve
                  : (RCTPromiseResolveBlock)resolve withReject
                  : (RCTPromiseRejectBlock)reject) {
  [RDHelper.shared registerEmail:email
                  withPermission:permission
                withIsCommercial:isCommercial
                     withResolve:resolve
                      withReject:reject];
}

RCT_EXPORT_METHOD(getPushMessages
                  : (RCTPromiseResolveBlock)resolve withReject
                  : (RCTPromiseRejectBlock)reject) {
  [RDHelper.shared getPushMessages:resolve withReject:reject];
}

RCT_EXPORT_METHOD(getToken
                  : (RCTPromiseResolveBlock)resolve withReject
                  : (RCTPromiseRejectBlock)reject) {
  [RDHelper.shared getToken:resolve withReject:reject];
}

@end
