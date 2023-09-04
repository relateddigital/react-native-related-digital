//
//  RDRCTBannerViewManager.m
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 4.09.2023.
//

#import "RDRCTBannerViewManager.h"

#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>

#import "react_native_related_digital-Swift.h"

@implementation RDRCTBannerViewManager

RCT_EXPORT_VIEW_PROPERTY(onClicked, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(properties, NSDictionary)
RCT_EXPORT_MODULE(RDRCTBannerView)

- (UIView *)view {
  return [[RDRCTBannerView alloc] init];
}

@end
