'use strict';
import { NativeModules } from 'react-native';
import { RDEventEmitter } from './RDEventEmitter';
const RDModule = NativeModules.RelatedDigitalReactModule;
const EventEmitter = new RDEventEmitter();
export var RDEventType;
(function (RDEventType) {
    RDEventType["NotificationRegistered"] = "com.relateddigital.notification_registered";
    RDEventType["NotificationReceived"] = "com.relateddigital.notification_received";
    RDEventType["NotificationOpened"] = "com.relateddigital.notification_opened";
})(RDEventType || (RDEventType = {}));
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
    if (type === RDEventType.NotificationRegistered) {
        return RDEventType.NotificationRegistered;
    }
    else if (type === RDEventType.NotificationReceived) {
        return RDEventType.NotificationReceived;
    }
    else if (type === RDEventType.NotificationOpened) {
        return RDEventType.NotificationOpened;
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
    static askForNotificationPermissionProvisional(register = false) {
        RDModule.askForNotificationPermissionProvisional(register);
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
    static getPushMessagesWithID() {
        return RDModule.getPushMessagesWithID();
    }
    static getToken() {
        return RDModule.getToken();
    }
    static getUser() {
        return RDModule.getUser();
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
    static requestIDFA() {
        RDModule.requestIDFA();
    }
    static sendLocationPermission() {
        RDModule.sendLocationPermission();
    }
    static requestLocationPermissions() {
        RDModule.requestLocationPermissions();
    }
    static sendTheListOfAppsInstalled() {
        RDModule.sendTheListOfAppsInstalled();
    }
    static setNotificationLoginID(notificationLoginID) {
        RDModule.setNotificationLoginID(notificationLoginID);
    }
    static recommend(zoneId, productCode = null, filters = [], properties) {
        return RDModule.recommend(zoneId, productCode, filters, properties);
    }
    static trackRecommendationClick(qs) {
        RDModule.trackRecommendationClick(qs);
    }
    static getFavoriteAttributeActions(actionId = null) {
        return RDModule.getFavoriteAttributeActions(actionId);
    }
}
