import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Home';
import Detail from './Detail';
import Notifications from './Notifications';

function HomeScreen({ navigation }) {
  return (
    <Home navigation={navigation} />
  );
}

function DetailsScreen({ navigation }) {
  return (
    <Detail navigation={navigation} />
  );
}

function NotificationsScreen({ route, navigation }) {
  return (
    <Notifications navigation={navigation} route={route}/>
  );
}

// const Stack = createNativeStackNavigator();



// function Root() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Details" component={DetailsScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

const Tab = createBottomTabNavigator();

function Root() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Details" component={DetailsScreen} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Root;
