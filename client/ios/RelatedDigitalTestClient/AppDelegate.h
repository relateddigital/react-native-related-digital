#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

#import <UserNotifications/UNUserNotificationCenter.h>

@class RelatedDigitalLocationManager;

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
