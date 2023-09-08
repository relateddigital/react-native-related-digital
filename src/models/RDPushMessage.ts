export interface Alert {
  title?: string;
  body?: string;
}

export interface Aps {
  alert?: Alert;
  category?: string;
  sound?: string;
  contentAvailable?: number;
}

export interface Element {
  title?: string;
  content?: string;
  url?: string;
  picture?: string;
}

export interface ActionButton {
  title?: string;
  identifier?: string;
  url?: string;
}

export interface RDPushMessage {
  title?: string;
  body?: string;
  formattedDateString?: string;
  formattedOpenDateString?: string;
  aps?: Aps;
  altURL?: string;
  cid?: string;
  url?: string;
  settings?: string;
  pushType?: string;
  altUrl?: string;
  mediaUrl?: string;
  deeplink?: string;
  pushId?: string;
  emPushSp?: string;
  elements?: Element[];
  buttons?: ActionButton[];
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
  utm_content?: string;
  utm_term?: string;
  notificationLoginID?: string;
  status?: string;
  deliver?: string;
  silent?: string;
}

export enum RDEventType {
  NotificationRegistered = 'com.relateddigital.notification_registered',
  NotificationReceived = 'com.relateddigital.notification_received',
  NotificationOpened = 'com.relateddigital.notification_opened',
}

