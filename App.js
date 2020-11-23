'use strict';
import React from 'react';
import LoadingScreen from './screens/LoadingScreen'
import DashboardScreen from './screens/DashboardScreen'
import PublicCity from './screens/PublicCity'
import RoomScreen from './screens/RoomScreen'
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={LoadingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DashboardScreen" options={{ headerShown: false }} component={DashboardScreen} />
        <Stack.Screen name="PublicCity" options={{ title: 'Public City' }} component={PublicCity} />
        <Stack.Screen name="RoomScreen" options={{ title: 'Room' }} component={RoomScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
