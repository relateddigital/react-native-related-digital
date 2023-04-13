//
//  NotificationService.swift
//  RelatedDigitalExampleNotificationServiceExtension
//
//  Created by Egemen Gülkılık on 13.04.2023.
//

import RelatedDigitalIOS
import UserNotifications

class NotificationService: UNNotificationServiceExtension {

  var contentHandler: ((UNNotificationContent) -> Void)?
  var bestAttemptContent: UNMutableNotificationContent?

  override func didReceive(
    _ request: UNNotificationRequest,
    withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void
  ) {
    self.contentHandler = contentHandler
    bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
    DispatchQueue.main.async {
      RelatedDigital.initialize(
        organizationId: "676D325830564761676D453D", profileId: "356467332F6533766975593D",
        dataSource: "visistore", launchOptions: nil)

      RelatedDigital.enablePushNotifications(
        appAlias: "RDIOSExample", launchOptions: nil,
        appGroupsKey: "group.com.relateddigital.RelatedDigitalExample.relateddigital")
      RDPush.didReceive(self.bestAttemptContent, withContentHandler: contentHandler)
    }

  }

  override func serviceExtensionTimeWillExpire() {
    // Called just before the extension will be terminated by the system.
    // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
    if let contentHandler = contentHandler, let bestAttemptContent = bestAttemptContent {
      contentHandler(bestAttemptContent)
    }
  }

}

