import React from 'react';
import { StyleProp, ViewStyle } from 'react-native'

type ListenerTypes = 'notification' | 'register' | 'registrationError' | 'carouselItemClicked';

enum RecommendationAttribute {
    PRODUCTNAME = 'PRODUCTNAME',
    COLOR = "COLOR",
    AGEGROUP = "AGEGROUP",
    BRAND = "BRAND",
    CATEGORY = "CATEGORY",
    GENDER = "GENDER",
    MATERIAL = "MATERIAL",
    ATTRIBUTE1 = "ATTRIBUTE1",
    ATTRIBUTE2 = "ATTRIBUTE2",
    ATTRIBUTE3 = "ATTRIBUTE3",
    ATTRIBUTE4 = "ATTRIBUTE4",
    ATTRIBUTE5 = "ATTRIBUTE5",
    SHIPPINGONSAMEDAY = "SHIPPINGONSAMEDAY",
    FREESHIPPING = "FREESHIPPING",
    ISDISCOUNTED = 'ISDISCOUNTED'
}

enum RecommendationFilterType {
    equals = 0,
    notEquals = 1,
    like = 2,
    notLike = 3,
    greaterThan = 4,
    lessThan = 5,
    greaterOrEquals = 6,
    lessOrEquals = 7,
    include = 2,
    exclude = 3
}

export function addEventListener(type: ListenerTypes, handler: Function, readHandler: Function, euroMessageApi: EuroMessageApi, visilabsApi: VisilabsApi): void;
export function removeEventListener(type: ListenerTypes): void;
export class EuroMessageApi {
    constructor(appAlias: string): void;
    subscribe(token: string): Promise<any>;
    reportRead(pushId: string): Promise<any>;
    setUserProperty(key: string, value: object): Promise<void>;
    setUserProperties(properties: object): Promise<void>;
    getPushMessages(): Promise<any>;
};
export class VisilabsApi {
    constructor(
        appAlias: string,
        siteId: string, 
        organiationId: string,
        dataSource: string): void;
    register(token: string, callback: Function): void;
    customEvent(name: string, properties: object): void;
    getRecommendations(zoneId: string, productCode: string, properties:object, filters: Array<Object> = []): Promise<any>;
    trackRecommendationClick(qs: String): void;
    getFavoriteAttributeActions(actionId: string): Promise<any>;
    sendTheListOfAppsInstalled(): Promise<void>;
    sendLocationPermission(): Promise<void>;
    getUser(): Promise<void>;
};
export function requestPermissions(isProvisional: Boolean = false): Promise<boolean>;
export function requestIDFA(): void;
export function requestLocationPermission(): Promise<boolean>;

/**
 * @param interval Only Android
 */
export function setGeofencingIntervalInMinute(interval: number): void;
export function setApplicationIconBadgeNumber(badgeNumber: number): void;
export function logToConsole(value: boolean): void;

export interface RDStoryViewProps {
    onItemClicked?: Function;
    style?: StyleProp<ViewStyle>,
    actionId?: string | null
}
export const RDStoryView: (props: RDStoryViewProps) => React.Component<RDStoryViewProps>
export const RecommendationAttribute: RecommendationAttribute
export const RecommendationFilterType: RecommendationFilterType