//
//  RDRCTStoryView.h
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 22.08.2023.
//


#import <React/RCTView.h>

NS_ASSUME_NONNULL_BEGIN

@interface RDRCTStoryView : RCTView

@property (nonatomic, copy) RCTDirectEventBlock onItemClicked;
@property (nonatomic, copy) NSString *actionId;

@end

NS_ASSUME_NONNULL_END
