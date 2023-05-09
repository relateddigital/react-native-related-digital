import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './components/TabBar/CustomTabBar';
import Analytics from './screens/AnalyticsScreen';
import TargetingAction from './screens/TargetingAction';
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
                React.createElement(Tab.Screen, { name: "Analytics", component: Analytics }),
                React.createElement(Tab.Screen, { name: "TargetingAction", component: TargetingAction }),
                React.createElement(Tab.Screen, { name: "Story", component: StoryScreen }),
                React.createElement(Tab.Screen, { name: "Geofence", component: GeofenceScreen }),
                React.createElement(Tab.Screen, { name: "Recommendation", component: Recommendation }),
                React.createElement(Tab.Screen, { name: "FavoriteAttribute", component: FavoriteAttribute }),
                React.createElement(Tab.Screen, { name: "Push", component: Push })))));
};
export default App;
