//
//  RDRCTUtils.m
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 5.07.2023.
//

#import "RDRCTUtils.h"
#import <UserNotifications/UserNotifications.h>

@implementation RDRCTUtils

+ (NSString *)authorizedStatusString:(RDAuthorizationStatus)status {
    switch (status) {
        case RDAuthorizationStatusDenied:
            return @"denied";
        case RDAuthorizationStatusEphemeral:
            return @"ephemeral";
        case RDAuthorizationStatusAuthorized:
            return @"authorized";
        case RDAuthorizationStatusProvisional:
            return @"provisional";
        case RDAuthorizationStatusNotDetermined:
        default:
            return @"notDetermined";
    }
}

+ (RDNotificationOptions)optionsFromOptionsArray:(NSArray *)options {
    RDNotificationOptions notificationOptions = RDNotificationOptionNone;

    if ([options containsObject:@"alert"]) {
        notificationOptions = notificationOptions | RDNotificationOptionAlert;
    }

    if ([options containsObject:@"badge"]) {
        notificationOptions = notificationOptions | RDNotificationOptionBadge;
    }

    if ([options containsObject:@"sound"]) {
        notificationOptions = notificationOptions | RDNotificationOptionSound;
    }
    
    if ([options containsObject:@"carPlay"]) {
        notificationOptions = notificationOptions | RDNotificationOptionCarPlay;
    }
    
    if ([options containsObject:@"criticalAlert"]) {
        notificationOptions = notificationOptions | RDNotificationOptionCriticalAlert;
    }
    
    if ([options containsObject:@"providesAppNotificationSettings"]) {
        notificationOptions = notificationOptions | RDNotificationOptionProvidesAppNotificationSettings;
    }
    
    if ([options containsObject:@"provisional"]) {
        notificationOptions = notificationOptions | RDNotificationOptionProvisional;
    }
    
    return notificationOptions;
}

+ (NSArray<NSString *> *)authorizedSettingsArray:(RDAuthorizedNotificationSettings)settings {
    NSMutableArray *settingsArray = [NSMutableArray array];
    if (settings & RDAuthorizedNotificationSettingsAlert) {
        [settingsArray addObject:@"alert"];
    }
    if (settings & RDAuthorizedNotificationSettingsBadge) {
        [settingsArray addObject:@"badge"];
    }
    if (settings & RDAuthorizedNotificationSettingsSound) {
        [settingsArray addObject:@"sound"];
    }
    if (settings & RDAuthorizedNotificationSettingsCarPlay) {
        [settingsArray addObject:@"carPlay"];
    }
    if (settings & RDAuthorizedNotificationSettingsLockScreen) {
        [settingsArray addObject:@"lockScreen"];
    }
    if (settings & RDAuthorizedNotificationSettingsNotificationCenter) {
        [settingsArray addObject:@"notificationCenter"];
    }
    if (settings & RDAuthorizedNotificationSettingsAnnouncement) {
        [settingsArray addObject:@"announcement"];
    }
    if (settings & RDAuthorizedNotificationSettingsScheduledDelivery) {
        [settingsArray addObject:@"scheduledDelivery"];
    }
    if (settings & RDAuthorizedNotificationSettingsTimeSensitive) {
        [settingsArray addObject:@"timeSensitive"];
    }
    
    return settingsArray;
}

+ (NSDictionary *)authorizedSettingsDictionary:(RDAuthorizedNotificationSettings)settings {
    return @{
        @"alert" : @(settings & RDAuthorizedNotificationSettingsAlert),
        @"badge" : @(settings & RDAuthorizedNotificationSettingsBadge),
        @"sound" : @(settings & RDAuthorizedNotificationSettingsSound),
        @"carPlay" : @(settings & RDAuthorizedNotificationSettingsCarPlay),
        @"lockScreen" : @(settings & RDAuthorizedNotificationSettingsLockScreen),
        @"notificationCenter" : @(settings & RDAuthorizedNotificationSettingsNotificationCenter),
        @"criticalAlert" : @(settings & RDAuthorizedNotificationSettingsNotificationCenter),
        @"announcement" : @(settings & RDAuthorizedNotificationSettingsNotificationCenter),
        @"scheduledDelivery" : @(settings & RDAuthorizedNotificationSettingsNotificationCenter),
        @"timeSensitive" : @(settings & RDAuthorizedNotificationSettingsNotificationCenter),
    };
}


+ (NSDictionary *)eventBodyForNotificationResponse:(UNNotificationResponse *)notificationResponse {
    NSMutableDictionary *body = [NSMutableDictionary dictionary];
    [body setValue:[self eventBodyForNotificationContent:notificationResponse.notification.request.content.userInfo notificationIdentifier:notificationResponse.notification.request.identifier]
            forKey:@"notification"];

    if ([notificationResponse.actionIdentifier isEqualToString:UNNotificationDefaultActionIdentifier]) {
        [body setValue:@(YES) forKey:@"isForeground"];
    } else {
        UNNotificationAction *notificationAction = [self notificationActionForCategory:notificationResponse.notification.request.content.categoryIdentifier
                                                                      actionIdentifier:notificationResponse.actionIdentifier];
        BOOL isForeground = notificationAction.options & UNNotificationActionOptionForeground;

        [body setValue:@(isForeground) forKey:@"isForeground"];
        [body setValue:notificationResponse.actionIdentifier forKey:@"actionId"];
    }

    return body;
}

+ (NSMutableDictionary *)eventBodyForNotificationContent:(NSDictionary *)userInfo notificationIdentifier:(NSString *)identifier {

    NSMutableDictionary *pushBody = [NSMutableDictionary dictionary];
    if (identifier != nil) {
        [pushBody setValue:identifier forKey:@"notificationId"];
    }

    // Extras
    NSMutableDictionary *extras = [NSMutableDictionary dictionaryWithDictionary:userInfo];
    [extras removeObjectForKey:@"aps"];
    [extras removeObjectForKey:@"_"];
    if (extras.count) {
        [pushBody setValue:extras forKey:@"extras"];
    }

    // Fill in the notification title, subtitle and body if exists
    NSDictionary* aps = userInfo[@"aps"];
    if (aps) {
        id alert = aps[@"alert"];
        if ([alert isKindOfClass:[NSDictionary class]]) {
            [pushBody setValue:alert[@"title"] forKey:@"title"];
            [pushBody setValue:alert[@"body"] forKey:@"alert"];
            [pushBody setValue:alert[@"subtitle"] forKey:@"subtitle"];
        } else {
            [pushBody setValue:alert forKey:@"alert"];
        }
    }

    return pushBody;
}

+ (UNNotificationAction *)notificationActionForCategory:(NSString *)category actionIdentifier:(NSString *)identifier {
//    NSSet *categories = [RDPush push].combinedCategories;
//
//    UNNotificationCategory *notificationCategory;
//    UNNotificationAction *notificationAction;
//
//    for (UNNotificationCategory *possibleCategory in categories) {
//        if ([possibleCategory.identifier isEqualToString:category]) {
//            notificationCategory = possibleCategory;
//            break;
//        }
//    }
//
//    if (!notificationCategory) {
//        RD_LERR(@"Unknown notification category identifier %@", category);
//        return nil;
//    }
//
//    NSMutableArray *possibleActions = [NSMutableArray arrayWithArray:notificationCategory.actions];
//
//    for (UNNotificationAction *possibleAction in possibleActions) {
//        if ([possibleAction.identifier isEqualToString:identifier]) {
//            notificationAction = possibleAction;
//            break;
//        }
//    }
//
//    if (!notificationAction) {
//        RD_LERR(@"Unknown notification action identifier %@", identifier);
//        return nil;
//    }
//
//    return notificationAction;
    return nil;
}

+ (BOOL)isValidFeatureArray:(NSArray *)stringArray {
    for (id value in stringArray) {
        if (![self.featureMap allKeysForObject:value].count) {
            return NO;
        }
    }
    return YES;
}

+ (RDFeatures)stringArrayToFeatures:(NSArray *)stringArray {
    RDFeatures result = RDFeaturesNone;
    for (id value in stringArray) {
        NSNumber *featureValue = [[self.featureMap allKeysForObject:value] firstObject];
        if (featureValue) {
            result |= [featureValue unsignedIntegerValue];
        }
    }
    return result;
}

+ (NSArray *)featureToStringArray:(RDFeatures)features {
    NSMutableArray *result = [NSMutableArray array];
    for (NSNumber *key in self.featureMap.allKeys) {
        NSUInteger value = [key unsignedIntegerValue];
        if (value == RDFeaturesAll) {
            if (features == RDFeaturesAll) {
                return @[self.featureMap[key]];
            }
            continue;
        }

        if (value == RDFeaturesNone) {
            if (features == RDFeaturesNone) {
                return @[self.featureMap[key]];
            }
            continue;
        }
        
        if (features & [key unsignedIntegerValue]) {
            [result addObject:self.featureMap[key]];
        }
    }
    return result;
}

+ (NSDictionary *)featureMap {
    static NSDictionary* _featureMap = nil;
    static dispatch_once_t _featureMapOnceToken;
    dispatch_once(&_featureMapOnceToken, ^{
        _featureMap = @{
            @(RDFeaturesInAppAutomation): @"FEATURE_IN_APP_AUTOMATION",
            @(RDFeaturesMessageCenter): @"FEATURE_MESSAGE_CENTER",
            @(RDFeaturesPush): @"FEATURE_PUSH",
            @(RDFeaturesChat): @"FEATURE_CHAT",
            @(RDFeaturesAnalytics): @"FEATURE_ANALYTICS",
            @(RDFeaturesTagsAndAttributes): @"FEATURE_TAGS_AND_ATTRIBUTES",
            @(RDFeaturesContacts): @"FEATURE_CONTACTS",
            @(RDFeaturesLocation): @"FEATURE_LOCATION",
            @(RDFeaturesNone): @"FEATURE_NONE",
            @(RDFeaturesAll): @"FEATURE_ALL",
        };
    });
    return _featureMap;
}
@end

