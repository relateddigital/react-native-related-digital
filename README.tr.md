# @relateddigital/react-native-huawei
If you are sure the module exists, try these steps:
1. Clear watchman watches: watchman watch-del-all
2. Delete node_modules and run yarn install
3. Reset Metro's cache: yarn start --reset-cache
4. Remove the cache: rm -rf /tmp/metro-*


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






















## Platform Integration

### iOS

### Android

