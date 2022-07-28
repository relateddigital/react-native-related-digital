import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native'

let _log = true;

export const isEmptyOrSpaces = (str) => {
    return (str === undefined || str === null) || str.match(/^ *$/) !== null;
}

export const setCookieID = () => {
    const cookieID = generateGuid()
    AsyncStorage.setItem("OM.cookieID", cookieID)
    return cookieID
}

const generateGuid = () => {
    return g4() + g4() + '-' + g4() + '-' + g4() + '-' + g4() + '-' + g4() + g4() + g4()
}

const g4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
}

export const fetchAsync = async (url, method = 'GET', data) => {
    const options = {
        method,
        'Content-Type': 'application/json'
    }

    if (method === 'POST' && data) {
        options.body = JSON.stringify(data)
    }

    if (_log) {
        console.log(`Related Digital - Calling url: ${url} with options: ${JSON.stringify(options)}`)
    }

    return await fetch(url, options)
}

export const fetchWithCallback = (url, method = 'GET', data, callback) => {
    const options = {
        method,
        'Content-Type': 'application/json'
    }

    if (method === 'POST' && data) {
        options.body = JSON.stringify(data)
    }

    if (!callback || typeof callback !== 'function') {
        callback = () => { }
    }

    if (_log) {
        console.log(`Related Digital - Calling url: ${url} with options: ${JSON.stringify(options)}`)
    }

    fetch(url, options)
        .then(res => {
            callback(res)
        })
        .catch(err => {
            callback(err)
        })
}

export const logToConsole = (value) => {
    _log = value
}

export const getLogToConsole = () => {
    return _log
}

export const timeout = (ms, promise) => {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('TIMEOUT'))
        }, ms)

        promise
            .then(value => {
                clearTimeout(timer)
                resolve(value)
            })
            .catch(reason => {
                clearTimeout(timer)
                reject(reason)
            })
    })
}

export const checkIosParameters = async (obj) => {
    if (Platform.OS == "ios") {
        if (!obj["apiver"])
            obj["apiver"] = "IOS"

        if (!obj["channel"])
            obj["channel"] = "IOS"

        if (!obj["vchannel"])
            obj["vchannel"] = "IOS"

        if (!obj["mappl"])
            obj["mappl"] = "true"
    }
    return Promise.resolve(obj)
}