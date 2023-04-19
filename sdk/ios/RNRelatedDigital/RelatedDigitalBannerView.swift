//
//  RelatedDigitalBannerView.swift
//  react-native-related-digital
//
//  Created by Baris Arslan on 17.04.2023.
//


import UIKit
import VisilabsIOS

class RDBannerView: UIView, BannerDelegate {
    
    static let viewTag: Int = 999
    
    @objc var properties: [String:String]? {
        didSet {
            self.layoutSubviews()
        }
    }
     
    @objc var onItemClicked: RCTBubblingEventBlock?

    @objc var onRequestResult: RCTBubblingEventBlock?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
    }
 
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
 
    override func layoutSubviews() {
        setupView()
    }
    
    private func setupView() {
        let bannerView = UIView()
        if(self.viewWithTag(RDBannerView.viewTag) != nil) {
            self.viewWithTag(RDBannerView.viewTag)?.removeFromSuperview()
        }
        
        let props = validateProperties(properties)
        
        Visilabs.getBannerView(properties: props) { banner in
            if let banner = banner {
                banner.delegate = self
                banner.translatesAutoresizingMaskIntoConstraints = false
                bannerView.addSubview(banner as UIView)
                
                NSLayoutConstraint.activate([banner.topAnchor.constraint(equalTo: bannerView.topAnchor),
                                             banner.bottomAnchor.constraint(equalTo: bannerView.bottomAnchor),
                                             banner.leadingAnchor.constraint(equalTo: bannerView.leadingAnchor),
                                             banner.trailingAnchor.constraint(equalTo: bannerView.trailingAnchor)])
                
                self.bannerRequestListener(isAvailable:true)
            }else{
                self.bannerRequestListener(isAvailable:false)
            }

        }
        
        bannerView.tag = RDBannerView.viewTag
        
        self.addSubview(bannerView)
        bannerView.frame = self.frame
    }
    
    func bannerItemClickListener(url:String) {
        if(self.onItemClicked != nil) {
            let bannerData: [String : Any] = ["bannerLink": url]
            self.onItemClicked!(bannerData)
        }
    }

    func bannerRequestListener(isAvailable: Bool) {
        if(self.onRequestResult != nil) {
            let data: [String : Any] = ["isAvailable": isAvailable]
            self.onRequestResult!(data)
        }
    }
    
    func validateProperties(_ properties: [String: Any]?) -> [String: String] {
        // Check if properties is nil or empty
        var validatedProperties = [String: String]()
        
        guard let properties = properties, !properties.isEmpty else {
            return validatedProperties
        }
        
        // Create a new dictionary to store the validated properties
        
        // Loop through the properties and validate them
        for (key, value) in properties {
            // Check if the value is of the correct type
            if let stringValue = value as? String {
                // Add the property to the validated dictionary
                validatedProperties[key] = stringValue
            }
        }
        
        // Return the validated properties
        return validatedProperties
    }


}

@objc (BannerViewManager)
class BannerViewManager: RCTViewManager {

    override static func requiresMainQueueSetup() -> Bool {
        return true
    }

    override func view() -> UIView! {
        return RDBannerView()
    }

}
