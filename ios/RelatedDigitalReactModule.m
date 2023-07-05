//
//  RelatedDigitalReactModule.m
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 4.07.2023.
//

#import <Foundation/Foundation.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTView.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>
#import <React/RCTBridge+Private.h>
#import "RelatedDigitalReactModule.h"
#import "RDRCTUtils.h"
#import "react_native_related_digital-Swift.h"
//#import "RDRCTStorage.h"

//#import "react_native_related_digital-Swift.h"


//@import react_native_related_digital;

//@class RDRCTListener;
//@class RDRCTUtils;
//@class RDRCTEventEmitter;

//@import RelatedDigitalIOS;








@interface RelatedDigitalReactModule()
@property(nonatomic, strong) RDRCTListener *rdListener;
@end

@implementation RelatedDigitalReactModule

NSString *const RDRCTStatusMessageNotFound = @"STATUS_MESSAGE_NOT_FOUND";
NSString *const RDRCTStatusInboxRefreshFailed = @"STATUS_INBOX_REFRESH_FAILED";
NSString *const RDRCTErrorDescriptionMessageNotFound = @"Message not found for provided id.";
NSString *const RDRCTErrorDescriptionInboxRefreshFailed = @"Failed to refresh inbox.";

int const RDRCTErrorCodeMessageNotFound = 0;
int const RDRCTErrorCodeInboxRefreshFailed = 1;


NSString * const RDRCTErrorDomain = @"com.relateddigital.react";
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

RCT_EXPORT_METHOD(addListener:(NSString *)eventName) {
}

RCT_EXPORT_METHOD(removeListeners:(NSInteger)count) {
}

RCT_EXPORT_METHOD(onRDListenerAdded:(NSString *)eventName) {
    //[[RDRCTEventEmitter shared] onRDListenerAddedForType:eventName];
}

RCT_REMAP_METHOD(takeOff,
                 config:(NSDictionary *)config
                 takeOff_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
//    RDRCTStorage.rdConfig = config;
//    [self attemptTakeOff];
//    resolve(@(RD.isFlying));
}

RCT_REMAP_METHOD(isFlying,
                 isFlying_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
//    resolve(@(RD.isFlying));
}

RCT_REMAP_METHOD(takePendingEvents,
                 type:(NSString *)type
                 takePendingEvents_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {

//    resolve([[RDRCTEventEmitter shared] takePendingEventsWithType:type]);
}

RCT_EXPORT_METHOD(setUserNotificationsEnabled:(BOOL)enabled) {
    if (![self ensureRDReady]) {
        return;
    }

//    [RD push].userPushNotificationsEnabled = enabled;
}

RCT_EXPORT_METHOD(enableChannelCreation) {
    if (![self ensureRDReady]) {
        return;
    }

//    [[RD channel] enableChannelCreation];
}

RCT_REMAP_METHOD(setEnabledFeatures,
                 features:(NSArray *) features
                 setEnabledFeatures_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {

    if (![self ensureRDReady:reject]) {
        return;
    }


    if ([RDRCTUtils isValidFeatureArray:features]) {
//        [RD shared].privacyManager.enabledFeatures = [RDRCTUtils stringArrayToFeatures:features];
        resolve(@(YES));
    } else {
        NSString *code = [NSString stringWithFormat:RDRCTStatusInvalidFeature];
        NSString *errorMessage = [NSString stringWithFormat:RDRCTErrorDescriptionInvalidFeature];
        NSError *error =  [NSError errorWithDomain:RDRCTErrorDomain
                                              code:RDRCTErrorCodeInvalidFeature
                                          userInfo:@{NSLocalizedDescriptionKey:errorMessage}];
        reject(code, errorMessage, error);
    }
}

RCT_REMAP_METHOD(getEnabledFeatures,
                 getEnabledFeatures_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    if (![self ensureRDReady:reject]) {
        return;
    }

//    resolve([RDRCTUtils featureToStringArray:[RD shared].privacyManager.enabledFeatures]);
}

RCT_REMAP_METHOD(enableFeature,
                 features:(NSArray *) features
                 enableFeature_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    if (![self ensureRDReady:reject]) {
        return;
    }

    if ([RDRCTUtils isValidFeatureArray:features]) {
//        [[RD shared].privacyManager enableFeatures:[RDRCTUtils stringArrayToFeatures:features]];
//        resolve(@(YES));
    } else {
        NSString *code = [NSString stringWithFormat:RDRCTStatusInvalidFeature];
        NSString *errorMessage = [NSString stringWithFormat:RDRCTErrorDescriptionInvalidFeature];
        NSError *error =  [NSError errorWithDomain:RDRCTErrorDomain
                                              code:RDRCTErrorCodeInvalidFeature
                                          userInfo:@{NSLocalizedDescriptionKey:errorMessage}];
        reject(code, errorMessage, error);
    }
}

RCT_REMAP_METHOD(disableFeature,
                 features:(NSArray *) features
                 disableFeature_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    if (![self ensureRDReady:reject]) {
        return;
    }

    if ([RDRCTUtils isValidFeatureArray:features]) {
//        [[RD shared].privacyManager disableFeatures:[RDRCTUtils stringArrayToFeatures:features]];
        resolve(@(YES));
    } else {
        NSString *code = [NSString stringWithFormat:RDRCTStatusInvalidFeature];
        NSString *errorMessage = [NSString stringWithFormat:RDRCTErrorDescriptionInvalidFeature];
        NSError *error =  [NSError errorWithDomain:RDRCTErrorDomain
                                              code:RDRCTErrorCodeInvalidFeature
                                          userInfo:@{NSLocalizedDescriptionKey:errorMessage}];
        reject(code, errorMessage, error);
    }
}

RCT_REMAP_METHOD(isFeatureEnabled,
                 features:(NSArray *)features
                 isFeatureEnabled_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {

    if (![self ensureRDReady:reject]) {
        return;
    }

    if ([RDRCTUtils isValidFeatureArray:features]) {
//        resolve(@([[RD shared].privacyManager isEnabled:[RDRCTUtils stringArrayToFeatures:features]]));
    } else {
        NSString *code = [NSString stringWithFormat:RDRCTStatusInvalidFeature];
        NSString *errorMessage = [NSString stringWithFormat:RDRCTErrorDescriptionInvalidFeature];
        NSError *error =  [NSError errorWithDomain:RDRCTErrorDomain
                                              code:RDRCTErrorCodeInvalidFeature
                                          userInfo:@{NSLocalizedDescriptionKey:errorMessage}];
        reject(code, errorMessage, error);
    }
}

RCT_REMAP_METHOD(isUserNotificationsEnabled,
                 isUserNotificationsEnabled_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    if (![self ensureRDReady:reject]) {
        return;
    }

//    resolve(@([RD push].userPushNotificationsEnabled));
}

RCT_REMAP_METHOD(isUserNotificationsOptedIn,
                 isUserNotificationsOptedIn_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    if (![self ensureRDReady:reject]) {
        return;
    }

    BOOL optedIn = YES;
//    if (![RD push].deviceToken) {
//        print(@"Opted out: missing device token");
//        optedIn = NO;
//    }
//
//    if (![RD push].userPushNotificationsEnabled) {
//        print(@"Opted out: user push notifications disabled");
//        optedIn = NO;
//    }
//
//    if (![RD push].authorizedNotificationSettings) {
//        print(@"Opted out: no authorized notification settings");
//        optedIn = NO;
//    }
//
//    if (![[RD shared].privacyManager isEnabled:RDFeaturesPush]) {
//        print(@"Opted out: push is disabled");
//        optedIn = NO;
//    }
    resolve(@(optedIn));
}

RCT_REMAP_METHOD(isSystemNotificationsEnabledForApp,
                 isSystemNotificationsEnabledForApp_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    if (![self ensureRDReady:reject]) {
        return;
    }

//    BOOL optedIn = [RD push].authorizedNotificationSettings != 0;
//    resolve(@(optedIn));
}

RCT_REMAP_METHOD(enableUserPushNotifications,
                 enableUserPushNotifications_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    if (![self ensureRDReady:reject]) {
        return;
    }

//    [[RD push] enableUserPushNotifications:^(BOOL success) {
//        resolve(@(success));
//    }];
}

RCT_EXPORT_METHOD(setNamedUser:(NSString *)namedUser) {
    if (![self ensureRDReady]) {
        return;
    }

    namedUser = [namedUser stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]];
//    if (namedUser.length) {
//        [RD.contact identify:namedUser];
//    } else {
//        [RD.contact reset];
//    }
}

RCT_REMAP_METHOD(getNamedUser,
                 getNamedUser_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    if (![self ensureRDReady:reject]) {
        return;
    }

//    resolve(RD.contact.namedUserID);
}

RCT_EXPORT_METHOD(addTag:(NSString *)tag) {
    if (![self ensureRDReady]) {
        return;
    }
    if (tag) {
//        [RD.channel editTags:^(RDTagEditor *editor) {
//            [editor addTag:tag];
//        }];
    }
}

RCT_EXPORT_METHOD(removeTag:(NSString *)tag) {
    if (![self ensureRDReady]) {
        return;
    }

    if (tag) {
//        [RD.channel editTags:^(RDTagEditor *editor) {
//            [editor removeTag:tag];
//        }];
    }
}

RCT_REMAP_METHOD(getTags,
                 getTags_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    if (![self ensureRDReady:reject]) {
        return;
    }
//    resolve(RD.channel.tags ?: [NSArray array]);
}

RCT_REMAP_METHOD(getSubscriptionLists,
                 subscriptionTypes:(NSArray *)subscriptionTypes
                 getSubscriptionLists_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {

    if (![self ensureRDReady:reject]) {
        return;
    }

    NSSet *typedSet = [NSSet setWithArray:subscriptionTypes];
    if (!typedSet.count) {
        NSError *error = [RDErrors error:@"Failed to fetch subscription lists, no types."];
        reject(error.description, error.description, error);
        return;
    }
    
    dispatch_group_t group = dispatch_group_create();
    NSMutableDictionary *result = [NSMutableDictionary dictionary];
    __block NSError *resultError;
    
    dispatch_group_enter(group);
    
    if ([typedSet containsObject:@"channel"]) {
        dispatch_group_enter(group);
        
//        [RD.channel fetchSubscriptionListsWithCompletionHandler:^(NSArray<NSString *> * lists, NSError *error) {
//            @synchronized (result) {
//                result[@"channel"] = lists ?: @[];
//                if (!resultError) {
//                    resultError = error;
//                }
//            }
//            dispatch_group_leave(group);
//        }];
    }
    
    if ([typedSet containsObject:@"contact"]) {
        dispatch_group_enter(group);
        
//        [RD.contact fetchSubscriptionListsWithCompletionHandler:^(NSDictionary<NSString *,RDChannelScopes *> * lists, NSError *error) {
//
//            @synchronized (result) {
//                NSMutableDictionary *converted = [NSMutableDictionary dictionary];
//                for (NSString* identifier in lists.allKeys) {
//                    RDChannelScopes *scopes = lists[identifier];
//                    NSMutableArray *scopesArray = [NSMutableArray array];
//                    for (id scope in scopes.values) {
//                        RDChannelScope channelScope = (RDChannelScope)[scope intValue];
//                        [scopesArray addObject:[self getScopeString:channelScope]];
//                    }
//                    [converted setValue:scopesArray forKey:identifier];
//                }
//
//                result[@"contact"] = converted;
//
//                if (!resultError) {
//                    resultError = error;
//                }
//            }
//            dispatch_group_leave(group);
//        }];
    
    }
    
    dispatch_group_leave(group);

    dispatch_group_notify(group, dispatch_get_main_queue(), ^{
        if (resultError) {
            reject(resultError.description, resultError.description, resultError);
        } else {
            resolve(result);
        }
    });
}

- (NSString *)getScopeString:(RDChannelScope )scope {
    switch (scope) {
        case RDChannelScopeSms:
            return @"sms";
        case RDChannelScopeEmail:
            return @"email";
        case RDChannelScopeApp:
            return @"app";
        case RDChannelScopeWeb:
            return @"web";
    }
}

RCT_EXPORT_METHOD(setAnalyticsEnabled:(BOOL)enabled) {
    if (![self ensureRDReady]) {
        return;
    }

//    if (enabled) {
//        [[RD shared].privacyManager enableFeatures:RDFeaturesAnalytics];
//    } else {
//        [[RD shared].privacyManager disableFeatures:RDFeaturesAnalytics];
//    }
}

RCT_REMAP_METHOD(isAnalyticsEnabled,
                 isAnalyticsEnabled_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    if (![self ensureRDReady:reject]) {
        return;
    }

//    resolve(@([[RD shared].privacyManager isEnabled:RDFeaturesAnalytics]));
}

RCT_EXPORT_METHOD(trackScreen:(NSString *)screen) {
    if (![self ensureRDReady]) {
        return;
    }
//    [RD.analytics trackScreen:screen];
}

RCT_REMAP_METHOD(getChannelId,
                 getChannelId_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    if (![self ensureRDReady:reject]) {
        return;
    }

//    resolve(RD.channel.identifier);
}


RCT_REMAP_METHOD(getRegistrationToken,
                 getRegistrationToken_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    if (![self ensureRDReady:reject]) {
        return;
    }

//    resolve(RD.push.deviceToken);
}

RCT_REMAP_METHOD(associateIdentifier,
                 key:(NSString *)key
                 identifier:(NSString *)identifier) {
    if (![self ensureRDReady]) {
        return;
    }

//    RDAssociatedIdentifiers *identifiers = [RD.analytics currentAssociatedDeviceIdentifiers];
//    [identifiers setIdentifier:identifier forKey:key];
//    [RD.analytics associateDeviceIdentifiers:identifiers];
}

RCT_REMAP_METHOD(runAction,
                 name:(NSString *)name
                 value:(id)value
                 runAction_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    if (![self ensureRDReady:reject]) {
        return;
    }

//    [RDActionRunner runActionWithName:name
//                                value:value
//                            situation:RDSituationManualInvocation
//                    completionHandler:^(RDActionResult *actionResult) {
//
//                        NSString *resultString;
//                        NSString *code;
//                        NSString *errorMessage;
//                        NSError *error;
//
//                        switch (actionResult.status) {
//                            case RDActionStatusCompleted:
//                            {
//                                if (actionResult.value) {
//                                    //if the action completed with a result value, serialize into JSON
//                                    //accepting fragments so we can write lower level JSON values
//                                    resultString = [RDJSONUtils stringWithObject:actionResult.value options:NSJSONWritingFragmentsAllowed error:&error];
//                                    // If there was an error serializing, fall back to a string description.
//                                    if (error) {
//                                        error = error;
//                                        NSLog(@"Unable to serialize result value %@, falling back to string description", actionResult.value);
//                                        // JSONify the result string
//                                        resultString = [RDJSONUtils stringWithObject:[actionResult.value description] options:NSJSONWritingFragmentsAllowed error:&error];
//                                    }
//                                }
//                                //in the case where there is no result value, pass null
//                                resultString = resultString ?: @"null";
//                                break;
//                            }
//                            case RDActionStatusActionNotFound:
//                                errorMessage = [NSString stringWithFormat:@"No action found with name %@, skipping action.", name];
//                                code = @"STATUS_ACTION_NOT_FOUND";
//                                break;
//                            case RDActionStatusError:
//                                errorMessage = actionResult.error.localizedDescription;
//                                code = @"STATUS_EXECUTION_ERROR";
//                                break;
//                            case RDActionStatusArgumentsRejected:
//                                code = @"STATUS_REJECTED_ARGUMENTS";
//                                errorMessage = [NSString stringWithFormat:@"Action %@ rejected arguments.", name];
//                                break;
//                        }
//
//                        if (actionResult.status == RDActionStatusCompleted) {
//                            NSMutableDictionary *result = [NSMutableDictionary dictionary];
//                            [result setValue:actionResult.value forKey:@"value"];
//                            resolve(actionResult);
//                        }
//
//                        if (errorMessage) {
//                            reject(code, errorMessage, error);
//                        }
//
//                    }];
}

RCT_EXPORT_METHOD(editContactTagGroups:(NSArray *)operations) {
    if (![self ensureRDReady]) {
        return;
    }

//    [RD.contact editTagGroups:^(RDTagGroupsEditor * editor) {
//        [self applyTagGroupOperations:operations editor:editor];
//    }];
}

RCT_EXPORT_METHOD(editChannelTagGroups:(NSArray *)operations) {
    if (![self ensureRDReady]) {
        return;
    }

//    [RD.channel editTagGroups:^(RDTagGroupsEditor * editor) {
//        [self applyTagGroupOperations:operations editor:editor];
//    }];
}

RCT_EXPORT_METHOD(editChannelAttributes:(NSArray *)operations) {
    if (![self ensureRDReady]) {
        return;
    }

//    [RD.channel editAttributes:^(RDAttributesEditor *editor) {
//        [self applyAttributeOperations:operations editor:editor];
//    }];
}

RCT_EXPORT_METHOD(editContactAttributes:(NSArray *)operations) {
    if (![self ensureRDReady]) {
        return;
    }

//    [RD.contact editAttributes:^(RDAttributesEditor *editor) {
//        [self applyAttributeOperations:operations editor:editor];
//    }];
}

RCT_EXPORT_METHOD(editChannelSubscriptionLists:(NSArray *)subscriptionListUpdates) {
    if (![self ensureRDReady]) {
        return;
    }

//    RDSubscriptionListEditor* subscriptionListEditor = [[RD channel] editSubscriptionLists];
//    for (NSDictionary *subscriptionListUpdate in subscriptionListUpdates) {
//        NSString* listId = subscriptionListUpdate[@"listId"];
//        NSString* type = subscriptionListUpdate[@"type"];
//        if (listId && type) {
//            if ([type isEqualToString:@"subscribe"]) {
//                [subscriptionListEditor subscribe:listId];
//            } else if ([type isEqualToString:@"unsubscribe"]) {
//                [subscriptionListEditor unsubscribe:listId];
//            }
//        }
//    }
//    [subscriptionListEditor apply];
}

RCT_EXPORT_METHOD(editContactSubscriptionLists:(NSArray *)subscriptionListUpdates) {
    if (![self ensureRDReady]) {
        return;
    }

//    RDScopedSubscriptionListEditor* subscriptionListEditor = [[RD contact] editSubscriptionLists];
//
//    for (NSDictionary *subscriptionListUpdate in subscriptionListUpdates) {
//        NSString *listId = subscriptionListUpdate[@"listId"];
//        NSString *type = subscriptionListUpdate[@"type"];
//        NSString *scopeString = [subscriptionListUpdate[@"scope"] lowercaseString];
//
//        if (!listId || !type) {
//            continue;
//        }
//
//        RDChannelScope scope;
//        if ([scopeString isEqualToString:@"sms"]) {
//            scope = RDChannelScopeSms;
//        } else if ([scopeString isEqualToString:@"email"]) {
//            scope = RDChannelScopeEmail;
//        } else if ([scopeString isEqualToString:@"app"]) {
//            scope = RDChannelScopeApp;
//        } else if ([scopeString isEqualToString:@"web"]) {
//            scope = RDChannelScopeWeb;
//        } else {
//            continue;
//        }
//
//        if ([type isEqualToString:@"subscribe"]) {
//            [subscriptionListEditor subscribe:listId scope:scope];
//        } else if ([type isEqualToString:@"unsubscribe"]) {
//            [subscriptionListEditor unsubscribe:listId scope:scope];
//        }
//    }
//
//    [subscriptionListEditor apply];
}

RCT_EXPORT_METHOD(setNotificationOptions:(NSArray *)options) {
    if (![self ensureRDReady]) {
        return;
    }

    RDNotificationOptions notificationOptions = [RDRCTUtils optionsFromOptionsArray:options];
    NSLog(@"Notification options set: %lu from dictionary: %@", (unsigned long)notificationOptions, options);
//    RD.push.notificationOptions = notificationOptions;
//    [RD.push updateRegistration];
}

RCT_EXPORT_METHOD(setForegroundPresentationOptions:(NSArray *)options) {
    if (![self ensureRDReady]) {
        return;
    }

    UNNotificationPresentationOptions presentationOptions = UNNotificationPresentationOptionNone;

    if ([options containsObject:@"alert"]) {
        presentationOptions = presentationOptions | UNNotificationPresentationOptionAlert;
    }

    if ([options containsObject:@"badge"]) {
        presentationOptions = presentationOptions | UNNotificationPresentationOptionBadge;
    }

    if ([options containsObject:@"sound"]) {
        presentationOptions = presentationOptions | UNNotificationPresentationOptionSound;
    }
    
    NSLog(@"Foreground presentation options set: %lu from dictionary: %@", (unsigned long)presentationOptions, options);

//    [RD push].defaultPresentationOptions = presentationOptions;
//    RDRCTStorage.foregroundPresentationOptions = presentationOptions;
}


RCT_REMAP_METHOD(getNotificationStatus,
                 getNotificationStatus_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    if (![self ensureRDReady:reject]) {
        return;
    }
    
//    RDPush *push = RD.push;
//    BOOL isSystemEnabled = push.authorizedNotificationSettings != 0;
//    id result = @{
//        @"RDOptIn": @(push.isPushNotificationsOptedIn),
//        @"RDEnabled": @(push.userPushNotificationsEnabled),
//        @"systemEnabled": @(isSystemEnabled),
//        @"ios": @{
//            @"authorizedSettings": [RDRCTUtils authorizedSettingsArray:push.authorizedNotificationSettings],
//            @"authorizedStatus": [RDRCTUtils authorizedStatusString:push.authorizationStatus]
//        }
//    };
//
//    resolve(result);
}


RCT_EXPORT_METHOD(setAutobadgeEnabled:(BOOL)enabled) {
    if (![self ensureRDReady]) {
        return;
    }

//    [RD push].autobadgeEnabled = enabled;
}

RCT_REMAP_METHOD(isAutobadgeEnabled,
                 isAutobadgeEnabled_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {

    if (![self ensureRDReady:reject]) {
        return;
    }

//    resolve(@([RD push].autobadgeEnabled));
}

RCT_EXPORT_METHOD(setBadgeNumber:(NSInteger)badgeNumber) {
    if (![self ensureRDReady]) {
        return;
    }
//    [[RD push] setBadgeNumber:badgeNumber];
}

RCT_REMAP_METHOD(getBadgeNumber,
                 getBadgeNumber_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    if (![self ensureRDReady:reject]) {
        return;
    }

    resolve(@([UIApplication sharedApplication].applicationIconBadgeNumber));
}

RCT_EXPORT_METHOD(displayMessageCenter) {
    if (![self ensureRDReady]) {
        return;
    }

//    [[RDMessageCenter shared] display];
}

RCT_EXPORT_METHOD(dismissMessageCenter) {
    if (![self ensureRDReady]) {
        return;
    }

//    [[RDMessageCenter shared] dismiss];
}

RCT_REMAP_METHOD(displayMessage,
                 messageId:(NSString *)messageId
                 displayMessage_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {

    if (![self ensureRDReady:reject]) {
        return;
    }

//    [[RDMessageCenter shared] displayMessageForID:messageId];
    resolve(@YES);
}

RCT_REMAP_METHOD(dismissMessage,
                 dismissMessage_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {

    if (![self ensureRDReady:reject]) {
        return;
    }

//    [[RDMessageCenter shared] dismiss:YES];
    resolve(@YES);
}

RCT_REMAP_METHOD(getInboxMessages,
                 getInboxMessages_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {

    if (![self ensureRDReady:reject]) {
        return;
    }
    
    NSMutableArray *messages = [NSMutableArray array];
//    for (RDInboxMessage *message in [RDMessageCenter shared].messageList.messages) {
//
//        NSDictionary *icons = [message.rawMessageObject objectForKey:@"icons"];
//        NSString *iconUrl = [icons objectForKey:@"list_icon"];
//        NSNumber *sentDate = @([message.messageSent timeIntervalSince1970] * 1000);
//
//        NSMutableDictionary *messageInfo = [NSMutableDictionary dictionary];
//        [messageInfo setValue:message.title forKey:@"title"];
//        [messageInfo setValue:message.messageID forKey:@"id"];
//        [messageInfo setValue:sentDate forKey:@"sentDate"];
//        [messageInfo setValue:iconUrl forKey:@"listIconUrl"];
//        [messageInfo setValue:message.unread ? @NO : @YES  forKey:@"isRead"];
//        [messageInfo setValue:message.extra forKey:@"extras"];
//        [messageInfo setObject:message.deleted ? @YES : @NO forKey:@"isDeleted"];
//
//        [messages addObject:messageInfo];
//    }

    resolve(messages);
}

RCT_REMAP_METHOD(deleteInboxMessage,
                 messageId:(NSString *)messageId
                 deleteMessage_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {

    if (![self ensureRDReady:reject]) {
        return;
    }

//    RDInboxMessage *message = [[RDMessageCenter shared].messageList messageForID:messageId];
//
//    if (!message) {
//        NSError *error =  [NSError errorWithDomain:RDRCTErrorDomain
//                                              code:RDRCTErrorCodeMessageNotFound
//                                          userInfo:@{NSLocalizedDescriptionKey:RDRCTErrorDescriptionMessageNotFound}];
//
//        reject(RDRCTStatusMessageNotFound, RDRCTErrorDescriptionMessageNotFound, error);
//    } else {
//        [[RDMessageCenter shared].messageList markMessagesDeleted:@[message] completionHandler:^(){
//            resolve(@YES);
//        }];
//    }
}

RCT_REMAP_METHOD(markInboxMessageRead,
                 messageId:(NSString *)messageId
                 markMessageRead_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {

    if (![self ensureRDReady:reject]) {
        return;
    }

//    RDInboxMessage *message = [[RDMessageCenter shared].messageList messageForID:messageId];
//
//    if (!message) {
//        NSError *error =  [NSError errorWithDomain:RDRCTErrorDomain
//                                              code:RDRCTErrorCodeMessageNotFound
//                                          userInfo:@{NSLocalizedDescriptionKey:RDRCTErrorDescriptionMessageNotFound}];
//
//        reject(RDRCTStatusMessageNotFound, RDRCTErrorDescriptionMessageNotFound, error);
//    } else {
//        [[RDMessageCenter shared].messageList markMessagesRead:@[message] completionHandler:^(){
//            resolve(@YES);
//        }];
//    }
}

RCT_REMAP_METHOD(refreshInbox,
                 refreshInbox_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {

    if (![self ensureRDReady:reject]) {
        return;
    }

//    [[RDMessageCenter shared].messageList retrieveMessageListWithSuccessBlock:^(){
//        resolve(@YES);
//    } withFailureBlock:^(){
//        NSError *error =  [NSError errorWithDomain:RDRCTErrorDomain
//                                              code:RDRCTErrorCodeInboxRefreshFailed
//                                          userInfo:@{NSLocalizedDescriptionKey:RDRCTErrorDescriptionInboxRefreshFailed}];
//        reject(RDRCTStatusInboxRefreshFailed, RDRCTErrorDescriptionInboxRefreshFailed, error);
//    }];
}

RCT_EXPORT_METHOD(setAutoLaunchDefaultMessageCenter:(BOOL)enabled) {
    if (![self ensureRDReady]) {
        return;
    }
//    RDRCTStorage.autoLaunchMessageCenter = enabled;
}

RCT_EXPORT_METHOD(setCurrentLocale:(NSString *)localeIdentifier) {
    if (![self ensureRDReady]) {
        return;
    }
//    [RD.shared.localeManager setCurrentLocale:[NSLocale localeWithLocaleIdentifier:localeIdentifier]];
}

RCT_REMAP_METHOD(getCurrentLocale,
                 getCurrentLocale_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    if (![self ensureRDReady:reject]) {
        return;
    }

//    NSLocale *rdLocale = [[RD shared].localeManager currentLocale];
//    resolve(rdLocale.localeIdentifier);
}

RCT_EXPORT_METHOD(clearLocale) {
    if (![self ensureRDReady]) {
        return;
    }

//    [[RD shared].localeManager clearLocale];
}

RCT_EXPORT_METHOD(clearNotifications) {
    [[UNUserNotificationCenter currentNotificationCenter] removeAllDeliveredNotifications];
}

RCT_EXPORT_METHOD(clearNotification:(NSString *)identifier) {
    if (identifier) {
        [[UNUserNotificationCenter currentNotificationCenter] removeDeliveredNotificationsWithIdentifiers:@[identifier]];
    }
}

RCT_EXPORT_METHOD(setInAppAutomationDisplayInterval:(NSInteger)seconds) {
//    RDInAppAutomation.shared.inAppMessageManager.displayInterval = seconds;
}

RCT_REMAP_METHOD(getUnreadMessagesCount,
                 getUnreadMessagesCount_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    if (![self ensureRDReady:reject]) {
        return;
    }
    
//    resolve(@([RDMessageCenter shared].messageList.unreadCount));
}

RCT_REMAP_METHOD(getActiveNotifications,
                 getNotifications_resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    [[UNUserNotificationCenter currentNotificationCenter] getDeliveredNotificationsWithCompletionHandler:^(NSArray<UNNotification *> * _Nonnull notifications) {
        NSMutableArray *result = [NSMutableArray array];
        for(UNNotification *unnotification in notifications) {
            [result addObject:[RDRCTUtils eventBodyForNotificationContent:unnotification.request.content.userInfo notificationIdentifier:unnotification.request.identifier]];
        }

        resolve(result);
    }];
}

#pragma mark -
#pragma mark Helper methods

//- (void)applyTagGroupOperations:(NSArray *)operations editor:(RDTagGroupsEditor *)editor {
//    for (NSDictionary *operation in operations) {
//        NSArray *tags = operation[@"tags"] ?: @[];
//        NSString *group =  operation[@"group"];
//        NSString *operationType =  operation[@"operationType"];
//
//        if ([operationType isEqualToString:@"add"]) {
//            [editor addTags:tags group:group];
//        } else if ([operationType isEqualToString:@"remove"]) {
//            [editor removeTags:tags group:group];
//        } else if ([operationType isEqualToString:@"set"]) {
//            [editor setTags:tags group:group];
//        }
//    }
//}
//- (void)applyAttributeOperations:(NSArray *)operations editor:(RDAttributesEditor *)editor {
//    for (NSDictionary *operation in operations) {
//        NSString *action = operation[@"action"];
//        NSString *name = operation[@"key"];
//        id value = operation[@"value"];
//
//        if ([action isEqualToString:@"set"]) {
//            NSString *valueType = operation[@"type"];
//                if ([valueType isEqualToString:@"string"]) {
//                    [editor setString:value attribute:name];
//                } else if ([valueType isEqualToString:@"number"]) {
//                    [editor setNumber:value attribute:name];
//                } else if ([valueType isEqualToString:@"date"]) {
//                    // JavaScript's date type doesn't pass through the JS to native bridge. Dates are instead serialized as milliseconds since epoch.
//                    NSDate *date = [NSDate dateWithTimeIntervalSince1970:[(NSNumber *)value doubleValue] / 1000.0];
//                    [editor setDate:date attribute:name];
//                } else {
//                    print(@"Unknown channel attribute type: %@", valueType);
//                }
//        } else if ([action isEqualToString:@"remove"]) {
//            [editor removeAttribute:name];
//        }
//    }
//
//}

- (BOOL)ensureRDReady {
    return [self ensureRDReady:nil];
}

- (BOOL)ensureRDReady:(RCTPromiseRejectBlock)reject {
//    if (RD.isFlying) {
//        return YES;
//    }

    if (reject) {
        reject(@"INIT_NOT_CALLED", @"RelatedDigital not ready, init not called", nil);
    }
    return NO;
}

@end


