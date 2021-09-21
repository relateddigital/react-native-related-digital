#import <React/RCTEventEmitter.h>

@interface RelatedDigitalPushModule : RCTEventEmitter

typedef void (^RNCRemoteNotificationCallback)(UIBackgroundFetchResult result);

+ (void)didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings;
+ (void)didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken;
+ (void)didReceiveRemoteNotification:(NSDictionary *)notification;
+ (void)didReceiveRemoteNotification:(NSDictionary *)notification fetchCompletionHandler:(RNCRemoteNotificationCallback)completionHandler;
+ (void)didFailToRegisterForRemoteNotificationsWithError:(NSError *)error;
+ (void)initVisilabs:(NSString *)organizationId profileId:(NSString *)profileId dataSource:(NSString *)dataSource inAppNotificationsEnabled:(BOOL)inAppNotificationsEnabled requestTimeoutSeconds:(int)requestTimeoutSeconds geofenceEnabled:(BOOL)geofenceEnabled maxGeofenceCount:(int)maxGeofenceCount;

@end
