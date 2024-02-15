export var RDEventType;
(function (RDEventType) {
    RDEventType["NotificationRegistered"] = "com.relateddigital.notification_registered";
    RDEventType["NotificationReceived"] = "com.relateddigital.notification_received";
    RDEventType["NotificationOpened"] = "com.relateddigital.notification_opened";
})(RDEventType || (RDEventType = {}));
/**
 * A listener subscription.
 */
export class RDSubscription {
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
