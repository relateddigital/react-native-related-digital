import * as React from 'react';
import { View, Button, ScrollView, SafeAreaView } from 'react-native';
import { RelatedDigital } from '@relateddigital/react-native-huawei';
import {
  RelatedDigitalEventType,
  getRandomProductValues,
  formatPrice,
  RandomProduct,
} from '../Helpers';
import styles from './../Styles';

export function AnalyticsScreen() {
  const customEvent = (eventType: string) => {
    let properties: Record<string, string> = {};
    const randomValues: RandomProduct = getRandomProductValues();
    let code1 = `${randomValues.randomProductCode1}`;
    let code2 = `${randomValues.randomProductCode2}`;
    let quantity1 = `${randomValues.randomProductQuantity1}`;
    let quantity2 = `${randomValues.randomProductQuantity2}`;
    let price1 = `${formatPrice(randomValues.randomProductPrice1)}`;
    let price2 = `${formatPrice(randomValues.randomProductPrice2)}`;

    switch (eventType) {
      case RelatedDigitalEventType.login:
      case RelatedDigitalEventType.signUp:
      case RelatedDigitalEventType.loginWithExtraParameters:
        const exVisitorId = 'externalVisitorId';
        if (exVisitorId.trim() === '') {
          console.log('Warning: exVisitorId cannot be empty');
          return;
        } else {
          if (eventType === RelatedDigitalEventType.login) {
            RelatedDigital.login(exVisitorId, properties);
          } else if (eventType === RelatedDigitalEventType.signUp) {
            RelatedDigital.signUp(exVisitorId, properties);
          } else {
            properties['OM.vseg1'] = 'seg1val';
            properties['OM.vseg2'] = 'seg2val';
            properties['OM.vseg3'] = 'seg3val';
            properties['OM.vseg4'] = 'seg4val';
            properties['OM.vseg5'] = 'seg5val';
            properties['OM.bd'] = '1977-03-15';
            properties['OM.gn'] = randomValues.randomGender;
            properties['OM.loc'] = 'Bursa';
            RelatedDigital.login(exVisitorId, properties);
          }
          return;
        }
      case RelatedDigitalEventType.logout:
        RelatedDigital.logout();
        return;
      case RelatedDigitalEventType.pageView:
        RelatedDigital.customEvent('Page Name', {});
        return;

      case RelatedDigitalEventType.productView:
        properties['OM.pv'] = code1;
        properties['OM.pn'] = `Name-${code1}`;
        properties['OM.ppr'] = formatPrice(randomValues.randomProductPrice1);
        properties['OM.pv.1'] = 'Brand';
        properties['OM.inv'] = `${randomValues.randomInventory}`;
        RelatedDigital.customEvent('Product View', properties);
        return;

      case RelatedDigitalEventType.productAddToCart:
        properties['OM.pbid'] = `${randomValues.randomBasketID}`;
        properties['OM.pb'] = `${code1};${code2}`;
        properties['OM.pu'] = `${quantity1};${quantity2}`;
        properties['OM.ppr'] = `${price1};${price2}`;
        RelatedDigital.customEvent('Add To Cart', properties);
        return;

      case RelatedDigitalEventType.productPurchase:
        properties['OM.tid'] = `${randomValues.randomOrderID}`;
        properties['OM.pp'] = `${code1};${code2}`;
        properties['OM.pu'] = `${quantity1};${quantity2}`;
        properties['OM.ppr'] = `${price1};${price2}`;
        RelatedDigital.customEvent('Purchase', properties);
        return;

      case RelatedDigitalEventType.productCategoryPageView:
        properties['OM.clist'] = `${randomValues.randomCategoryID}`;
        RelatedDigital.customEvent('Category View', properties);
        return;

      case RelatedDigitalEventType.inAppSearch:
        properties['OM.OSS'] = 'laptop';
        properties['OM.OSSR'] = `${randomValues.randomNumberOfSearchResults}`;
        RelatedDigital.customEvent('In App Search', properties);
        return;

      case RelatedDigitalEventType.bannerClick:
        properties['OM.OSB'] = `${randomValues.randomBannerCode}`;
        RelatedDigital.customEvent('Banner Click', properties);
        return;

      case RelatedDigitalEventType.addToFavorites:
        properties['OM.pf'] = code1;
        properties['OM.pfu'] = '1';
        properties['OM.ppr'] = formatPrice(randomValues.randomProductPrice1);
        RelatedDigital.customEvent('Add To Favorites', properties);
        return;

      case RelatedDigitalEventType.removeFromFavorites:
        properties['OM.pf'] = code1;
        properties['OM.pfu'] = '-1';
        properties['OM.ppr'] = formatPrice(randomValues.randomProductPrice1);
        RelatedDigital.customEvent('Remove From Favorites', properties);
        return;

      case RelatedDigitalEventType.sendingCampaignParameters:
        let campaignParameters = {
          'utm_source': 'euromsg',
          'utm_medium': 'push',
          'utm_campaign': 'euromsg campaign',
          'OM.csource': 'euromsg',
          'OM.cmedium': 'push',
          'OM.cname': 'euromsg campaign',
        };
        RelatedDigital.sendCampaignParameters(campaignParameters);
        return;
      case RelatedDigitalEventType.getUser:
        RelatedDigital.getUser().then((user) => {
          console.log('User:', user);
        });
        return;
      case RelatedDigitalEventType.requestIDFA:
        RelatedDigital.requestIDFA();
        return;
      case RelatedDigitalEventType.sendLocationPermission:
        RelatedDigital.sendLocationPermission();
        return;
      default:
        return;
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {Object.values(RelatedDigitalEventType).map((eventType, index) => (
          <View style={styles.button} key={index}>
            <Button title={eventType} onPress={() => customEvent(eventType)} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
