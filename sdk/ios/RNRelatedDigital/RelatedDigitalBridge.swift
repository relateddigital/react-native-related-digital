import VisilabsIOS
import UIKit
import Euromsg

@objc public class RelatedDigitalBridge: NSObject {
    @objc public static func initRelatedDigital(organizationId: String, profileId: String, dataSource: String, appAlias: String, inAppNotificationsEnabled: Bool, requestTimeoutInSeconds: Int, geofenceEnabled: Bool, askLocationPermmissionAtStart: Bool,maxGeofenceCount: Int, isIDFAEnabled: Bool, loggingEnabled: Bool) -> Void {
		Visilabs.createAPI(organizationId: organizationId, profileId: profileId
		, dataSource: dataSource, inAppNotificationsEnabled: inAppNotificationsEnabled, channel: "IOS"
		, requestTimeoutInSeconds: requestTimeoutInSeconds, geofenceEnabled: geofenceEnabled, askLocationPermmissionAtStart: askLocationPermmissionAtStart, maxGeofenceCount: maxGeofenceCount, isIDFAEnabled: isIDFAEnabled, loggingEnabled: loggingEnabled)
        Euromsg.configure(appAlias:appAlias)
	}
	
	@objc public static func customEvent(pageName: String, properties: [String : String]) -> Void {
		Visilabs.callAPI().customEvent(pageName, properties: properties)
	}
	
	@objc public static func getRecommendations(zoneId: String, productCode: String, properties: [String : String], filters: [NSDictionary] = [], completion: @escaping ((_ response: String?) -> Void)) -> Void {
		let jsonEncoder = JSONEncoder()
		var filtersToSend: [VisilabsRecommendationFilter] = [];
		if(filters.count > 0) {
			for filter in filters {
				let recofilter = VisilabsRecommendationFilter(
					attribute: VisilabsProductFilterAttribute(rawValue: filter["attribute"] as! VisilabsProductFilterAttribute.RawValue)!, filterType: VisilabsRecommendationFilterType(rawValue: filter["filterType"] as! VisilabsRecommendationFilterType.RawValue)!, value: filter["value"] as! String
				)
				filtersToSend.append(recofilter)
			}
		}
				
		Visilabs.callAPI().recommend(zoneID: zoneId, productCode: productCode, filters: filtersToSend, properties: properties){ response in
            
			var recommendations: [RelatedDigitalRecommendationProduct] = []
			for product in response.products {
				recommendations.append(RelatedDigitalRecommendationProduct(code: product.code, title: product.title, img: product.img
                                                                           , brand: product.brand, price: product.price, dprice: product.dprice, cur: product.cur, dcur: product.dcur, freeshipping: product.freeshipping, samedayshipping: product.samedayshipping, rating: product.rating, comment: product.comment, discount: product.discount, attr1: product.attr1, attr2: product.attr2, attr3: product.attr3, attr4: product.attr4, attr5: product.attr5, attr6: product.attr6, attr7: product.attr7, attr8: product.attr8, attr9: product.attr9, attr10: product.attr10, dest_url: product.destUrl, qs:product.qs))
			}
			
			do {
                let recommendationResponse = RelatedDigitalRecommendationResponse(recommendations: recommendations, title: response.widgetTitle)
				let jsonData = try jsonEncoder.encode(recommendationResponse)
				let json = String(data: jsonData, encoding: String.Encoding.utf8)
				completion(json)
			}
			catch {
				completion(nil)
			}
		}
	}

	@objc public static func trackRecommendationClick(qs: String){
        Visilabs.callAPI().trackRecommendationClick(qs:qs)
	}

	@objc public static func getPushMessages(completion: @escaping ((_ response: String?) -> Void)) -> Void {
		let jsonEncoder = JSONEncoder()
		Euromsg.getPushMessages(){ response in
			do {
				let jsonData = try jsonEncoder.encode(response)
				let json = String(data: jsonData, encoding: String.Encoding.utf8)
				completion(json)
			}
			catch {
				completion(nil)
			}
		}
	}
    
    @objc public static func didReceive(alias: String, bestAttemptContent: UNMutableNotificationContent?,
                         withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
            Euromsg.configure(appAlias:alias)
            Euromsg.didReceive(bestAttemptContent, withContentHandler: contentHandler)
        }

	@objc public static func getStoryView(actionId: String?) -> VisilabsStoryHomeView {
		if(actionId != nil && actionId != "") {
			return Visilabs.callAPI().getStoryView(actionId: Int(actionId!))
		}
		else {
			return Visilabs.callAPI().getStoryView()
		}
	}
	
	@objc public static func getFavoriteAttributeActions(actionId: String?, completion: @escaping ((_ response: String?) -> Void)) {
		if(actionId != nil && actionId != "") {
			Visilabs.callAPI().getFavoriteAttributeActions(actionId: Int(actionId!)) { (response) in
				handleFavAttrResponse(response: response, completion: completion)
			}
		}
		else {
			Visilabs.callAPI().getFavoriteAttributeActions { (response) in
				handleFavAttrResponse(response: response, completion: completion)
			}
		}
	}
    
	@objc public static func getUser(completion: @escaping ((_ response: String?) -> Void)) {
        let user = Visilabs.callAPI().getUser()
        let profile = Visilabs.callAPI().getProfile()
        let jsonObj: NSMutableDictionary = NSMutableDictionary()
            
        jsonObj.setValue(user.appId, forKey: "appId")
        jsonObj.setValue(user.tokenId, forKey: "tokenId")
        jsonObj.setValue(user.cookieId, forKey: "cookieId")
        jsonObj.setValue(user.exVisitorId, forKey: "exVisitorId")
        jsonObj.setValue(user.appVersion, forKey: "appVersion")
        jsonObj.setValue(user.sdkVersion, forKey: "sdkVersion")
        jsonObj.setValue(user.userAgent, forKey: "userAgent")
        jsonObj.setValue(profile.apiver, forKey: "apiver")
        jsonObj.setValue(profile.channel, forKey: "channel")
        jsonObj.setValue(profile.channel, forKey:"vchannel" )
        jsonObj.setValue("true", forKey:"mappl")
        
		do {
            let jsonData = try JSONSerialization.data(withJSONObject: jsonObj, options: JSONSerialization.WritingOptions()) as NSData
            let json = NSString(data: jsonData as Data, encoding: String.Encoding.utf8.rawValue)! as String
            completion(json)
		}
		catch {
			completion(nil)
		}
		
	}
	
	static func handleFavAttrResponse( response: VisilabsFavoriteAttributeActionResponse, completion: @escaping ((_ response: String?) -> Void)) {
		let jsonObj: NSMutableDictionary = NSMutableDictionary()
		
		jsonObj.setValue(response.favorites[.ageGroup], forKey: RelatedDigitalFavoriteAttribute.ageGroup.rawValue)
		jsonObj.setValue(response.favorites[.attr1], forKey: RelatedDigitalFavoriteAttribute.attr1.rawValue)
		jsonObj.setValue(response.favorites[.attr2], forKey: RelatedDigitalFavoriteAttribute.attr2.rawValue)
		jsonObj.setValue(response.favorites[.attr3], forKey: RelatedDigitalFavoriteAttribute.attr3.rawValue)
		jsonObj.setValue(response.favorites[.attr4], forKey: RelatedDigitalFavoriteAttribute.attr4.rawValue)
		jsonObj.setValue(response.favorites[.attr5], forKey: RelatedDigitalFavoriteAttribute.attr5.rawValue)
		jsonObj.setValue(response.favorites[.attr6], forKey: RelatedDigitalFavoriteAttribute.attr6.rawValue)
		jsonObj.setValue(response.favorites[.attr7], forKey: RelatedDigitalFavoriteAttribute.attr7.rawValue)
		jsonObj.setValue(response.favorites[.attr8], forKey: RelatedDigitalFavoriteAttribute.attr8.rawValue)
		jsonObj.setValue(response.favorites[.attr9], forKey: RelatedDigitalFavoriteAttribute.attr9.rawValue)
		jsonObj.setValue(response.favorites[.attr10], forKey: RelatedDigitalFavoriteAttribute.attr10.rawValue)
		jsonObj.setValue(response.favorites[.brand], forKey: RelatedDigitalFavoriteAttribute.brand.rawValue)
		jsonObj.setValue(response.favorites[.category], forKey: RelatedDigitalFavoriteAttribute.category.rawValue)
		jsonObj.setValue(response.favorites[.color], forKey: RelatedDigitalFavoriteAttribute.color.rawValue)
		jsonObj.setValue(response.favorites[.gender], forKey: RelatedDigitalFavoriteAttribute.gender.rawValue)
		jsonObj.setValue(response.favorites[.material], forKey: RelatedDigitalFavoriteAttribute.material.rawValue)
		
		do {
			let jsonData = try JSONSerialization.data(withJSONObject: jsonObj, options: JSONSerialization.WritingOptions()) as NSData
			let json = NSString(data: jsonData as Data, encoding: String.Encoding.utf8.rawValue)! as String
			completion(json)
		}
		catch {
			completion(nil)
		}
	}
	
	@objc public static func getIdentifierForVendor() -> String {
		return Euromsg.getIdentifierForVendorString()
	}
	
	@objc public static func requestPermission(isProvisional: Bool) {
		if (isProvisional) {
			Euromsg.askForNotificationPermissionProvisional(register: true)
		}
		else {
			Euromsg.askForNotificationPermission(register: true)
		}
	}

	@objc public static func requestIDFANative() {
		Visilabs.callAPI().requestIDFA() 
	}


	@objc public static func requestLocationPermissionNative() {
		Visilabs.callAPI().requestLocationPermissions()
	}

	@objc public static func sendLocationPermissionNative() {
		Visilabs.callAPI().sendLocationPermission()
	}
}

@objc public protocol RelatedDigitalStoryURLDelegate: VisilabsStoryURLDelegate {
	
}

public enum RelatedDigitalFavoriteAttribute: String, Encodable {
		case ageGroup
		case attr1
		case attr2
		case attr3
		case attr4
		case attr5
		case attr6
		case attr7
		case attr8
		case attr9
		case attr10
		case brand
		case category
		case color
		case gender
		case material
		case title
}


public class RelatedDigitalRecommendationProduct: Encodable {
		
		public enum PayloadKey {
				public static let code = "code"
				public static let title = "title"
				public static let img = "img"
				public static let brand = "brand"
				public static let price = "price"
				public static let dprice = "dprice"
				public static let cur = "cur"
				public static let dcur = "dcur"
				public static let freeshipping = "freeshipping"
				public static let samedayshipping = "samedayshipping"
				public static let rating = "rating"
				public static let comment = "comment"
				public static let discount = "discount"
				public static let attr1 = "attr1"
				public static let attr2 = "attr2"
				public static let attr3 = "attr3"
				public static let attr4 = "attr4"
                public static let attr5 = "attr5"
                public static let attr6 = "attr6"
                public static let attr7 = "attr7"
                public static let attr8 = "attr8"
                public static let attr9 = "attr9"
                public static let attr10 = "attr10"
                public static let dest_url = "dest_url"
                public static let qs = "qs"
		}
		
		public var code: String
		public var title: String
		public var img: String
		public var brand: String
		public var price: Double = 0.0
		public var dprice: Double = 0.0
		public var cur: String
		public var dcur: String
		public var freeshipping: Bool = false
		public var samedayshipping: Bool  = false
		public var rating: Int = 0
		public var comment: Int = 0
		public var discount: Double = 0.0
		public var attr1: String
		public var attr2: String
		public var attr3: String
		public var attr4: String
        public var attr5: String
        public var attr6: String
        public var attr7: String
        public var attr8: String
        public var attr9: String
        public var attr10: String
        public var dest_url: String
        public var qs: String
		
    internal init(code: String, title: String, img: String, brand: String, price: Double, dprice: Double, cur: String, dcur: String, freeshipping: Bool, samedayshipping: Bool, rating: Int, comment: Int, discount: Double, attr1: String, attr2: String, attr3: String, attr4: String, attr5: String,attr6: String,attr7: String,attr8: String,attr9: String,attr10: String, dest_url: String, qs: String) {
				self.code = code
				self.title = title
				self.img = img
				self.brand = brand
				self.price = price
				self.dprice = dprice
				self.cur = cur
				self.dcur = dcur
				self.freeshipping = freeshipping
				self.samedayshipping = samedayshipping
				self.rating = rating
				self.comment = comment
				self.discount = discount
				self.attr1 = attr1
				self.attr2 = attr2
				self.attr3 = attr3
				self.attr4 = attr4
                self.attr5 = attr5
                self.attr6 = attr6
                self.attr7 = attr7
                self.attr8 = attr8
                self.attr9 = attr9
                self.attr10 = attr10
                self.dest_url = dest_url
                self.qs = qs
		}
		
		internal init?(JSONObject: [String: Any?]?) {
				
				guard let object = JSONObject else {
						return nil
				}
				
				guard let code = object[PayloadKey.code] as? String else {
						return nil
				}

				self.code = code
				self.title = object[PayloadKey.title] as? String ?? ""
				self.img = object[PayloadKey.img] as? String ?? ""
				self.brand = object[PayloadKey.brand] as? String ?? ""
				self.price = object[PayloadKey.price] as? Double ?? 0.0
				self.dprice = object[PayloadKey.dprice] as? Double ?? 0.0
				self.cur = object[PayloadKey.cur] as? String ?? ""
				self.dcur = object[PayloadKey.dcur] as? String ?? ""
				self.freeshipping = object[PayloadKey.freeshipping] as? Bool ?? false
				self.samedayshipping = object[PayloadKey.samedayshipping] as? Bool ?? false
				self.rating = object[PayloadKey.rating] as? Int ?? 0
				self.comment = object[PayloadKey.comment] as? Int ?? 0
				self.discount = object[PayloadKey.discount] as? Double ?? 0.0
				self.attr1 = object[PayloadKey.attr1] as? String ?? ""
				self.attr2 = object[PayloadKey.attr2] as? String ?? ""
				self.attr3 = object[PayloadKey.attr3] as? String ?? ""
				self.attr4 = object[PayloadKey.attr4] as? String ?? ""
                self.attr5 = object[PayloadKey.attr5] as? String ?? ""
                self.attr6 = object[PayloadKey.attr6] as? String ?? ""
                self.attr7 = object[PayloadKey.attr7] as? String ?? ""
                self.attr8 = object[PayloadKey.attr8] as? String ?? ""
                self.attr9 = object[PayloadKey.attr9] as? String ?? ""
                self.attr10 = object[PayloadKey.attr10] as? String ?? ""
                self.dest_url = object[PayloadKey.dest_url] as? String ?? ""
                self.qs = object[PayloadKey.qs] as? String ?? ""
		}
}
