//
//  RDRCTBannerView.swift
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 13.06.2023.
//

import UIKit
import React
import RelatedDigitalIOS

private typealias NativeRD = RelatedDigitalIOS.RelatedDigital

@objc public class RDRCTBannerView: RCTView, BannerDelegate {

    static let viewTag = 1871

    static let urlKey = "url"

    @objc var properties: [String: String]?

    @objc var onClicked: RCTBubblingEventBlock?

    override init(frame: CGRect) {
        super.init(frame: frame)
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }

    public override func layoutSubviews() {
        setupView()
    }

    private func setupView() {
        let bannerView = UIView()
        if self.viewWithTag(Self.viewTag) != nil {
            self.viewWithTag(Self.viewTag)?.removeFromSuperview()
        }

        NativeRD.getBannerView(properties: properties ?? [:]) {nativeBannerView in
            if let nativeBannerView = nativeBannerView {
                nativeBannerView.translatesAutoresizingMaskIntoConstraints = false
                nativeBannerView.delegate = self
                bannerView.addSubview(nativeBannerView as UIView)

                NSLayoutConstraint.activate([nativeBannerView.topAnchor.constraint(equalTo: bannerView.topAnchor),
                                             nativeBannerView.bottomAnchor.constraint(equalTo: bannerView.bottomAnchor),
                                             nativeBannerView.leadingAnchor.constraint(equalTo: bannerView.leadingAnchor),
                                             nativeBannerView.trailingAnchor.constraint(equalTo: bannerView.trailingAnchor)])

            }
        }

        bannerView.tag = Self.viewTag

        self.addSubview(bannerView)
        bannerView.frame = self.frame
    }

    public func bannerItemClickListener(url: String) {
        self.onClicked?([RDRCTBannerView.urlKey: url])
    }

}
