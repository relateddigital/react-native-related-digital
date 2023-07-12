//
//  RDErrors.h
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 12.07.2023.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface RDErrors : NSObject

+ (NSError *)parseError:(NSString *)message;
+ (NSError *)error:(NSString *)message;

@end

NS_ASSUME_NONNULL_END
