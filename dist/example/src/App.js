import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './components/CustomTabBar';
import { NativeBaseProvider } from 'native-base';
import { getScreens } from './Helpers';
const Tab = createBottomTabNavigator();
const screens = getScreens();
const App = () => {
    return (React.createElement(NativeBaseProvider, null,
        React.createElement(NavigationContainer, null,
            React.createElement(Tab.Navigator, { tabBar: (props) => React.createElement(CustomTabBar, { ...props }) }, screens.map((screen) => (React.createElement(Tab.Screen, { key: screen.name, name: screen.name, component: screen.screen, options: { title: screen.title } })))))));
};
export default App;
