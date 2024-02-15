'use strict';
import { NativeModules } from 'react-native';
import { RDEventEmitter } from './RDEventEmitter';
import { RDSubscription } from './models/RDSubscription';
const RDModule = NativeModules.RelatedDigitalReactModule;
const EventEmitter = new RDEventEmitter();
/**
 * The main RelatedDigital API.
 */
export class RelatedDigital {
    static setIsInAppNotificationEnabled(enabled) {
        RDModule.setIsInAppNotificationEnabled(enabled);
    }
    static setIsGeofenceEnabled(enabled) {
        RDModule.setIsGeofenceEnabled(enabled);
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
    static askForNotificationPermissionProvisional() {
        RDModule.askForNotificationPermissionProvisional();
    }
    static setIsPushNotificationEnabled(enabled, iosAppAlias, googleAppAlias, huaweiAppAlias, deliveredBadge) {
        RDModule.setIsPushNotificationEnabled(enabled, iosAppAlias, googleAppAlias, huaweiAppAlias, deliveredBadge);
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
    static getPushMessagesWithId() {
        return RDModule.getPushMessagesWithID();
    }
    static getToken() {
        return RDModule.getToken();
    }
    static getUser() {
        return RDModule.getUser();
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
    static recommend(zoneId, productCode = null, filters = [], properties) {
        return RDModule.recommend(zoneId, productCode, filters, properties);
    }
    static trackRecommendationClick(qs) {
        RDModule.trackRecommendationClick(qs);
    }
    static getFavoriteAttributeActions(actionId = null) {
        return RDModule.getFavoriteAttributeActions(actionId);
    }
    static addListener(eventType, listener) {
        EventEmitter.addListener(eventType, listener);
        return new RDSubscription(() => {
            RelatedDigital.removeListener(eventType, listener);
        });
    }
    static removeListener(eventType, listener) {
        EventEmitter.removeListener(eventType, listener);
    }
    static removeAllListeners(eventType) {
        EventEmitter.removeAllListeners(eventType);
    }
}
