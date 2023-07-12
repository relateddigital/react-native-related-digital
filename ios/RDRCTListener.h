//
//  RDRCTListener.h
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 12.07.2023.
//

#import <Foundation/Foundation.h>
#import <UserNotifications/UserNotifications.h>
#import <UserNotifications/UNUserNotificationCenter.h>
#import "RDRCTUtils.h"


NS_ASSUME_NONNULL_BEGIN

@protocol RDPushNotificationDelegate <NSObject>
@optional
- (void)receivedForegroundNotification:(NSDictionary *)userInfo completionHandler:(void (^)(void))completionHandler;
- (void)receivedBackgroundNotification:(NSDictionary *)userInfo
                     completionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;
- (void)receivedNotificationResponse:(UNNotificationResponse *)notificationResponse
                   completionHandler:(void (^)(void))completionHandler;
- (UNNotificationPresentationOptions)extendPresentationOptions:(UNNotificationPresentationOptions)options
                                                  notification:(UNNotification *)notification;
@end

@protocol RDRegistrationDelegate <NSObject>
@optional
- (void)notificationRegistrationFinishedWithAuthorizedSettings:(RDAuthorizedNotificationSettings)authorizedSettings
                                                    categories:(NSSet<UNNotificationCategory *> *)categories
                                                        status:(RDAuthorizationStatus)status;
- (void)notificationRegistrationFinishedWithAuthorizedSettings:(RDAuthorizedNotificationSettings)authorizedSettings
                                                        status:(RDAuthorizationStatus)status;
- (void)notificationAuthorizedSettingsDidChange:(RDAuthorizedNotificationSettings)authorizedSettings;
- (void)apnsRegistrationSucceededWithDeviceToken:(NSData *)deviceToken;
- (void)apnsRegistrationFailedWithError:(NSError *)error;
@end



@interface RDRCTListener : NSObject <RDPushNotificationDelegate, RDRegistrationDelegate>

+ (instancetype)shared;

@end

NS_ASSUME_NONNULL_END
