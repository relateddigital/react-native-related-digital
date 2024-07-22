import { Platform } from 'react-native'
import { 
    RelatedDigitalPushModule, 
    RelatedDigitalPushNotificationEmitter,
    DEVICE_NOTIF_EVENT,
    NOTIF_REGISTER_EVENT,
    NOTIF_REGISTRATION_ERROR_EVENT,
    CAROUSEL_ITEM_CLICKED_EVENT,
    checkNotificationNative,
    logoutNative,
    getUserNative,
    getSubscriptionNative,
    ACTION_BUTTON_CLICKED_EVENT
} from './native'
import { EuroMessageApi, VisilabsApi, RecommendationAttribute, RecommendationFilterType } from './api'
import RDStoryView from './RDStoryView'
import RDBannerView from './RDBannerView'
import { getAllCookies, getLogToConsole, removeAllCookies } from './utils';

const _notifHandlers = new Map();
let _log = true;

const addEventListener = (type, handler, readHandler, euroMessageApi, visilabsApi) => {
    if (type === 'notification') {
        const listener = RelatedDigitalPushNotificationEmitter.addListener(
            DEVICE_NOTIF_EVENT,
            (notifData) => {
                handler(notifData);
            },
        );

        _notifHandlers.set(type, listener);
    }
    else if (type === 'register') {
        const listener = RelatedDigitalPushNotificationEmitter.addListener(
            NOTIF_REGISTER_EVENT,
            (registrationInfo) => {
                handler(registrationInfo.deviceToken);
            },
        );

        const readListener = RelatedDigitalPushNotificationEmitter.addListener(
            DEVICE_NOTIF_EVENT,
            async (notification) => {
              const readResult = await euroMessageApi.reportRead(notification)

              if(readHandler && typeof readHandler === 'function') {
                readHandler(notification)
              }

              let utm_campaign = notification.utm_campaign
              let utm_source = notification.utm_source
              let utm_medium = notification.utm_medium

              if(Platform.OS === 'android' && notification.params) {
                utm_campaign = notification.params.utm_campaign
                utm_source = notification.params.utm_source
                utm_medium = notification.params.utm_medium
              }

              if(utm_campaign || utm_source || utm_medium) {
                  visilabsApi.customEvent('OM_evt.gif', {
                    utm_campaign,
                    utm_source,
                    utm_medium
                  })
              }
            }
        );

        _notifHandlers.set(type, listener);
        _notifHandlers.set('notification', readListener);

        checkNotificationNative()
    }
    else if (type === 'registrationError') {
        const listener = RelatedDigitalPushNotificationEmitter.addListener(
            NOTIF_REGISTRATION_ERROR_EVENT,
            (errorInfo) => {
                handler(errorInfo);
            },
        );

        _notifHandlers.set(type, listener);
    }
    else if (type === 'carouselItemClicked') {
        if (Platform.OS === 'android') {
            const listener = RelatedDigitalPushNotificationEmitter.addListener(
                CAROUSEL_ITEM_CLICKED_EVENT,
                (notifData) => {
                    handler(notifData);
                },
            );
            _notifHandlers.set(type, listener);
        } else {
            if (getLogToConsole()) {
                console.log(`Related Digital - Listener not supported on iOS (carouselItemClicked)`)
            }
        }
    }
    else if(type === 'ActionButtonClicked'){
        const listener = RelatedDigitalPushNotificationEmitter.addListener(
            ACTION_BUTTON_CLICKED_EVENT,
            (notifData) => {
                handler(notifData);
                console.log("ACTION_BUTTON_CLICKED_EVENT",notifData);
            },
        );

        _notifHandlers.set(type, listener);
    }
}

const removeEventListener = (type) => {
  const listener = _notifHandlers.get(type);

  if (!listener) {
    return;
  }

  listener.remove();
  _notifHandlers.delete(type);

  if(type === 'register') {
    removeEventListener('notification')
  }
}

const requestPermissions = async (isProvisional = false) => {
    if(Platform.OS === 'ios') {
        return await RelatedDigitalPushModule.requestPermissions(isProvisional)
    }
    else {
        return await RelatedDigitalPushModule.requestPermissions()
    }
}

const requestIDFA = async () => {
    if(Platform.OS === 'ios') {
        return await RelatedDigitalPushModule.requestIDFA()
    }
    else {
        if(_log) {
            console.log('Related Digital:requesIDFA - Unsupported method for Android platform')
        }
    }
}

const requestLocationPermission = async () => {
    return await RelatedDigitalPushModule.requestLocationPermission()
}

const requestLocationPermissionWithPopup = async (title, message, positiveButton, negativeButton) => {
    if(Platform.OS === 'android') {
        if (![title, message, positiveButton, negativeButton].every(param => typeof param === 'string')) {
            console.error('Related Digital:requestLocationPermissionWithPopup - All parameters must be strings');
            return
        }
        return await RelatedDigitalPushModule.requestLocationPermissionWithPopup(title, message, positiveButton, negativeButton)
    }
    else {
        if(_log) {
            console.log('Related Digital:requestLocationPermissionWithPopup - Unsupported method for iOS platform')
        }
    }
}

const requestBackgroundLocationPermission = async () => {
    if(Platform.OS === 'android') {
        return await RelatedDigitalPushModule.requestBackgroundLocationPermission()
    }
    else {
        if(_log) {
            console.log('Related Digital:requestBackgroundLocationPermission - Unsupported method for iOS platform')
        }
    }
}

const requestBackgroundLocationPermissionWithPopup = async (locationTitle, locationMessage, backgroundTitle, backgroundMessage, positiveButton, negativeButton) => {
    if(Platform.OS === 'android') {
        if (![locationTitle, locationMessage, backgroundTitle, backgroundMessage, positiveButton, negativeButton].every(param => typeof param === 'string')) {
            console.error('Related Digital:requestBackgroundLocationPermissionWithPopup - All parameters must be strings');
            return
        }
        return await RelatedDigitalPushModule.requestBackgroundLocationPermissionWithPopup(locationTitle, locationMessage, backgroundTitle, backgroundMessage, positiveButton, negativeButton)
    }
    else {
        if(_log) {
            console.log('Related Digital:requestBackgroundLocationPermissionWithPopup - Unsupported method for iOS platform')
        }
    }
}

const setGeofencingIntervalInMinute = (interval) => {
    if(Platform.OS === 'android') {
        RelatedDigitalPushModule.setGeofencingIntervalInMinute(interval)
    }
    else {
        if(_log) {
            console.log('Related Digital:setGeofencingIntervalInMinute - Unsupported method for iOS platform')
        }
    }
}

const setApplicationIconBadgeNumber = (badgeNumber) => {
    if(Platform.OS === 'ios') {
        RelatedDigitalPushModule.setApplicationIconBadgeNumber(badgeNumber)
    }
    else {
        if(_log) {
            console.log('Related Digital:setApplicationIconBadgeNumber - Unsupported method for Android platform')
        }
    }
}

const logToConsole = (value) => {
    _log = value
}

const logout = async (onlyEM) => {
    await logoutNative(onlyEM)
    removeAllCookies()
}

const getUserAllData = async () => {
    try {
        const vl = await getUserNative()
        const em = await getSubscriptionNative()
        let rnRaw = await getAllCookies()
        let rn = {}
        rnRaw.forEach(item => {
            if (item[1]) {
                try {
                    item[1] = JSON.parse(item[1])
                } catch (error) {console.log("Json convert error",error);}
            }
            rn[item[0]] = item[1]
        });
        const result = {
            "visilabs":JSON.parse(vl),
            "euromsg":JSON.parse(em),
            "js":rn
        }
        return Promise.resolve(result)
    } catch (error) {
        return Promise.resolve("RNRD->GetUserAllData",error) 
    }
}

export {
    addEventListener,
    removeEventListener,
    requestPermissions,
    requestIDFA,
    requestLocationPermission,
    requestLocationPermissionWithPopup,
    requestBackgroundLocationPermission,
    requestBackgroundLocationPermissionWithPopup,
    setGeofencingIntervalInMinute,
    setApplicationIconBadgeNumber,
    logout,
    logToConsole,
    getUserAllData,
    EuroMessageApi,
    VisilabsApi,
    RDStoryView,
    RDBannerView,
    RecommendationAttribute,
    RecommendationFilterType
}