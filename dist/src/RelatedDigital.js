'use strict';
import { NativeModules } from 'react-native';
import { RDEventEmitter } from './RDEventEmitter';
const RDModule = NativeModules.RelatedDigitalReactModule;
const EventEmitter = new RDEventEmitter();
var InternalEventType;
(function (InternalEventType) {
    InternalEventType["NotificationRegistered"] = "com.relateddigital.notification_registered";
    InternalEventType["NotificationReceived"] = "com.relateddigital.notification_received";
    InternalEventType["NotificationOpened"] = "com.relateddigital.notification_opened";
})(InternalEventType || (InternalEventType = {}));
export var EventType;
(function (EventType) {
    EventType["NotificationRegistered"] = "notificationRegistered";
    EventType["NotificationReceived"] = "notificationReceived";
    EventType["NotificationOpened"] = "notificationOpened";
})(EventType || (EventType = {}));
/**
 * A listener subscription.
 */
export class Subscription {
    onRemove;
    constructor(onRemove) {
        this.onRemove = onRemove;
    }
    /**
     * Removes the listener.
     */
    remove() {
        this.onRemove();
    }
}
/**
 * Converts between public and internal event types.
 * @hidden
 */
function convertEventEnum(type) {
    if (type === EventType.NotificationRegistered) {
        return InternalEventType.NotificationRegistered;
    }
    else if (type === EventType.NotificationReceived) {
        return InternalEventType.NotificationReceived;
    }
    else if (type === EventType.NotificationOpened) {
        return InternalEventType.NotificationOpened;
    }
    throw new Error('Invalid event name: ' + type);
}
/**
 * The main RelatedDigital API.
 */
export class RelatedDigital {
    static setIsInAppNotificationEnabled(isInAppNotificationEnabled) {
        RDModule.setIsInAppNotificationEnabled(isInAppNotificationEnabled);
    }
    static setIsGeofenceEnabled(isGeofenceEnabled) {
        RDModule.setIsGeofenceEnabled(isGeofenceEnabled);
    }
    static setAdvertisingIdentifier(advertisingIdentifier) {
        RDModule.setAdvertisingIdentifier(advertisingIdentifier);
    }
    static signUp(exVisitorId, properties) {
        RDModule.signUp(exVisitorId, properties);
    }
    static login(exVisitorId, properties) {
        RDModule.login(exVisitorId, properties);
    }
    static logout() {
        RDModule.logout();
    }
    static customEvent(pageName, parameters) {
        RDModule.customEvent(pageName, parameters);
    }
    static askForNotificationPermission() {
        RDModule.askForNotificationPermission();
    }
    static setIsPushNotificationEnabled(isPushNotificationEnabled, iosAppAlias, googleAppAlias, huaweiAppAlias, deliveredBadge) {
        RDModule.setIsPushNotificationEnabled(isPushNotificationEnabled, iosAppAlias, googleAppAlias, huaweiAppAlias, deliveredBadge);
    }
    static setEmail(email, permission) {
        RDModule.setEmail(email, permission);
    }
    static sendCampaignParameters(parameters) {
        RDModule.sendCampaignParameters(parameters);
    }
    static setTwitterId(twitterId) {
        RDModule.setTwitterId(twitterId);
    }
    static setFacebookId(facebookId) {
        RDModule.setFacebookId(facebookId);
    }
    static setRelatedDigitalUserId(relatedDigitalUserId) {
        RDModule.setRelatedDigitalUserId(relatedDigitalUserId);
    }
    static setNotificationLoginId(notificationLoginId) {
        RDModule.setNotificationLoginId(notificationLoginId);
    }
    static setPhoneNumber(msisdn, permission) {
        RDModule.setPhoneNumber(msisdn, permission);
    }
    static setUserProperty(key, value) {
        RDModule.setUserProperty(key, value);
    }
    static removeUserProperty(key) {
        RDModule.removeUserProperty(key);
    }
    static registerEmail(email, permission, isCommercial) {
        return RDModule.registerEmail(email, permission, isCommercial);
    }
    static getPushMessages() {
        return RDModule.getPushMessages();
    }
    static getToken() {
        return RDModule.getToken();
    }
    static addListener(eventType, listener) {
        EventEmitter.addListener(convertEventEnum(eventType), listener);
        return new Subscription(() => {
            RelatedDigital.removeListener(eventType, listener);
        });
    }
    static removeListener(eventType, listener) {
        EventEmitter.removeListener(convertEventEnum(eventType), listener);
    }
    static removeAllListeners(eventType) {
        EventEmitter.removeAllListeners(convertEventEnum(eventType));
    }
}
