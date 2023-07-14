//
//  RDRCTListener.m
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 12.07.2023.
//

#import "RDRCTListener.h"
#import "react_native_related_digital-Swift.h"

NSString *const RDRCTRegistrationEventName = @"com.relateddigital.registration";
NSString *const RDRCTNotificationResponseEventName = @"com.relateddigital.notification_response";
NSString *const RDRCTPushReceivedEventName= @"com.relateddigital.push_received";
NSString *const RDRCTOptInStatusChangedEventName = @"com.relateddigital.notification_opt_in_status";


@interface RDRCTListener()
@property(nonatomic, strong) RDRCTEventEmitter *eventEmitter;
@end

@implementation RDRCTListener

+ (RDRCTListener *)shared {
    static RDRCTListener *rdListener_ = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        rdListener_ = [[RDRCTListener alloc] init];
    });
    return rdListener_;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        self.eventEmitter = [RDRCTEventEmitter shared];
    }
    return self;
}


#pragma mark RDPushNotificationDelegate
-(void)receivedForegroundNotification:(NSDictionary *)userInfo completionHandler:(void (^)(void))completionHandler {
    id body = [RDRCTUtils eventBodyForNotificationContent:userInfo notificationIdentifier:nil];
    [self.eventEmitter sendEventWithName:RDRCTPushReceivedEventName body:body];
    completionHandler();
}

-(void)receivedBackgroundNotification:(NSDictionary *)userInfo
                    completionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {

    id body = [RDRCTUtils eventBodyForNotificationContent:userInfo notificationIdentifier:nil];
    [self.eventEmitter sendEventWithName:RDRCTPushReceivedEventName body:body];
    completionHandler(UIBackgroundFetchResultNoData);
}

-(void)receivedNotificationResponse:(UNNotificationResponse *)notificationResponse
                  completionHandler:(void (^)(void))completionHandler {
    if ([notificationResponse.actionIdentifier isEqualToString:UNNotificationDismissActionIdentifier]) {
        completionHandler();
        return;
    }

    id body = [RDRCTUtils eventBodyForNotificationResponse:notificationResponse];
    [self.eventEmitter sendEventWithName:RDRCTNotificationResponseEventName body:body];
    completionHandler();
}

#pragma mark Channel Registration Events

- (void)channelRegistrationSucceeded:(NSNotification *)notification {
//    NSMutableDictionary *registrationBody = [NSMutableDictionary dictionary];

//    NSString *channelID = RD.channel.identifier;
//    NSString *deviceToken = [RD push].deviceToken;
//
//    [registrationBody setValue:channelID forKey:@"channelId"];
//    [registrationBody setValue:deviceToken forKey:@"registrationToken"];
//    [self.eventEmitter sendEventWithName:RDRCTRegistrationEventName body:registrationBody];
}


#pragma mark RDRegistrationDelegate

- (void)notificationAuthorizedSettingsDidChange:(RDAuthorizedNotificationSettings)authorizedSettings {
    NSDictionary *body = @{
        @"optIn": @(authorizedSettings != RDAuthorizedNotificationSettingsNone),
        @"authorizedNotificationSettings": [RDRCTUtils authorizedSettingsDictionary:authorizedSettings],
        @"authorizedSettings": [RDRCTUtils authorizedSettingsArray:authorizedSettings]
    };
    [self.eventEmitter sendEventWithName:RDRCTOptInStatusChangedEventName body:body];
}


@end
