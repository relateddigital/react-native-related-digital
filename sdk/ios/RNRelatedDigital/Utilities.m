#import "Utilities.h"
#import <CoreTelephony/CTCarrier.h>
#import <CoreTelephony/CTTelephonyNetworkInfo.h>
#import <UIKit/UIKit.h>
#import <sys/utsname.h>
#if __has_include(<react_native_related_digital-Swift.h>)
#import <react_native_related_digital-Swift.h>
#elif __has_include(<react_native_related_digital/react_native_related_digital-Swift.h>)
#import <react_native_related_digital/react_native_related_digital-Swift.h>
#else
#error "Header file for react_native_related_digital module not found."
#endif

@implementation Utilities

+ (NSString *)getOsVersion {
  UIDevice *device = [UIDevice currentDevice];
  return device.systemVersion;
}

+ (NSString *)getSdkVersion {
  return @"2.4.1";
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
