import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import EventScreen from './EventScreen';
import PushScreen from './PushScreen';
import TargetScreen from './TargetScreen';
const Tab = createBottomTabNavigator();
function App() {
    return (React.createElement(NavigationContainer, null,
        React.createElement(Tab.Navigator, { screenOptions: ({ route }) => ({
                tabBarIcon: () => {
                    let iconName;
                    if (route.name === 'Event') {
                        iconName = require('./img/analytics.png');
                    }
                    else if (route.name === 'Push') {
                        iconName = require('./img/notification.png');
                    }
                    else if (route.name === 'Target') {
                        iconName = require('./img/target.png');
                    }
                    return React.createElement(Image, { source: iconName, style: styles.img });
                },
            }) },
            React.createElement(Tab.Screen, { name: "Event", component: EventScreen }),
            React.createElement(Tab.Screen, { name: "Push", component: PushScreen }),
            React.createElement(Tab.Screen, { name: "Target", component: TargetScreen }))));
}
const styles = StyleSheet.create({
    img: {
        width: 24,
        height: 24,
    },
});
export default App;
