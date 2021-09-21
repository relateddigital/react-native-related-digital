#import <Foundation/Foundation.h>
#import <React/RCTViewManager.h>

@interface Utilities : NSObject

+ (NSString *)getOsVersion;
+ (NSString *)getSdkVersion;
+ (NSString *)getDeviceName;
+ (NSString *)getDeviceType;
+ (NSString *)getLocale;
+ (NSString *)getCarrier;
+ (NSString *)getAppVersion;
+ (NSString *)getDeviceUDID;

@end
