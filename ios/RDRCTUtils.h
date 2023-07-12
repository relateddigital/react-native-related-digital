//
//  RDRCTUtils.h
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 5.07.2023.
//

#import <Foundation/Foundation.h>
//@import UserNotifications;


/**
 * Notification options
 */
typedef NS_OPTIONS(NSUInteger, RDNotificationOptions) {
    RDNotificationOptionNone = 0,
    RDNotificationOptionBadge   = (1 << 0),
    RDNotificationOptionSound   = (1 << 1),
    RDNotificationOptionAlert   = (1 << 2),
    RDNotificationOptionCarPlay = (1 << 3),
    RDNotificationOptionCriticalAlert = (1 << 4),
    RDNotificationOptionProvidesAppNotificationSettings = (1 << 5),
    RDNotificationOptionProvisional = (1 << 6),
    RDNotificationOptionAnnouncement DEPRECATED_MSG_ATTRIBUTE("Deprecated") = (1 << 7),
};

/**
 * Authorized notification settings
 */
typedef NS_OPTIONS(NSUInteger, RDAuthorizedNotificationSettings) {
    RDAuthorizedNotificationSettingsNone = 0,
    RDAuthorizedNotificationSettingsBadge   = (1 << 0),
    RDAuthorizedNotificationSettingsSound   = (1 << 1),
    RDAuthorizedNotificationSettingsAlert   = (1 << 2),
    RDAuthorizedNotificationSettingsCarPlay = (1 << 3),
    RDAuthorizedNotificationSettingsLockScreen = (1 << 4),
    RDAuthorizedNotificationSettingsNotificationCenter = (1 << 5),
    RDAuthorizedNotificationSettingsCriticalAlert = (1 << 6),
    RDAuthorizedNotificationSettingsAnnouncement = (1 << 7),
    RDAuthorizedNotificationSettingsScheduledDelivery = (1 << 8),
    RDAuthorizedNotificationSettingsTimeSensitive = (1 << 9),
};

/**
 * Authorization status
 */
typedef NS_ENUM(NSInteger, RDAuthorizationStatus) {
    RDAuthorizationStatusNotDetermined = 0,
    RDAuthorizationStatusDenied,
    RDAuthorizationStatusAuthorized,
    RDAuthorizationStatusProvisional,
    RDAuthorizationStatusEphemeral,
};

/**
 * Enabled Features
 */
typedef NS_OPTIONS(NSUInteger, RDFeatures) {

    // Enables In-App Automation.
    // In addition to the default data collection, In-App Automation will collect:
    // - App Version (App update triggers)
    RDFeaturesInAppAutomation  = (1 << 0),
    
    // Enables Message Center.
    // In addition to the default data collection, Message Center will collect:
    // - Message Center User
    // - Message Reads & Deletes
    RDFeaturesMessageCenter   = (1 << 1),
    
    // Enables push.
    // In addition to the default data collection, push will collect:
    // - Push tokens
    RDFeaturesPush   = (1 << 2),
    
    // Enables RD Chat.
    // In addition to the default data collection, RD Chat will collect:
    // - User messages
    RDFeaturesChat = (1 << 3),
    
    // Enables analytics.
    // In addition to the default data collection, analytics will collect:
    // -  Events
    // - Associated Identifiers
    // - Registered Notification Types
    // - Time in app
    // - App Version
    // - Device model
    // - Device manufacturer
    // - OS version
    // - Carrier
    // - Connection type
    // - Framework usage
    RDFeaturesAnalytics = (1 << 4),
    
    // Enables tags and attributes.
    // In addition to the default data collection, tags and attributes will collect:
    // - Channel and Contact Tags
    // - Channel and Contact Attributes
    RDFeaturesTagsAndAttributes = (1 << 5),
    
    // Enables contacts.
    // In addition to the default data collection, contacts will collect:
    // External ids (named user)
    RDFeaturesContacts = (1 << 6),
    
    // Enables location (with Location module).
    // In addition to the default data collection, location will collect:
    // - Location permissions
    // - Collect location for the app (  no longer supports uploading location as events)
    RDFeaturesLocation = (1 << 7),
    
    // Sets enabled features to all.
    RDFeaturesAll = (RDFeaturesInAppAutomation | RDFeaturesMessageCenter | RDFeaturesPush | RDFeaturesChat | RDFeaturesAnalytics | RDFeaturesTagsAndAttributes | RDFeaturesContacts | RDFeaturesLocation)
} NS_SWIFT_NAME(Features);

// Sets enabled features to none.
static const RDFeatures RDFeaturesNone NS_SWIFT_UNAVAILABLE("Use [] instead.") = 0;


NS_ASSUME_NONNULL_BEGIN

@interface RDRCTUtils : NSObject

+ (RDNotificationOptions)optionsFromOptionsArray:(NSArray *)options;
+ (NSArray<NSString *> *)authorizedSettingsArray:(RDAuthorizedNotificationSettings)settings;
+ (NSDictionary *)authorizedSettingsDictionary:(RDAuthorizedNotificationSettings)settings;
+ (NSString *)authorizedStatusString:(RDAuthorizationStatus)status;

+ (NSDictionary *)eventBodyForNotificationContent:(NSDictionary *)userInfo notificationIdentifier:(nullable NSString *)identifier;

+ (NSDictionary *)eventBodyForNotificationResponse:(UNNotificationResponse *)notificationResponse;

+ (RDFeatures)stringArrayToFeatures:(NSArray *)stringArray;
+ (NSArray *)featureToStringArray:(RDFeatures)features;
+ (BOOL)isValidFeatureArray:(NSArray *)stringArray;
@end

NS_ASSUME_NONNULL_END

