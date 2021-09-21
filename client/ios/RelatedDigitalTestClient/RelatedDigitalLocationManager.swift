import VisilabsIOS

public class RelatedDigitalLocationManager : NSObject {
  override public init() {
    super.init()
    self.initWithGeofence()
  }
  
  func initWithGeofence() {
      Visilabs.createAPI(organizationId: "676D325830564761676D453D", profileId: "356467332F6533766975593D"
      , dataSource: "visistore", inAppNotificationsEnabled: true, channel: "IOS"
      , requestTimeoutInSeconds: 30, geofenceEnabled: true, maxGeofenceCount: 20)
  }
}
