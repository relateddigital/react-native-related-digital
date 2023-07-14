//
//  RDRCTListener.swift
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 14.07.2023.
//


import Foundation
import RelatedDigitalIOS
import UserNotifications

fileprivate typealias NativeRD = RelatedDigitalIOS.RelatedDigital
fileprivate typealias UIA = UIApplication
fileprivate typealias NC = NotificationCenter
fileprivate typealias UNUNC = UNUserNotificationCenter


@objc(RDPushNotificationDelegate)
public protocol PushNotificationDelegate: NSObjectProtocol {
    @objc
    optional func receivedForegroundNotification(_ userInfo: [AnyHashable : Any], completionHandler: @escaping () -> Void)
#if !os(watchOS)
    @objc
    optional func receivedBackgroundNotification(_ userInfo: [AnyHashable : Any], completionHandler: @escaping (UIBackgroundFetchResult) -> Void)
#else
    @objc
    optional func receivedBackgroundNotification(_ userInfo: [AnyHashable : Any], completionHandler: @escaping (WKBackgroundFetchResult) -> Void)
#endif
#if !os(tvOS)
    @objc
    optional func receivedNotificationResponse(_ notificationResponse: UNNotificationResponse, completionHandler: @escaping () -> Void)
#endif
    @objc(extendPresentationOptions:notification:)
    optional func extend(_ options: UNNotificationPresentationOptions, notification: UNNotification) -> UNNotificationPresentationOptions
}


@objc(RDRegistrationDelegate)
public protocol RegistrationDelegate: NSObjectProtocol {
#if !os(tvOS)
    @objc
    optional func notificationRegistrationFinished(
        withAuthorizedSettings authorizedSettings: RDAuthorizedNotificationSettings,
        categories: Set<UNNotificationCategory>,
        status: RDAuthorizationStatus
    )
#endif
    @objc
    optional func notificationRegistrationFinished(
        withAuthorizedSettings authorizedSettings: RDAuthorizedNotificationSettings,
        status: RDAuthorizationStatus
    )
    @objc optional func notificationAuthorizedSettingsDidChange(_ authorizedSettings: RDAuthorizedNotificationSettings)
    
    @objc optional func apnsRegistrationSucceeded(withDeviceToken deviceToken: Data)

    
    @objc optional func apnsRegistrationFailedWithError(_ error: Error)
}




@objc public class RDRCTListener: NSObject
//, RDPushNotificationDelegate, RDRegistrationDelegate, RDDeepLinkDelegate, RDMessageCenterDisplayDelegate
{

    @objc public static let shared = RDRCTListener()

    let eventEmitter = RDRCTEventEmitter.shared

    private override init() {
//        super.init()
//
//        NC.default.addObserver(self, selector: #selector(inboxUpdated), name: NSNotification.Name(rawValue: RDInboxMessageListUpdatedNotification), object: nil)
//
//        NC.default.addObserver(self, selector: #selector(channelRegistrationSucceeded), name: NSNotification.Name(rawValue: RDChannel.channelUpdatedEvent), object: nil)
    }

    // MARK: RDDeepLinkDelegate

    func receivedDeepLink(_ deepLink: URL, completionHandler: @escaping () -> Void) {
//        let body = ["deepLink" : deepLink.absoluteString]
//        eventEmitter().sendEvent(withName: RDRCTDeepLinkEventName, body: body)
//        completionHandler()
    }

    // MARK: RDPushDelegate

    func receivedForegroundNotification(_ userInfo: [AnyHashable : Any], completionHandler: @escaping () -> Void) {
//        let body = RDRCTUtils.eventBody(forNotificationContent: userInfo, notificationIdentifier: nil)
//        eventEmitter.sendEvent(withName: RDRCTPushReceivedEventName, body: body)
//        completionHandler()
    }

    func receivedBackgroundNotification(_ userInfo: [AnyHashable : Any], completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
//        let body = RDRCTUtils.eventBody(forNotificationContent: userInfo, notificationIdentifier: nil)
//        eventEmitter.sendEvent(withName: RDRCTPushReceivedEventName, body: body)
//        completionHandler(.noData)
    }

    func receivedNotificationResponse(_ notificationResponse: UNNotificationResponse, completionHandler: @escaping () -> Void) {
        if notificationResponse.actionIdentifier == UNNotificationDismissActionIdentifier {
            completionHandler()
            return
        }

//        let body = RDRCTUtils.eventBody(forNotificationResponse: notificationResponse)
//        eventEmitter.sendEvent(withName: RDRCTNotificationResponseEventName, body: body)
//        completionHandler()
    }

    // MARK: Channel Registration Events

    @objc func channelRegistrationSucceeded(_ notification: Notification) {
        //var registrationBody = [String: Any]()

        //let channelID = RelatedDigital.channel.identifier
        //let deviceToken = RelatedDigital.push().deviceToken

        //registrationBody["channelId"] = channelID
        //registrationBody["registrationToken"] = deviceToken
        //eventEmitter.sendEvent(withName: RDRCTRegistrationEventName, body: registrationBody)
    }

    // MARK: RDRegistrationDelegate

    func notificationAuthorizedSettingsDidChange(_ authorizedSettings: RDAuthorizedNotificationSettings) {
//        let body = [
//            "optIn": authorizedSettings != .none,
//            "authorizedNotificationSettings": RDRCTUtils.authorizedSettingsDictionary(authorizedSettings),
//            "authorizedSettings": RDRCTUtils.authorizedSettingsArray(authorizedSettings)
//        ]
//        eventEmitter.sendEvent(withName: RDRCTOptInStatusChangedEventName, body: body)
    }

    // MARK: Message Center

    func displayMessageCenter(forMessageID messageID: String, animated: Bool) {
//        if RDRCTStorage.autoLaunchMessageCenter {
//            RDMessageCenter.shared().defaultUI.displayMessageCenter(forMessageID: messageID, animated: animated)
//        } else {
//            eventEmitter.sendEvent(withName: RDRCTShowInboxEventName, body: ["messageId": messageID])
//        }
    }

    func dismissMessageCenter(animated: Bool) {
//        if RDRCTStorage.autoLaunchMessageCenter {
//            RDMessageCenter.shared().defaultUI.dismissMessageCenter(animated: animated)
//        }
    }

    @objc func inboxUpdated() {
//        let body = [
//            "messageUnreadCount": RDMessageCenter.shared().messageList.unreadCount,
//            "messageCount": RDMessageCenter.shared().messageList.messageCount
//        ]
//
//        eventEmitter.sendEvent(withName: RDRCTInboxUpdatedEventName, body: body)
    }
}
