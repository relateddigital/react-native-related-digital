//
//  RDRCTBannerView.swift
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 13.06.2023.
//

import Foundation
import UIKit
import React
import RelatedDigitalIOS
private typealias NativeRD = RelatedDigitalIOS.RelatedDigital

@objc(RDBannerView)
class RDRCTBannerView: RCTView, BannerDelegate {

    static let viewTag: Int = 998 //TODO

    @objc var actionId: String? {
        didSet {
            layoutSubviews()
        }
    }

    @objc var onItemClicked: RCTBubblingEventBlock?
    //var onLoadStarted: RCTDirectEventBlock?

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
        if(self.viewWithTag(RDRCTBannerView.viewTag) != nil) {
            self.viewWithTag(RDRCTBannerView.viewTag)?.removeFromSuperview()
        }

        let bannerView: RDRCTBannerView? = nil
        //let actId = Int(actionId ?? "")
        let properties = [String: String]()
        NativeRD.getBannerView(properties: properties) { (rdBannerView) in
            if let bannerView = rdBannerView {
                bannerView.tag = RDRCTBannerView.viewTag
                self.addSubview(bannerView)
                bannerView.frame = self.frame
            }
        }

        bannerView?.tag = RDRCTBannerView.viewTag
        if let bannerView = bannerView {
            self.addSubview(bannerView)
        }
        bannerView?.frame = self.frame
    }

    func urlClicked(_ url: URL) {
        if(onItemClicked != nil) {
            let storyData: [String : Any] = ["storyLink": url.absoluteString]
            self.onItemClicked!(storyData)
        }
    }
    
    func bannerItemClickListener(url: String) {
        
    }
}

