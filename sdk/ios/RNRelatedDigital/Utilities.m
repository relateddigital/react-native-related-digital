#import "Utilities.h"
#import <CoreTelephony/CTCarrier.h>
#import <CoreTelephony/CTTelephonyNetworkInfo.h>
#import <UIKit/UIKit.h>
#import "react_native_related_digital-Swift.h"

#import <sys/utsname.h>

@implementation Utilities

+ (NSString *)getOsVersion {
  UIDevice *device = [UIDevice currentDevice];
  return device.systemVersion;
}

+ (NSString *)getSdkVersion {
  NSString * version = [[NSBundle mainBundle] objectForInfoDictionaryKey: @"CFBundleShortVersionString"];
  return version;
}

+ (NSString *)getDeviceName {
  UIDevice *device = [UIDevice currentDevice];
  return device.name;
}

+ (NSString *)getDeviceType {
  struct utsname systemInfo;
  uname(&systemInfo);
  return [NSString stringWithCString:systemInfo.machine encoding:NSUTF8StringEncoding];
}

+ (NSString *)getLocale {
  return [[NSLocale preferredLanguages] objectAtIndex:0];
}

+ (NSString *)getCarrier {
  CTTelephonyNetworkInfo *netInfo = [[CTTelephonyNetworkInfo alloc] init];
  CTCarrier *ct = [netInfo subscriberCellularProvider];
  NSString *carrier = ct.mobileCountryCode ? [NSString stringWithFormat:@"%@%@", ct.mobileCountryCode, ct.mobileNetworkCode] : @"";
  
  return carrier;
}

+ (NSString *)getAppVersion {
  NSString * version = [[NSBundle mainBundle] objectForInfoDictionaryKey: @"CFBundleShortVersionString"];
  return version;
}

+ (NSString *)getDeviceUDID {
	return [RelatedDigitalBridge getIdentifierForVendor];
}

@end
