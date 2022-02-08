import Foundation


public class RelatedDigitalRecommendationResponse: Encodable {
    public var recommendations: [RelatedDigitalRecommendationProduct]
    public var title: String = ""
    
    internal init(recommendations: [RelatedDigitalRecommendationProduct], title: String = "") {
        self.recommendations = recommendations
        self.title = title
    }
}
