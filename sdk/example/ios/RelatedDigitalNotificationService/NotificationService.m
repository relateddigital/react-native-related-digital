//
//  NotificationService.m
//  RelatedDigitalNotificationService
//
//  Created by Baris Arslan on 3.09.2025.
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
            [RelatedDigitalNotificationService didReceiveNotificationRequest:@"rniostestapptest2" withBestAttemptContent:self.bestAttemptContent withContentHandler:self.contentHandler];
        } else {
            [[FIRMessaging extensionHelper] populateNotificationContent:self.bestAttemptContent withContentHandler:contentHandler];
        }
    }
}

- (void)serviceExtensionTimeWillExpire {
    self.contentHandler(self.bestAttemptContent);
}

@end
