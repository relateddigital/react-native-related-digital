import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import querystring from 'querystring'

import { getDeviceParameters, customEventNative, getRecommendationsNative, getFavoriteAttributeActionsNative, sendTheListOfAppsInstalledNative } from './native'
import { isEmptyOrSpaces, setCookieID, fetchAsync, fetchWithCallback, getLogToConsole, timeout } from './utils'
import { euroMessageRetentionUrl, euroMessageSubscriptionUrl, visilabsRealTimeUrl, visilabsSegmentUrl, subscriptionStorageKey, subscriptionStorageExtraKey } from './constants'

class EuroMessageApi {
    constructor(appAlias) {
        this.appAlias = appAlias
        this.euroMessageSubscriptionUrl = euroMessageSubscriptionUrl
        this.euroMessageRetentionUrl = euroMessageRetentionUrl
        this.subscriptionKey = subscriptionStorageKey
        this.subscriptionExtraKey = subscriptionStorageExtraKey
    }

    async subscribe(token) {
        let parametersDevice = null

        try {
            parametersDevice = await getDeviceParameters()
        }
        catch(e) {}

        let subscriptionInfo = await AsyncStorage.getItem(this.subscriptionKey)
        subscriptionInfo = subscriptionInfo ? JSON.parse(subscriptionInfo) : {}

        let subscriptionExtra = await AsyncStorage.getItem(this.subscriptionExtraKey)
        subscriptionExtra = subscriptionExtra ? JSON.parse(subscriptionExtra) : {}

        let parametersSubscription = {
            ...subscriptionInfo,
            token,
            appKey: this.appAlias,
            os: Platform.OS,
            advertisingIdentifier: '',
            firstTime: 1,
            extra: subscriptionExtra,
        }

        if(parametersDevice) {
            parametersSubscription = {
                ...parametersSubscription,
                osVersion: parametersDevice.osVersion,
                deviceName: parametersDevice.deviceName,
                deviceType: parametersDevice.deviceType,
                appVersion: parametersDevice.appVersion,
                carrier: parametersDevice.carrier,
                local: parametersDevice.locale,
                sdkVersion: parametersDevice.sdkVersion,
                identifierForVendor: parametersDevice.udid,
            }
        }

        const existingItem = await AsyncStorage.getItem(this.subscriptionKey)
        const currentItemStr = JSON.stringify(parametersSubscription)

        if(existingItem !== currentItemStr) {
            AsyncStorage.setItem(this.subscriptionKey, currentItemStr)
            const result = await fetchAsync(this.euroMessageSubscriptionUrl, 'POST', parametersSubscription)
            let lastResult

            if(result && (result.status === 200 || result.status === 201)) {
                lastResult = result
            }
            else {
                // retry
                let retry = 0
                while(retry < 3) {
                    if(getLogToConsole()) {
                        console.log(`Related Digital - Response not OK, retrying ${(retry + 1).toString()}`)
                    }

                    const retryPromise = fetchAsync(this.euroMessageSubscriptionUrl, 'POST', parametersSubscription)

                    try {
                        const retryResult = await timeout(30 * 1000, retryPromise)
                        if(retryResult && (retryResult.status === 200 || retryResult.status === 201)) {
                            lastResult = retryResult
                            retry = 3
                            break
                        }
                        else {
                            retry++
                        }
                    }
                    catch(ex) {
                        retry++
                    }
                }
            }

            if(lastResult) {
                return lastResult
            }
        }

        return await Promise.resolve(null)
    }

    async reportRead(pushId) {
        let subscriptionInfo = await AsyncStorage.getItem(this.subscriptionKey)
        subscriptionInfo = subscriptionInfo ? JSON.parse(subscriptionInfo) : null

        const parametersRetention = {
            key: this.appAlias,
            pushId,
            status: 'O',
            token: subscriptionInfo && subscriptionInfo.token
        }
        
        return await fetchAsync(this.euroMessageRetentionUrl, 'POST', parametersRetention)
    }

    async setUserProperty(key, value) {
        if(key === null || key === undefined || key.length === 0) {
            return
        }

        let extra = await AsyncStorage.getItem(this.subscriptionExtraKey)
        extra = extra ? JSON.parse(extra) : {}
        extra[key] = value

        await AsyncStorage.setItem(this.subscriptionExtraKey, JSON.stringify(extra))
    }
}

class VisilabsApi {
    constructor(appAlias, siteId, organiationId, dataSource) {
        this.appAlias = appAlias
        this.siteId = siteId
        this.organiationId = organiationId
        this.segmentUrl = visilabsSegmentUrl
        this.realTimeUrl = visilabsRealTimeUrl
        this.dataSource = dataSource
        this.keysToBeStored = ["OM.cookieID", "OM.exVisitorID", "OM.sys.AppID", "OM.sys.TokenID", "OM.channel", "OM.vchannel"]
    }

    register(token, callback) {
        const parametersRegister = {
            'OM.sys.AppID': this.appAlias,
            'OM.sys.TokenID': token,
        }

        this.customEvent('RegisterToken', parametersRegister, callback)
    }

    customEvent(name = '', properties = {}) {
        customEventNative(name, properties)
    }

    async getRecommendations(zoneId = '', productCode = '', filters = []) {
        const result = await getRecommendationsNative(zoneId, productCode, filters)
        return Promise.resolve(JSON.parse(result))
    }

    async getFavoriteAttributeActions(actionId = null) {
        const result = await getFavoriteAttributeActionsNative(actionId)
        return Promise.resolve(JSON.parse(result))
    }

    async sendTheListOfAppsInstalled() {
        if(Platform.OS === 'android') {
            await sendTheListOfAppsInstalledNative()
        }
        else {
            if(getLogToConsole()) {
                console.log(`Related Digital - Method not supported on iOS`)
            }
        }
    }

    _submit(parameters, callback) {
        parameters = parameters || {}
        parameters["OM.vchannel"] = Platform.OS

        let valuesToSet = []

        for(let i = 0; i < this.keysToBeStored.length; i++) {
            const key = this.keysToBeStored[i]
            const value = parameters[key]

            if(value !== undefined) {
                valuesToSet.push([key, value])
                delete parameters[key]
            }
        }

        parameters["OM.siteID"] = this.siteId
        parameters["OM.oid"] = this.organiationId

        AsyncStorage.getItem("OM.exVisitorID").then(exVisitorID => {
            AsyncStorage.multiSet(valuesToSet).finally(error => {
                AsyncStorage.multiGet(this.keysToBeStored).then(response => {
                    for(let j = 0; j < response.length; j++){
                        if(response[j][1] !== null)
                            parameters[response[j][0]] = response[j][1];
                    }

                    if(!parameters["OM.cookieID"] || 
                        (!isEmptyOrSpaces(exVisitorID) && !isEmptyOrSpaces(parameters["OM.exVisitorID"]) &&
                         exVisitorID != parameters["OM.exVisitorID"])) {
                            parameters["OM.cookieID"] = setCookieID()
                    }

                    const lgrUrl = this.segmentUrl + "/" + this.dataSource + "/om.gif?" + querystring.stringify(parameters)
                    const rtUrl = this.realTimeUrl + "/" + this.dataSource + "/om.gif?" + querystring.stringify(parameters)

                    fetchWithCallback(lgrUrl, 'GET', null, callback)
                    fetchWithCallback(rtUrl, 'GET', null, callback)
                })
            })
        })
    }
}

const RecommendationAttribute = {
    PRODUCTNAME: 'PRODUCTNAME',
    COLOR: "COLOR",
    AGEGROUP: "AGEGROUP",
    BRAND: "BRAND",
    CATEGORY: "CATEGORY",
    GENDER: "GENDER",
    MATERIAL: "MATERIAL",
    ATTRIBUTE1: "ATTRIBUTE1",
    ATTRIBUTE2: "ATTRIBUTE2",
    ATTRIBUTE3: "ATTRIBUTE3",
    ATTRIBUTE4: "ATTRIBUTE4",
    ATTRIBUTE5: "ATTRIBUTE5",
    SHIPPINGONSAMEDAY: "SHIPPINGONSAMEDAY",
    FREESHIPPING: "FREESHIPPING",
    ISDISCOUNTED: 'ISDISCOUNTED'
}

const RecommendationFilterType = {
    equals: 0,
    notEquals: 1,
    like: 2,
    notLike: 3,
    greaterThan: 4,
    lessThan: 5,
    greaterOrEquals: 6,
    lessOrEquals: 7,
    include: 2,
    exclude: 3
}

export {
    EuroMessageApi,
    VisilabsApi,
    RecommendationAttribute,
    RecommendationFilterType
}