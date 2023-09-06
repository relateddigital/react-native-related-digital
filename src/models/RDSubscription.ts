export enum RDEventType {
  NotificationRegistered = 'com.relateddigital.notification_registered',
  NotificationReceived = 'com.relateddigital.notification_received',
  NotificationOpened = 'com.relateddigital.notification_opened',
}

/**
 * A listener subscription.
 */
export class RDSubscription {
  onRemove: () => void;
  constructor(onRemove: () => void) {
    this.onRemove = onRemove;
  }
  /**
   * Removes the listener.
   */
  remove(): void {
    this.onRemove();
  }
}
