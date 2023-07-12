//
//  RDErrors.m
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 12.07.2023.
//

#import "RDErrors.h"

@implementation RDErrors

+ (NSError *)parseError:(NSString *)message {
    return [NSError errorWithDomain:@"com.relateddigital.parse_error" code:1 userInfo:@{NSLocalizedDescriptionKey: message}];
}

+ (NSError *)error:(NSString *)message {
    return [NSError errorWithDomain:@"com.relateddigital.error" code:1 userInfo:@{NSLocalizedDescriptionKey: message}];
}

@end
