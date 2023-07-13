import * as React from 'react';
import { StyleSheet, View, Button, TextInput, ScrollView, SafeAreaView, } from 'react-native';
import { RelatedDigital } from '@relateddigital/react-native-huawei';
import { RelatedDigitalEventType, getRandomProductValues, formatPrice, } from '../Helpers';
function AnalyticsScreen() {
    const [exVisitorId, setExVisitorId] = React.useState('');
    const [email, setEmail] = React.useState('');
    const customEvent = (eventType) => {
        let properties = {};
        const randomProduct = getRandomProductValues();
        switch (eventType) {
            case RelatedDigitalEventType.login:
            case RelatedDigitalEventType.signUp:
            case RelatedDigitalEventType.loginWithExtraParameters:
                if (exVisitorId.trim() === '') {
                    console.log('Warning: exVisitorId cannot be empty');
                    return;
                }
                else {
                    if (eventType === RelatedDigitalEventType.login) {
                        RelatedDigital.login(exVisitorId, properties);
                    }
                    else if (eventType === RelatedDigitalEventType.signUp) {
                        RelatedDigital.signUp(exVisitorId, properties);
                    }
                    else {
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
            case RelatedDigitalEventType.pushMessage:
                // Assuming you have token, iosAppAlias, googleAppAlias, huaweiAppAlias, and deliveredBadge
                RelatedDigital.setIsPushNotificationEnabled(true, 'RDIOSExample', 'relateddigital-android-test', 'relateddigital-android-huawei-test', true);
                return;
            default:
                return;
        }
    };
    return (React.createElement(SafeAreaView, null,
        React.createElement(ScrollView, { contentContainerStyle: styles.container },
            React.createElement(TextInput, { style: styles.input, onChangeText: setExVisitorId, value: exVisitorId, placeholder: "exVisitorId" }),
            React.createElement(TextInput, { style: styles.input, onChangeText: setEmail, value: email, placeholder: "email" }),
            Object.values(RelatedDigitalEventType).map((eventType, index) => (React.createElement(View, { style: styles.button, key: index },
                React.createElement(Button, { title: eventType, onPress: () => customEvent(eventType) })))))));
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 8,
        paddingRight: 8,
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 16,
    },
    button: {
        marginBottom: 16,
    },
});
export default AnalyticsScreen;
