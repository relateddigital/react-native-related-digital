import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import EventScreen from './EventScreen';
import PushScreen from './PushScreen';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Event" component={EventScreen} />
        <Tab.Screen name="Push" component={PushScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
