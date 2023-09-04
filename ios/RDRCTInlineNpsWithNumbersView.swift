//
//  RDRCTInlineNpsWithNumbersView.swift
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 4.09.2023.
//

import UIKit
import React
import RelatedDigitalIOS

private typealias NativeRD = RelatedDigitalIOS.RelatedDigital

@objc public class RDRCTInlineNpsWithNumbersView: RCTView, RDNpsWithNumbersDelegate {

    
    static let viewTag = 1871
    
    static let npsLinkKey = "npsLink"
    
    @objc var properties: [String: String]? = nil
    
    @objc var npsItemClicked: RCTBubblingEventBlock?
    
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
        let npsView = UIView()
        if self.viewWithTag(Self.viewTag) != nil {
            self.viewWithTag(Self.viewTag)?.removeFromSuperview()
        }
        
        NativeRD.getNpsWithNumbersView(properties: properties ?? [:], delegate: self) {npsWithNumbersContainerView in
            if let npsWithNumbersContainerView = npsWithNumbersContainerView {
                npsWithNumbersContainerView.translatesAutoresizingMaskIntoConstraints = false
                npsView.addSubview(npsWithNumbersContainerView as UIView)
                
                NSLayoutConstraint.activate([npsWithNumbersContainerView.topAnchor.constraint(equalTo: npsView.topAnchor),
                                             npsWithNumbersContainerView.bottomAnchor.constraint(equalTo: npsView.bottomAnchor),
                                             npsWithNumbersContainerView.leadingAnchor.constraint(equalTo: npsView.leadingAnchor),
                                             npsWithNumbersContainerView.trailingAnchor.constraint(equalTo: npsView.trailingAnchor)])
                
            }
        }
        
        
        npsView.tag = Self.viewTag
        
        self.addSubview(npsView)
        npsView.frame = self.frame
    }
    
    public func npsItemClicked(npsLink: String?) {
        self.npsItemClicked?([RDRCTInlineNpsWithNumbersView.npsLinkKey: npsLink ?? ""])
    }
    
    
}

