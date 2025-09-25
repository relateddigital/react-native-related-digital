import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import UserNotifications
import react_native_related_digital

@main
class AppDelegate: UIResponder, UIApplicationDelegate, UNUserNotificationCenterDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "reactSDKTest",
      in: window,
      launchOptions: launchOptions
    )

    // 🔔 Push Notification delegate ayarları
    let center = UNUserNotificationCenter.current()
    center.delegate = self

    // 🔔 Related Digital init
    RelatedDigitalPushModule.initRelatedDigital(
      "676D325830564761676D453D",
      profileId: "356467332F6533766975593D",
      dataSource: "visistore",
      appAlias: "rniostestapptest2",
      inAppNotificationsEnabled: true,
      requestTimeoutSeconds: 30,
      geofenceEnabled: true,
      askLocationPermmissionAtStart: true,
      maxGeofenceCount: 20,
      isIDFAEnabled: true,
      loggingEnabled: true,
      deliveredBadge: true
    )

    return true
  }

  // MARK: - Push Notification Delegate Methods

  func application(_ application: UIApplication, didRegister notificationSettings: UIUserNotificationSettings) {
    RelatedDigitalPushModule.didRegister(notificationSettings)
  }

  func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    RelatedDigitalPushModule.didRegisterForRemoteNotifications(withDeviceToken: deviceToken)
  }

  func application(_ application: UIApplication,
                   didReceiveRemoteNotification userInfo: [AnyHashable : Any],
                   fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
    RelatedDigitalPushModule.didReceiveRemoteNotification(userInfo, fetchCompletionHandler: completionHandler)
  }

  func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
    RelatedDigitalPushModule.didFailToRegisterForRemoteNotificationsWithError(error)
  }

  func userNotificationCenter(_ center: UNUserNotificationCenter,
                              willPresent notification: UNNotification,
                              withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
    completionHandler([.sound, .alert, .badge])
  }
}

// MARK: - React Native Delegate

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
