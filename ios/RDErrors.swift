//
//  RDErrors.swift
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 5.07.2023.
//

@objc public class RDErrors : NSObject {
    @objc
    public class func parseError(_ message: String) -> Error {
        return NSError(domain: "com.relateddigital.parse_error", code: 1, userInfo: [
            NSLocalizedDescriptionKey: message
        ])
    }

    @objc
    public class func error(_ message: String) -> Error {
        return NSError(domain: "com.relateddigital.error", code: 1, userInfo: [
            NSLocalizedDescriptionKey: message
        ])
    }
}

