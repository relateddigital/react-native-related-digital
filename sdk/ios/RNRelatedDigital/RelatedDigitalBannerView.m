//
//  RelatedDigitalBannerView.m
//  react-native-related-digital
//
//  Created by Baris Arslan on 18.04.2023.
//

#import "React/RCTViewManager.h"
@interface RCT_EXTERN_MODULE(BannerViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(properties, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(onItemClicked, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onRequestResult, RCTBubblingEventBlock)

@end


