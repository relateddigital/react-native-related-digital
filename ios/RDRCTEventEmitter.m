//
//  RDRCTEventEmitter.m
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 12.07.2023.
//

#import "RDRCTEventEmitter.h"
#import "RDRCTUtils.h"

@interface RDRCTEventEmitter ()
@property(nonatomic, strong) NSMutableArray *pendingEvents;
@end

NSString *const RDRCTPendingEventName = @"com.relateddigital.onPendingEvent";

NSString *const RDRCTEventNameKey = @"name";
NSString *const RDRCTEventBodyKey = @"body";

@implementation RDRCTEventEmitter

static RDRCTEventEmitter *sharedEventEmitter_;

+ (void)load {
  sharedEventEmitter_ = [[RDRCTEventEmitter alloc] init];
}

+ (RDRCTEventEmitter *)shared {
  return sharedEventEmitter_;
}

- (instancetype)init {
  self = [super init];
  if (self) {
    self.pendingEvents = [NSMutableArray array];
  }
  return self;
}

- (void)sendEventWithName:(NSString *)eventName {
  @synchronized(self.pendingEvents) {
    [self.pendingEvents addObject:@{RDRCTEventNameKey : eventName}];
    [self notifyPendingEvents];
  }
}

- (void)sendEventWithName:(NSString *)eventName body:(id)body {
  @synchronized(self.pendingEvents) {
    [self.pendingEvents
        addObject:@{RDRCTEventNameKey : eventName, RDRCTEventBodyKey : body}];
    [self notifyPendingEvents];
  }
}

- (void)notifyPendingEvents {
  [self.bridge enqueueJSCall:@"RCTDeviceEventEmitter"
                      method:@"emit"
                        args:@[ RDRCTPendingEventName ]
                  completion:nil];
}

- (NSArray *)takePendingEventsWithType:(NSString *)type {
  @synchronized(self.pendingEvents) {
    NSMutableArray *events = [NSMutableArray array];
    for (id event in [self.pendingEvents copy]) {
      if ([event[RDRCTEventNameKey] isEqualToString:type]) {
        [events addObject:event[RDRCTEventBodyKey]];
        [self.pendingEvents removeObject:event];
      }
    }
    return events;
  }
}

- (void)onRelatedDigitalListenerAddedForType:(NSString *)type {
  @synchronized(self.pendingEvents) {
    for (id event in [self.pendingEvents copy]) {
      if ([event[RDRCTEventNameKey] isEqualToString:type]) {
        [self notifyPendingEvents];
        break;
      }
    }
  }
}

@end
