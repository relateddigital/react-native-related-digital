#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(StoryViewManager, RCTViewManager)
	RCT_EXPORT_VIEW_PROPERTY(actionId, NSString)
	RCT_EXPORT_VIEW_PROPERTY(onItemClicked, RCTBubblingEventBlock)
@end
