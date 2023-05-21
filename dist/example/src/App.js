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
const App = () => {
    return (React.createElement(NativeBaseProvider, null,
        React.createElement(NavigationContainer, null,
            React.createElement(Tab.Navigator, { tabBar: (props) => React.createElement(CustomTabBar, { ...props }) },
                React.createElement(Tab.Screen, { name: "Analytics", component: AnalyticsScreen }),
                React.createElement(Tab.Screen, { name: "TargetingAction", component: TargetingActionScreen }),
                React.createElement(Tab.Screen, { name: "Story", component: StoryScreen }),
                React.createElement(Tab.Screen, { name: "Geofence", component: GeofenceScreen }),
                React.createElement(Tab.Screen, { name: "Recommendation", component: Recommendation }),
                React.createElement(Tab.Screen, { name: "FavoriteAttribute", component: FavoriteAttribute }),
                React.createElement(Tab.Screen, { name: "Push", component: Push })))));
};
export default App;
