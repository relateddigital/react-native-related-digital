import { Platform } from 'react-native'
import { 
    RelatedDigitalPushModule, 
    RelatedDigitalPushNotificationEmitter,
    DEVICE_NOTIF_EVENT,
    NOTIF_REGISTER_EVENT,
    NOTIF_REGISTRATION_ERROR_EVENT,
    checkNotificationNative
} from './native'
import { EuroMessageApi, VisilabsApi, RecommendationAttribute, RecommendationFilterType } from './api'
import RDStoryView from './RDStoryView'

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
              const readResult = await euroMessageApi.reportRead(notification.pushId)

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

const setApplicationIconBadgeNumber = (badgeNumber) => {
    if(Platform.OS === 'ios') {
        RelatedDigitalPushModule.setApplicationIconBadgeNumber(badgeNumber)
    }
    else {
        if(_log) {
            console.log('Related Digital - Unsupported platform for method: setApplicationIconBadgeNumber')
        }
    }
}

const logToConsole = (value) => {
    _log = value
}

export {
    addEventListener,
    removeEventListener,
    requestPermissions,
    setApplicationIconBadgeNumber,
    logToConsole,
    EuroMessageApi,
    VisilabsApi,
    RDStoryView,
    RecommendationAttribute,
    RecommendationFilterType
}