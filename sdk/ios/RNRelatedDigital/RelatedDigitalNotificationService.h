#import <UserNotifications/UserNotifications.h>

@interface RelatedDigitalNotificationService : NSObject
+ (void)didReceiveNotificationRequest:(NSString *)appAlias withBestAttemptContent:(UNMutableNotificationContent *)bestAttemptContent withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler;
@end
