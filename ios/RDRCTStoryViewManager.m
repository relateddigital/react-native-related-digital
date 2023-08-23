//
//  RDRCTStoryViewManager.m
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 22.08.2023.
//

#import "RDRCTStoryViewManager.h"
#import "RDRCTStoryView.h"

#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>

@implementation RDRCTStoryViewManager

RCT_EXPORT_VIEW_PROPERTY(onItemClicked, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(actionId, NSString)
RCT_EXPORT_MODULE(RDRCTStoryView)

- (UIView *)view {
    return [[RDRCTStoryView alloc] init];
}

@end
