import React from 'react';
import { Text } from 'react-native';
import {
  BottomNavigation,
  Provider as PaperProvider,
} from 'react-native-paper';
import EventScreen from './EventScreen';

const LibraryRoute = () => <Text>Library</Text>;
const FavoritesRoute = () => <Text>Favorites</Text>;
const PurchasedRoute = () => <Text>Purchased</Text>;

const App = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'events', title: 'Events', icon: 'analytics.png' },
    { key: 'library', title: 'Library', icon: 'inbox' },
    { key: 'favorites', title: 'Favorites', icon: 'heart' },
    { key: 'purchased', title: 'Purchased', icon: 'shopping' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    events: EventScreen,
    library: LibraryRoute,
    favorites: FavoritesRoute,
    purchased: PurchasedRoute,
  });

  return (
    <PaperProvider>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </PaperProvider>
  );
};

export default App;
