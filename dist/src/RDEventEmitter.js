'use strict';
import { NativeEventEmitter, Platform, AppRegistry, NativeModules, } from 'react-native';
export class RDEventBridge {
    dispatchEventsCallback;
    constructor(dispatchEventsCallback) {
        this.dispatchEventsCallback = dispatchEventsCallback;
    }
}
class DefaultRDEventBridge extends RDEventBridge {
    nativeModule = NativeModules.RDReactModule;
    eventEmitter = new NativeEventEmitter(this.nativeModule);
    constructor(dispatchEventsCallback) {
        super(dispatchEventsCallback);
        if (Platform.OS === 'android') {
            AppRegistry.registerHeadlessTask('RDAndroidBackgroundEventTask', () => {
                return () => dispatchEventsCallback(this.nativeModule.takePendingBackgroundEvents);
            });
            this.eventEmitter.addListener('com.relateddigital.onPendingForegroundEvent', //TODO: change this
            async () => {
                return dispatchEventsCallback(this.nativeModule.takePendingForegroundEvents);
            });
        }
        else if (Platform.OS === 'ios') {
            this.eventEmitter.addListener('com.relateddigital.onPendingEvent', //TODO: change this
            async () => {
                return dispatchEventsCallback(this.nativeModule.takePendingEvents);
            });
        }
    }
    notifyRDListenerAdded(eventType) {
        this.nativeModule.onRDListenerAdded(eventType);
    }
}
/**
 * SDK event emitter.
 *
 * @hidden
 */
export class RDEventEmitter {
    rdEventBridge;
    listeners;
    constructor(rdEventBridgeFactory) {
        this.listeners = new Map();
        this.rdEventBridge = rdEventBridgeFactory
            ? rdEventBridgeFactory(this.dispatchEvents.bind(this))
            : new DefaultRDEventBridge(this.dispatchEvents.bind(this));
    }
    removeListener(eventType, listener) {
        var typedListeners = this.listeners.get(eventType);
        if (typedListeners) {
            typedListeners = typedListeners.filter((obj) => obj !== listener);
            this.listeners.set(eventType, typedListeners);
        }
    }
    addListener(eventType, listener) {
        if (!this.listeners.get(eventType)) {
            this.listeners.set(eventType, []);
        }
        this.listeners.get(eventType)?.push(listener);
        this.rdEventBridge.notifyRDListenerAdded(eventType);
    }
    removeAllListeners(eventType) {
        this.listeners.set(eventType, []);
    }
    async dispatchEvents(source) {
        let actions = Array.from(this.listeners.keys()).map(async (key) => {
            let typedListeners = this.listeners.get(key);
            if (typedListeners == null) {
                return Promise.resolve();
            }
            let events = await source(key);
            return Promise.all(typedListeners.map(async (listener) => {
                for (const event of events) {
                    await listener(event);
                }
            }));
        });
        return Promise.all(actions);
    }
}
