import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTabLogo, getTitle, ScreenType } from '../Helpers';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const insets = useSafeAreaInsets();

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

        const title = getTitle(route.name as ScreenType);
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
              <View style={styles.imageContainer}>
                <Image
                  source={logo}
                  style={[styles.logo, selected ? styles.selectedLogo : null]}
                />
                <Text
                  style={[
                    styles.tabTitle,
                    selected ? styles.selectedTabTitle : null,
                  ]}
                >
                  {title}
                </Text>
              </View>
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
    height: 100,
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
    backgroundColor: '#e0e0e0',
  },
  unselectedTabItem: {
    backgroundColor: 'white',
  },
  selectedLogo: {
    tintColor: '#007AFF',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabTitle: {
    fontSize: 10,
    color: 'gray',
    marginTop: 5,
  },
  selectedTabTitle: {
    fontSize: 10,
    color: '#007AFF',
    marginTop: 5,
  },
});

export default CustomTabBar;
