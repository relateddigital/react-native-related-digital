'use strict';

import {
  NativeEventEmitter,
  Platform,
  AppRegistry,
  NativeModules,
} from 'react-native';

export type DispatchEventsCallback = (
  source: (eventType: string) => Promise<any>
) => Promise<any>;

export abstract class RDEventBridge {
  dispatchEventsCallback: DispatchEventsCallback;

  protected constructor(dispatchEventsCallback: DispatchEventsCallback) {
    this.dispatchEventsCallback = dispatchEventsCallback;
  }

  abstract notifyRDListenerAdded(eventListener: string): void;
}

class DefaultRDEventBridge extends RDEventBridge {
  nativeModule = NativeModules.RelatedDigitalReactModule;
  eventEmitter = new NativeEventEmitter(this.nativeModule);

  constructor(dispatchEventsCallback: DispatchEventsCallback) {
    super(dispatchEventsCallback);

    if (Platform.OS === 'android') {
      AppRegistry.registerHeadlessTask('RDAndroidBackgroundEventTask', () => {
        return () =>
          dispatchEventsCallback(this.nativeModule.takePendingBackgroundEvents);
      });

      this.eventEmitter.addListener(
        'com.relateddigital.onPendingForegroundEvent', //TODO: change this
        async () => {
          return dispatchEventsCallback(
            this.nativeModule.takePendingForegroundEvents
          );
        }
      );
    } else if (Platform.OS === 'ios') {
      this.eventEmitter.addListener(
        'com.relateddigital.onPendingEvent', //TODO: change this
        async () => {
          return dispatchEventsCallback(this.nativeModule.takePendingEvents);
        }
      );
    }
  }

  notifyRDListenerAdded(eventType: string): void {
    this.nativeModule.onRDListenerAdded(eventType);
  }
}

export class RDEventEmitter {
  rdEventBridge: RDEventBridge;
  listeners: Map<string, Array<(...args: any[]) => any>>;

  constructor(
    rdEventBridgeFactory?: (callback: DispatchEventsCallback) => RDEventBridge
  ) {
    this.listeners = new Map();
    this.rdEventBridge = rdEventBridgeFactory
      ? rdEventBridgeFactory(this.dispatchEvents.bind(this))
      : new DefaultRDEventBridge(this.dispatchEvents.bind(this));
  }

  removeListener(eventType: string, listener: (...args: any[]) => any): void {
    let typedListeners = this.listeners.get(eventType);
    if (typedListeners) {
      typedListeners = typedListeners.filter((obj) => obj !== listener);
      this.listeners.set(eventType, typedListeners);
    }
  }

  addListener(eventType: string, listener: (...args: any[]) => any): void {
    if (!this.listeners.get(eventType)) {
      this.listeners.set(eventType, []);
    }

    this.listeners.get(eventType)?.push(listener);
    this.rdEventBridge.notifyRDListenerAdded(eventType);
  }

  removeAllListeners(eventType: string) {
    this.listeners.set(eventType, []);
  }

  private async dispatchEvents(
    source: (eventType: string) => Promise<any>
  ): Promise<any> {
    let actions = Array.from(this.listeners.keys()).map(async (key: string) => {
      let typedListeners = this.listeners.get(key);
      if (typedListeners == null) {
        return Promise.resolve();
      }

      let events = await source(key);
      return Promise.all(
        typedListeners.map(async (listener: (...args: any[]) => any) => {
          for (const event of events) {
            await listener(event);
          }
        })
      );
    });
    return Promise.all(actions);
  }
}

