//
//  RDChannelScope.swift
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 5.07.2023.
//

import Foundation


/**
 * Channel scopes.
 */
@objc public class RDChannelScopes: NSObject, Decodable {
    
    /// The scopes
    public let values: [RDChannelScope]

    /// The raw channel scope values.
    @objc(values)
    public var rawValues: [Int] {
        return values.map { $0.rawValue }
    }
    
    public override var description: String {
        return "\(values)"
    }
    
    public init(_ values: [RDChannelScope]) {
        self.values = values
        super.init()
    }
    
    public override func isEqual(_ object: Any?) -> Bool {
       return values == (object as? RDChannelScopes)?.values
    }
    
    public override var hash: Int {
        return values.hashValue
    }
    
    public required init(from decoder: Decoder) throws {
        let singleValueContainer = try decoder.singleValueContainer()
        if let strings = try? singleValueContainer.decode([String].self) {
            self.values = try strings.map { try RDChannelScope.fromString($0) }
        } else {
            self.values = try singleValueContainer.decode([RDChannelScope].self)
        }
    }
}

/**
 * Channel scope.
 */
@objc public enum RDChannelScope: Int, Codable, CustomStringConvertible {
    /**
     * App channels - amazon, android, iOS
     */
    case app
    
    /**
     * Web channels
     */
    case web
    
    /**
     * Email channels
     */
    case email
    
    /**
     * SMS channels
     */
    case sms
    
    
    /// The string value of the scope
    /// - Returns: The string value of the scope
    public var stringValue: String {
        switch self {
        case .sms:
            return "sms"
        case .email:
            return "email"
        case .app:
            return "app"
        case .web:
            return "web"
        }
    }
    
    /// Returns a channel scope from a string.
    /// - Parameter value: The string value
    /// - Returns: A channel scope.
    public static func fromString(_ value: String) throws -> RDChannelScope {
        switch value.lowercased() {
        case "sms":
            return .sms
        case "email":
            return .email
        case "app":
            return .app
        case "web":
            return .web
        default:
            throw RDErrors.error("invalid scope \(value)")
        }
    }
    
    public var description: String {
        return stringValue
    }
}

