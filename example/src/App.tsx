import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './components/CustomTabBar';
import { NativeBaseProvider } from 'native-base';
import { getScreens, ScreenTypeParams } from './Helpers';

const Tab = createBottomTabNavigator();

const screens: ScreenTypeParams[] = getScreens();

const App: React.FC = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Tab.Navigator
          tabBar={(props) => <CustomTabBar {...props} />}
          screenOptions={{ headerShown: false }}
        >
          {screens.map((screen) => (
            <Tab.Screen
              key={screen.name}
              name={screen.name}
              component={screen.screen}
            />
          ))}
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
