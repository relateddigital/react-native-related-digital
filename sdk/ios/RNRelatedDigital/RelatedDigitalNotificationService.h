#import <UserNotifications/UserNotifications.h>

@interface RelatedDigitalNotificationService : NSObject
+ (void)didReceiveNotificationRequest:(UNMutableNotificationContent *_Nonnull)bestAttemptContent withContentHandler:(void (^_Nonnull)(UNNotificationContent * _Nonnull))contentHandler;
@end
