import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import analyticsLogo from '../../assets/analytics.png';
import targetingActionLogo from '../../assets/targetingAction.png';
import storyLogo from '../../assets/story.png';
import geofenceLogo from '../../assets/geofence.png';
import recommendationLogo from '../../assets/recommendation.png';
import favoriteAttributeLogo from '../../assets/favoriteAttribute.png';
import pushLogo from '../../assets/push.png';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const insets = useSafeAreaInsets();

  const getTabLogo = (routeName: string) => {
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

        const logo = getTabLogo(route.name);
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
