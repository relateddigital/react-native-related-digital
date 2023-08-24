import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import analyticsLogo from '../assets/analytics.png';
import targetingActionLogo from '../assets/targetingAction.png';
import storyLogo from '../assets/story.png';
import geofenceLogo from '../assets/geofence.png';
import recommendationLogo from '../assets/recommendation.png';
import favoriteAttributeLogo from '../assets/favoriteAttribute.png';
import pushLogo from '../assets/push.png';
import { ScreenType } from '../Helpers';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const insets = useSafeAreaInsets();
  const getTabLogo = (routeName: ScreenType) => {
    switch (routeName) {
      case ScreenType.analytics:
        return analyticsLogo;
      case ScreenType.targetingAction:
        return targetingActionLogo;
      case ScreenType.story:
        return storyLogo;
      case ScreenType.geofence:
        return geofenceLogo;
      case ScreenType.recommendation:
        return recommendationLogo;
      case ScreenType.favoriteAttribute:
        return favoriteAttributeLogo;
      case ScreenType.push:
        return pushLogo;
      default:
        return null;
    }
  };

  const isSelected = (routeName: string) => {
    return state.index === state.routes.findIndex((r) => r.name === routeName);
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
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

        const logo = getTabLogo(route.name as ScreenType);
        const selected = isSelected(route.name);

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={[
              styles.tabItem,
              selected ? styles.selectedTabItem : styles.unselectedTabItem,
            ]}
          >
            {logo && (
              <Image
                source={logo}
                style={[styles.logo, selected ? styles.selectedLogo : null]}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 80,
    backgroundColor: 'white',
    paddingBottom: Platform.OS === 'android' ? 0 : 10,
    borderTopColor: '#e0e0e0',
    borderTopWidth: 1,
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

  selectedTabItem: {
    backgroundColor: '#e0e0e0', // seçili sekme öğesinin arka plan rengi
  },
  unselectedTabItem: {
    backgroundColor: 'white', // seçilmemiş sekme öğesinin arka plan rengi
  },
  selectedLogo: {
    tintColor: '#007AFF', // seçili logo rengi
  },
});

export default CustomTabBar;
