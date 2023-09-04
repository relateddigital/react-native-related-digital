//
//  RDRCTInlineNpsWithNumbersViewManager.m
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 4.09.2023.
//

#import "RDRCTInlineNpsWithNumbersViewManager.h"

#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>

#import "react_native_related_digital-Swift.h"

@implementation RDRCTInlineNpsWithNumbersViewManager

RCT_EXPORT_VIEW_PROPERTY(npsItemClicked, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(properties, NSDictionary)
RCT_EXPORT_MODULE(RDRCTInlineNpsWithNumbersView)

- (UIView *)view {
  return [[RDRCTInlineNpsWithNumbersView alloc] init];
}

@end
