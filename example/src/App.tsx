import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';

import EventScreen from './EventScreen';
import PushScreen from './PushScreen';
import TargetScreen from './TargetScreen';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: () => {
            let iconName;
            if (route.name === 'Event') {
              iconName = require('./img/analytics.png');
            } else if (route.name === 'Push') {
              iconName = require('./img/notification.png');
            } else if (route.name === 'Target') {
              iconName = require('./img/target.png');
            }
            return <Image source={iconName} style={styles.img} />;
          },
        })}
      >
        <Tab.Screen name="Event" component={EventScreen} />
        <Tab.Screen name="Push" component={PushScreen} />
        <Tab.Screen name="Target" component={TargetScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 24,
    height: 24,
  },
});

export default App;
