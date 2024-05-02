#import "RelatedDigitalNotificationService.h"
#import <UserNotifications/UserNotifications.h>
#import <react_native_related_digital-Swift.h> // local
// #import <react_native_related_digital/react_native_related_digital-Swift.h>

@implementation RelatedDigitalNotificationService

+ (void)didReceiveNotificationRequest:(NSString *)appAlias withBestAttemptContent:(UNMutableNotificationContent *)bestAttemptContent withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler {
  
  NSDictionary *userInfo = bestAttemptContent.userInfo;
  if (userInfo == nil) {
    contentHandler(bestAttemptContent);
    return;
  }
  
    [RelatedDigitalBridge didReceiveWithAlias:appAlias bestAttemptContent:bestAttemptContent withContentHandler:contentHandler];
        return;
    
  NSString *mediaUrl = userInfo[@"mediaUrl"];
  NSString *mediaType = userInfo[@"pushType"];
  
  if (mediaUrl == nil || mediaType == nil) {
    contentHandler(bestAttemptContent);
    return;
  }
  
  [self loadAttachmentForUrlString:mediaUrl
                          withType:mediaType
                 completionHandler:^(UNNotificationAttachment *attachment) {
    if (attachment) {
      bestAttemptContent.attachments = [NSArray arrayWithObject:attachment];
    }
    contentHandler(bestAttemptContent);
  }];
  
}

+ (NSString *)fileExtensionForMediaType:(NSString *)mimeType contentType: (NSString *)contentType{
  NSString *ext = @"tmp";
  
  if([contentType isEqualToString:@"Image"]) {
    ext = @"jpg";
  }
  else if([contentType isEqualToString:@"Video"]) {
    ext = @"mp4";
  }
  
  if ([mimeType isEqualToString:@"video/mp4"]) {
    ext = @"mp4";
  }
  else if ([mimeType isEqualToString:@"video/quicktime"]) {
    ext = @"mov";
  }
  else if ([mimeType isEqualToString:@"image/jpeg"]) {
    ext = @"jpg";
  }
  else if ([mimeType isEqualToString:@"image/gif"]) {
    ext = @"gif";
  }
  else if ([mimeType isEqualToString:@"image/png"]) {
    ext = @"png";
  }
  
  return [@"." stringByAppendingString:ext];
}

+ (void)loadAttachmentForUrlString:(NSString *)urlString withType:(NSString *)type completionHandler:(void(^)(UNNotificationAttachment *))completionHandler  {
  
  __block UNNotificationAttachment *attachment = nil;
  NSURL *attachmentURL = [NSURL URLWithString:urlString];
  
  NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]];
  [[session downloadTaskWithURL:attachmentURL
              completionHandler:^(NSURL *temporaryFileLocation, NSURLResponse *response, NSError *error) {
    if (error != nil) {
      NSLog(@"%@", error.localizedDescription);
    } else {
      NSString *fileExt = [self fileExtensionForMediaType:response.MIMEType contentType:type];
      
      NSFileManager *fileManager = [NSFileManager defaultManager];
      NSURL *localURL = [NSURL fileURLWithPath:[temporaryFileLocation.path stringByAppendingString:fileExt]];
      [fileManager moveItemAtURL:temporaryFileLocation toURL:localURL error:&error];
      
      NSError *attachmentError = nil;
      attachment = [UNNotificationAttachment attachmentWithIdentifier:@"" URL:localURL options:nil error:&attachmentError];
      if (attachmentError) {
        NSLog(@"%@", attachmentError.localizedDescription);
      }
    }
    completionHandler(attachment);
  }] resume];
}
@end
