import React from 'react';
import { BottomNavigation, Provider as PaperProvider, } from 'react-native-paper';
import EventScreen from './EventScreen';
import PushScreen from './PushScreen';
import { Text } from 'react-native';
const RecentsRoute = () => React.createElement(Text, null, "Recents");
const App = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {
            key: 'events',
            title: 'Events',
            icon: 'analytics.png',
            color: '#b5513f',
        },
        { key: 'push', title: 'Push', icon: 'notification' },
        { key: 'recents', title: 'Recents', icon: 'history' },
    ]);
    const renderScene = BottomNavigation.SceneMap({
        events: EventScreen,
        push: PushScreen,
        recents: RecentsRoute,
    });
    return (React.createElement(PaperProvider, null,
        React.createElement(BottomNavigation, { navigationState: { index, routes }, onIndexChange: setIndex, renderScene: renderScene })));
};
export default App;
