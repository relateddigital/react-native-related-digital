//
//  RDRCTListener.swift
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 3.07.2023.
//

import Foundation
import RelatedDigitalIOS

fileprivate typealias NativeRD = RelatedDigitalIOS.RelatedDigital
fileprivate typealias UIA = UIApplication
fileprivate typealias NC = NotificationCenter
fileprivate typealias UNUNC = UNUserNotificationCenter

/// Protocol to be implemented by push notification clients. All methods are optional.
@objc(RDPushNotificationDelegate)
public protocol PushNotificationDelegate: NSObjectProtocol {
    /// Called when a notification is received in the foreground.
    ///
    /// - Parameters:
    ///   - userInfo: The notification info
    ///   - completionHandler: the completion handler to execute when notification processing is complete.
    @objc
    optional func receivedForegroundNotification(_ userInfo: [AnyHashable : Any], completionHandler: @escaping () -> Void)
#if !os(watchOS)
    /// Called when a notification is received in the background.
    ///
    /// - Parameters:
    ///   - userInfo: The notification info
    ///   - completionHandler: the completion handler to execute when notification processing is complete.
    @objc
    optional func receivedBackgroundNotification(_ userInfo: [AnyHashable : Any], completionHandler: @escaping (UIBackgroundFetchResult) -> Void)
#else
    /// Called when a notification is received in the background.
    ///
    /// - Parameters:
    ///   - userInfo: The notification info
    ///   - completionHandler: the completion handler to execute when notification processing is complete.
    @objc
    optional func receivedBackgroundNotification(_ userInfo: [AnyHashable : Any], completionHandler: @escaping (WKBackgroundFetchResult) -> Void)
#endif
#if !os(tvOS)
    /// Called when a notification is received in the background or foreground and results in a user interaction.
    /// User interactions can include launching the application from the push, or using an interactive control on the notification interface
    /// such as a button or text field.
    ///
    /// - Parameters:
    ///   - notificationResponse: UNNotificationResponse object representing the user's response
    /// to the notification and the associated notification contents.
    ///
    ///   - completionHandler: the completion handler to execute when processing the user's response has completed.
    @objc
    optional func receivedNotificationResponse(_ notificationResponse: UNNotificationResponse, completionHandler: @escaping () -> Void)
#endif
    /// Called when a notification has arrived in the foreground and is available for display.
    ///
    /// - Parameters:
    ///   - options: The notification presentation options.
    ///   - notification: The notification.
    /// - Returns: a UNNotificationPresentationOptions enum value indicating the presentation options for the notification.
    @objc(extendPresentationOptions:notification:)
    optional func extend(_ options: UNNotificationPresentationOptions, notification: UNNotification) -> UNNotificationPresentationOptions
}


/// Implement this protocol and add as a Push.registrationDelegate to receive
/// registration success and failure callbacks.
///
@objc(RDRegistrationDelegate)
public protocol RegistrationDelegate: NSObjectProtocol {
#if !os(tvOS)
    /// Called when APNS registration completes.
    ///
    /// - Parameters:
    ///   - authorizedSettings: The settings that were authorized at the time of registration.
    ///   - categories: Set of the categories that were most recently registered.
    ///   - status: The authorization status.
    @objc
    optional func notificationRegistrationFinished(
        withAuthorizedSettings authorizedSettings: RDAuthorizedNotificationSettings,
        categories: Set<UNNotificationCategory>,
        status: RDAuthorizationStatus
    )
#endif

    /// Called when APNS registration completes.
    ///
    /// - Parameters:
    ///   - authorizedSettings: The settings that were authorized at the time of registration.
    ///   - status: The authorization status.
    @objc
    optional func notificationRegistrationFinished(
        withAuthorizedSettings authorizedSettings: RDAuthorizedNotificationSettings,
        status: RDAuthorizationStatus
    )

    /// Called when notification authentication changes with the new authorized settings.
    ///
    /// - Parameter authorizedSettings: RDAuthorizedNotificationSettings The newly changed authorized settings.
    @objc optional func notificationAuthorizedSettingsDidChange(_ authorizedSettings: RDAuthorizedNotificationSettings)

    /// Called when the UIApplicationDelegate's application:didRegisterForRemoteNotificationsWithDeviceToken:
    /// delegate method is called.
    ///
    /// - Parameter deviceToken: The APNS device token.
    @objc optional func apnsRegistrationSucceeded(withDeviceToken deviceToken: Data)

    /// Called when the UIApplicationDelegate's application:didFailToRegisterForRemoteNotificationsWithError:
    /// delegate method is called.
    ///
    /// - Parameter error: An NSError object that encapsulates information why registration did not succeed.
    @objc optional func apnsRegistrationFailedWithError(_ error: Error)
}



@objc public class RDRCTListener: NSObject
//, RDPushNotificationDelegate, RDRegistrationDelegate, RDDeepLinkDelegate, RDMessageCenterDisplayDelegate
{
    
    static let shared = RDRCTListener()
    
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
        var registrationBody = [String: Any]()
        
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
