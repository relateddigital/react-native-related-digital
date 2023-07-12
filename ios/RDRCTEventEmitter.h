//
//  RDRCTEventEmitter.h
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 12.07.2023.
//

#import <Foundation/Foundation.h>
#import <React/RCTEventEmitter.h>

@interface RDRCTEventEmitter : NSObject

@property(nonatomic, weak) RCTBridge *bridge;

+ (RDRCTEventEmitter *)shared;

- (void)sendEventWithName:(NSString *)eventName;
- (void)sendEventWithName:(NSString *)eventName body:(id)body;
- (NSArray *)takePendingEventsWithType:(NSString *)type;
- (void)onRelatedDigitalListenerAddedForType:(NSString *)type;

@end
