//
//  NotificationService.m
//  RelatedDigitalNotificationService
//
//  Created by Baris Arslan on 8.09.2022.
//

#import "NotificationService.h"
#import "RelatedDigitalNotificationService.h"

@interface NotificationService ()

@property (nonatomic, strong) void (^contentHandler)(UNNotificationContent *contentToDeliver);
@property (nonatomic, strong) UNMutableNotificationContent *bestAttemptContent;

@end

@implementation NotificationService

- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler {
    self.contentHandler = contentHandler;
    self.bestAttemptContent = [request.content mutableCopy];
    
  [RelatedDigitalNotificationService didReceiveNotificationRequest:@"rniostestapptest" withBestAttemptContent:self.bestAttemptContent withContentHandler:self.contentHandler];
}

- (void)serviceExtensionTimeWillExpire {
    // Called just before the extension will be terminated by the system.
    // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
  [RelatedDigitalNotificationService didReceiveNotificationRequest:@"rniostestapptest" withBestAttemptContent:self.bestAttemptContent withContentHandler:self.contentHandler];
}

@end
