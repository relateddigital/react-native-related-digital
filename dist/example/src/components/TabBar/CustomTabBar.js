import React from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity, View, } from 'react-native';
import analyticsLogo from '../../assets/analytics.png';
import targetingActionLogo from '../../assets/targetingAction.png';
import storyLogo from '../../assets/story.png';
import geofenceLogo from '../../assets/geofence.png';
import recommendationLogo from '../../assets/recommendation.png';
import favoriteAttributeLogo from '../../assets/favoriteAttribute.png';
import pushLogo from '../../assets/push.png';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const CustomTabBar = ({ state, navigation }) => {
    const insets = useSafeAreaInsets();
    const getTabLogo = (routeName) => {
        switch (routeName) {
            case 'Analytics':
                return analyticsLogo;
            case 'TargetingAction':
                return targetingActionLogo;
            case 'Story':
                return storyLogo;
            case 'Geofence':
                return geofenceLogo;
            case 'Recommendation':
                return recommendationLogo;
            case 'FavoriteAttribute':
                return favoriteAttributeLogo;
            case 'Push':
                return pushLogo;
            default:
                return null;
        }
    };
    return (React.createElement(View, { style: [styles.container, { paddingBottom: insets.bottom }] }, state.routes.map((route, index) => {
        const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
            });
            if (!event.defaultPrevented) {
                navigation.navigate(route.name);
            }
        };
        const logo = getTabLogo(route.name);
        return (React.createElement(TouchableOpacity, { key: index, onPress: onPress, style: styles.tabItem }, logo && React.createElement(Image, { source: logo, style: styles.logo })));
    })));
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 80,
        backgroundColor: 'white',
        paddingBottom: Platform.OS === 'android' ? 0 : 10,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 24,
        height: 24,
        marginBottom: Platform.OS === 'android' ? 0 : 5,
    },
});
export default CustomTabBar;
