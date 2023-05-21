import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from './components/CustomTabBar';
import AnalyticsScreen from './screens/AnalyticsScreen';
import TargetingActionScreen from './screens/TargetingActionScreen';
import StoryScreen from './screens/StoryScreen';
import GeofenceScreen from './screens/GeofenceScreen';
import Recommendation from './screens/Recommendation';
import FavoriteAttribute from './screens/FavoriteAttribute';
import Push from './screens/Push';

const Tab = createBottomTabNavigator();

import { NativeBaseProvider } from 'native-base';

const App: React.FC = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
          <Tab.Screen name="Analytics" component={AnalyticsScreen} />
          <Tab.Screen
            name="TargetingAction"
            component={TargetingActionScreen}
          />
          <Tab.Screen name="Story" component={StoryScreen} />
          <Tab.Screen name="Geofence" component={GeofenceScreen} />
          <Tab.Screen name="Recommendation" component={Recommendation} />
          <Tab.Screen name="FavoriteAttribute" component={FavoriteAttribute} />
          <Tab.Screen name="Push" component={Push} />
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
