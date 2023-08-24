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
    const randomProduct: RandomProduct = getRandomProductValues();

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
            properties['OM.gn'] = randomProduct.randomGender;
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
        properties['OM.pv'] = `${randomProduct.randomProductCode1}`;
        properties['OM.pn'] = `Name-${randomProduct.randomProductCode1}`;
        properties['OM.ppr'] = formatPrice(randomProduct.randomProductPrice1);
        properties['OM.pv.1'] = 'Brand';
        properties['OM.inv'] = `${randomProduct.randomInventory}`;
        RelatedDigital.customEvent('Product View', properties);
        return;

      case RelatedDigitalEventType.productAddToCart:
        properties['OM.pv'] = `${randomProduct.randomProductCode1}`;
        properties['OM.qt'] = `${randomProduct.randomProductQuantity1}`;
        RelatedDigital.customEvent('Add To Cart', properties);
        return;

      case RelatedDigitalEventType.productPurchase:
        properties['OM.pv'] = `${randomProduct.randomProductCode1}`;
        properties['OM.qt'] = `${randomProduct.randomProductQuantity1}`;
        properties['OM.oid'] = `${randomProduct.randomOrderID}`;
        RelatedDigital.customEvent('Purchase', properties);
        return;

      case RelatedDigitalEventType.productCategoryPageView:
        properties['OM.clist'] = `${randomProduct.randomCategoryID}`;
        RelatedDigital.customEvent('Category View', properties);
        return;

      case RelatedDigitalEventType.inAppSearch:
        properties['OM.OSS'] = 'laptop';
        properties['OM.OSSR'] = `${randomProduct.randomNumberOfSearchResults}`;
        RelatedDigital.customEvent('In App Search', properties);
        return;

      case RelatedDigitalEventType.bannerClick:
        properties['OM.OSB'] = `${randomProduct.randomBannerCode}`;
        RelatedDigital.customEvent('Banner Click', properties);
        return;

      case RelatedDigitalEventType.addToFavorites:
        properties['OM.pv'] = `${randomProduct.randomProductCode1}`;
        RelatedDigital.customEvent('Add To Favorites', properties);
        return;

      case RelatedDigitalEventType.removeFromFavorites:
        properties['OM.pv'] = `${randomProduct.randomProductCode1}`;
        RelatedDigital.customEvent('Remove From Favorites', properties);
        return;

      case RelatedDigitalEventType.sendingCampaignParameters:
        let campaignParameters = {
          campaignId: 'Campaign Id',
          campaignStep: 'Campaign Step',
        };
        RelatedDigital.sendCampaignParameters(campaignParameters);
        return;
      case RelatedDigitalEventType.getUser:
        RelatedDigital.getUser().then((user) => {
          console.log('User:', user);
        });
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
