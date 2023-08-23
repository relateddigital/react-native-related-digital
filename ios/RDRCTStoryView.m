//
//  RDRCTStoryView.m
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 22.08.2023.
//


#import "RDRCTStoryView.h"
#import "react_native_related_digital-Swift.h"

@interface RDRCTStoryView()
@end

NSString *const RDRCTStoryViewActionIDKey = @"actionId";
int const RDRCTStoryViewTag = 1903;

@implementation RDRCTStoryView

- (instancetype)init {
  self = [super initWithFrame:CGRectZero];
  return self;
}

- (void)setActionID:(NSString *)actionId {
  _actionId = actionId;

  dispatch_async(dispatch_get_main_queue(), ^{
    [self layoutSubviews];
  });
}

- (void)layoutSubviews {
  [self setupView];
}

- (void)setupView {
  if ([self viewWithTag:RDRCTStoryViewTag]) {
    [[self viewWithTag:RDRCTStoryViewTag] removeFromSuperview];
  }

  [RDRCTHelper.shared getStoryView:nil
                   withUrlDelegate:nil
             withCompletionHandler:^(RDRCTStoryView *storyView) {
      if(storyView != nil) {
          
      }
      
      
             }];

    /*
  let storyView : VisilabsStoryHomeView if (actionId != nil && actionId != "") {
    storyView = Visilabs.callAPI().getStoryView(actionId : Int(actionId !), urlDelegate : self)
  }
  else {storyView = Visilabs.callAPI().getStoryView(actionId
                                                    : nil, urlDelegate
                                                    : self)}

  storyView.tag = RDStoryView
                      .viewTag

                          self.addSubview(storyView) storyView.frame = self.frame
     */
}

- (void)close {
  NSString *actionId = self.actionId ?: @"";
  if (self.onItemClicked) {
    self.onItemClicked(@{RDRCTStoryViewActionIDKey : actionId});
  }
  self.actionId = nil;
}

@end
