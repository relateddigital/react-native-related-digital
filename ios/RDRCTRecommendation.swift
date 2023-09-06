//
//  RDRCTRecommendation.swift
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 6.09.2023.
//

import Foundation
import RelatedDigitalIOS

public protocol RecommendationCodable: Codable {}
public extension RecommendationCodable {
    var encoded: String {
        guard let data = try? JSONEncoder().encode(self) else { return "" }
        return String(data: data, encoding: .utf8) ?? ""
    }
}

public struct RDRCTProduct: RecommendationCodable {
    public var code: String
    public var title: String
    public var img: String
    public var destUrl: String
    public var brand: String
    public var price: Double = 0.0
    public var dprice: Double = 0.0
    public var cur: String
    public var dcur: String
    public var freeshipping: Bool = false
    public var samedayshipping: Bool = false
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
    public var qs: String = ""
}

extension RDRCTProduct {
    init(from product: RDProduct) {
        self.code = product.code
        self.title = product.title
        self.img = product.img
        self.destUrl = product.destUrl
        self.brand = product.brand
        self.price = product.price
        self.dprice = product.dprice
        self.cur = product.cur
        self.dcur = product.dcur
        self.freeshipping = product.freeshipping
        self.samedayshipping = product.samedayshipping
        self.rating = product.rating
        self.comment = product.comment
        self.discount = product.discount
        self.attr1 = product.attr1
        self.attr2 = product.attr2
        self.attr3 = product.attr3
        self.attr4 = product.attr4
        self.attr5 = product.attr5
        self.attr6 = product.attr6
        self.attr7 = product.attr7
        self.attr8 = product.attr8
        self.attr9 = product.attr9
        self.attr10 = product.attr10
        self.qs = product.qs
    }
}

public class RDRCTRecommendationResponse: RecommendationCodable {
    public var products: [RDRCTProduct]
    public var widgetTitle: String = ""

    internal init(products: [RDRCTProduct], widgetTitle: String = "") {
        self.products = products
        self.widgetTitle = widgetTitle
    }
}

public class RDRCTFavoriteAttributeActionResponse: RecommendationCodable {
    public var favorites: [String: [String]]

    init(from favoriteAttributeActionResponse: RDFavoriteAttributeActionResponse) {
        self.favorites = [:]
        for favorite in favoriteAttributeActionResponse.favorites {
            self.favorites[favorite.key.rawValue] = favorite.value
        }
    }
}
