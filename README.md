<div style="text-align:center;">
    <img src="https://github.com/relateddigital/relateddigital-android/blob/master/app/relateddigital.png" alt=''/>
</div>

# React Native Related Digital SDK

The RelatedDigital React Native SDK provides a simple interface for integrating the RelatedDigital platform features into your React Native applications. The SDK includes methods for analytics, push notifications, and user property management.

## Installation

To install the RelatedDigital React Native SDK, add the package to your project:

```sh
npm install react-native-related-digital
```

## Usage
First, import the `RelatedDigital` module:

```js
import RelatedDigital from 'react-native-related-digital';
```

Then, initialize the SDK with your organization ID, profile ID, and data source:

```js
RelatedDigital.initialize(
  'organizationId',
  'profileId',
  'dataSource',
  askLocationPermissionAtStart
);
```

## Analytics

To send custom events, use the `customEvent` method:

```js
RelatedDigital.customEvent('pageName', { key: 'value' });
```

## Push Notifications

Enable or disable in-app notifications:

```js
RelatedDigital.setIsInAppNotificationEnabled(true);
```

Enable or disable geofence notifications:

```js
RelatedDigital.setIsGeofenceEnabled(true);
```

Set the push notification settings:

```js
RelatedDigital.setIsPushNotificationEnabled(
  true,
  'appAlias',
  'huaweiAppAlias',
  true
);
```

## User Properties

Set user properties with the `setUserProperty` method:

```js
RelatedDigital.setUserProperty('key', 'value');
```

Remove a user property with the `removeUserProperty` method:

```js
RelatedDigital.removeUserProperty('key');
```

## Other Methods

The RelatedDigital SDK includes additional methods for managing user information, authentication, and third-party integrations. For a complete list of available methods, please refer to the RelatedDigitalType TypeScript type definition.

## RelatedDigitalType

The `RelatedDigitalType` provides type information for the RelatedDigital module. It includes method signatures, input parameters, and return types for all the available SDK methods. To view the complete list of methods and their descriptions, refer to the `RelatedDigitalType` definition in the SDK source code.

## Example Application

For an example of how to use the RelatedDigital React Native SDK in a real-world application, please refer to the example project provided in the SDK repository.

## Support

For support or questions related to the RelatedDigital React Native SDK, please contact the RelatedDigital support team or visit the RelatedDigital Developer Portal.












## Örnek Payload Android

### onNotificationReceived

```json
{
  "emPushSp": "-",
  "message": "Text Message",
  "params": {
    "emPushSp": "-",
    "message": "Text Message",
    "pushId": "cc80d835-be2d-49ec-a742-ab4d721651ed",
    "pushType": "Text",
    "silent": "True",
    "title": "sample string 1"
  },
  "pushId": "cc80d835-be2d-49ec-a742-ab4d721651ed",
  "pushType": "Text",
  "silent": "True",
  "sound": "",
  "title": "sample string 1"
}
```

### onNotificationOpened

```json
{
  "emPushSp": "-",
  "message": "Text Message",
  "params": {
    "emPushSp": "-",
    "message": "Text Message",
    "pushId": "e4180169-0c96-4a6d-88f3-fe78e072dc62",
    "pushType": "Text",
    "silent": "False",
    "title": "sample string 1"
  },
  "pushId": "e4180169-0c96-4a6d-88f3-fe78e072dc62",
  "pushType": "Text",
  "silent": "False",
  "sound": "",
  "title": "sample string 1"
}
```


### getPushMessages

```json
[
  {
    "date": "2023-04-11 00:28:36",
    "emPushSp": "-",
    "message": "Text Message",
    "params": {
      "pushId": "4836b750-8639-469a-8b85-f3ae056edbab",
      "silent": "False",
      "emPushSp": "-",
      "title": "re",
      "message": "Text Message",
      "pushType": "Text"
    },
    "pushId": "4836b750-8639-469a-8b85-f3ae056edbab",
    "pushType": "Text",
    "silent": "False",
    "sound": "",
    "title": "re"
  },
  {
    "date": "2023-04-11 00:05:13",
    "emPushSp": "-",
    "message": "Text Message",
    "params": {
      "pushId": "e4180169-0c96-4a6d-88f3-fe78e072dc62",
      "silent": "False",
      "emPushSp": "-",
      "title": "sample string 1",
      "message": "Text Message",
      "pushType": "Text"
    },
    "pushId": "e4180169-0c96-4a6d-88f3-fe78e072dc62",
    "pushType": "Text",
    "silent": "False",
    "sound": "",
    "title": "sample string 1"
  }
]
```






## Platform Integration

### iOS

### Android

