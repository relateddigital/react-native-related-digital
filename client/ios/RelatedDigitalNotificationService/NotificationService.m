//
//  NotificationService.m
//  NotificationService
//
//  Created by Egemen Gülkılık on 1.05.2024.
//

#import "NotificationService.h"
#import "FirebaseMessaging.h"
#import "RelatedDigitalNotificationService.h"

@interface NotificationService ()

@property (nonatomic, strong) void (^contentHandler)(UNNotificationContent *contentToDeliver);
@property (nonatomic, strong) UNMutableNotificationContent *bestAttemptContent;

@end

@implementation NotificationService

- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler {
    self.contentHandler = contentHandler;
    self.bestAttemptContent = [request.content mutableCopy];
  
    if (self.bestAttemptContent) {
          NSMutableDictionary *userInfo = self.bestAttemptContent.userInfo.mutableCopy;
          NSString *emPushSp = userInfo[@"emPushSp"];
          if (emPushSp) {
              NSLog(@"emPushSp: %@", emPushSp);
              [userInfo removeObjectForKey:@"fcm_options"];
              self.bestAttemptContent.userInfo = userInfo;

              [RelatedDigitalNotificationService didReceiveNotificationRequest:@"rniostestapptest" withBestAttemptContent:self.bestAttemptContent withContentHandler:self.contentHandler];
          }
          else {
            [[FIRMessaging extensionHelper] populateNotificationContent:self.bestAttemptContent withContentHandler:contentHandler];
          }
      }
    
    // Modify the notification content here...
    //self.bestAttemptContent.title = [NSString stringWithFormat:@"%@ [modified]", self.bestAttemptContent.title];
    //self.contentHandler(self.bestAttemptContent);
}

- (void)serviceExtensionTimeWillExpire {
    // Called just before the extension will be terminated by the system.
    // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
    self.contentHandler(self.bestAttemptContent);
}

@end
