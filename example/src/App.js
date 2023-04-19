import React from 'react';
import { Text } from 'react-native';
import { BottomNavigation, Provider as PaperProvider, } from 'react-native-paper';
import EventScreen from './EventScreen';
const LibraryRoute = () => React.createElement(Text, null, "Library");
const FavoritesRoute = () => React.createElement(Text, null, "Favorites");
const PurchasedRoute = () => React.createElement(Text, null, "Purchased");
const App = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'albums', title: 'Albums', icon: 'analytics.png' },
        { key: 'library', title: 'Library', icon: 'inbox' },
        { key: 'favorites', title: 'Favorites', icon: 'heart' },
        { key: 'purchased', title: 'Purchased', icon: 'shopping' },
    ]);
    const renderScene = BottomNavigation.SceneMap({
        albums: EventScreen,
        library: LibraryRoute,
        favorites: FavoritesRoute,
        purchased: PurchasedRoute,
    });
    return (React.createElement(PaperProvider, null,
        React.createElement(BottomNavigation, { navigationState: { index, routes }, onIndexChange: setIndex, renderScene: renderScene })));
};
export default App;
