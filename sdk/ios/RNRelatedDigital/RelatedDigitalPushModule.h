#import <React/RCTEventEmitter.h>

@interface RelatedDigitalPushModule : RCTEventEmitter

typedef void (^RNCRemoteNotificationCallback)(UIBackgroundFetchResult result);
typedef void (^RNCActionButtonClickedCallback)(); // (void (^)());

+ (void)didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings;
+ (void)didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken;
+ (void)didReceiveRemoteNotification:(NSDictionary *)notification;
+ (void)didReceiveRemoteNotification:(NSDictionary *)notification fetchCompletionHandler:(RNCRemoteNotificationCallback)completionHandler;
+ (void)didFailToRegisterForRemoteNotificationsWithError:(NSError *)error;
+ (void)initRelatedDigital:(NSString *)organizationId profileId:(NSString *)profileId dataSource:(NSString *)dataSource appAlias:(NSString *)appAlias inAppNotificationsEnabled:(BOOL)inAppNotificationsEnabled requestTimeoutSeconds:(int)requestTimeoutSeconds geofenceEnabled:(BOOL)geofenceEnabled askLocationPermmissionAtStart:(BOOL)askLocationPermmissionAtStart maxGeofenceCount:(int)maxGeofenceCount isIDFAEnabled:(BOOL)isIDFAEnabled loggingEnabled:(BOOL)loggingEnabled deliveredBadge:(BOOL)deliveredBadge;
+ (void)setUserProperty: (NSString *) key withValue: (NSString *) value;
+ (void)handlePush:(NSDictionary *)userInfo;
+ (void)didClickActionButton:(UNNotificationResponse *)response fetchCompletionHandler:(RNCActionButtonClickedCallback)completionHandler;


@end
