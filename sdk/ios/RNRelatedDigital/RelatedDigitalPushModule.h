#import <React/RCTEventEmitter.h>

@interface RelatedDigitalPushModule : RCTEventEmitter

typedef void (^RNCRemoteNotificationCallback)(UIBackgroundFetchResult result);

+ (void)didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings;
+ (void)didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken;
+ (void)didReceiveRemoteNotification:(NSDictionary *)notification;
+ (void)didReceiveRemoteNotification:(NSDictionary *)notification fetchCompletionHandler:(RNCRemoteNotificationCallback)completionHandler;
+ (void)didFailToRegisterForRemoteNotificationsWithError:(NSError *)error;
+ (void)initRelatedDigital:(NSString *)organizationId profileId:(NSString *)profileId dataSource:(NSString *)dataSource appAlias:(NSString *)appAlias inAppNotificationsEnabled:(BOOL)inAppNotificationsEnabled requestTimeoutSeconds:(int)requestTimeoutSeconds geofenceEnabled:(BOOL)geofenceEnabled maxGeofenceCount:(int)maxGeofenceCount isIDFAEnabled:(BOOL)isIDFAEnabled loggingEnabled:(BOOL)loggingEnabled;

@end
