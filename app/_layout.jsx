import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './home/index'; // Import your screen components
import GameScreen from './game/index';
import UserScreen from './user/[uid]';
import LoginScreen from './login/_layout';

const Drawer = createDrawerNavigator();

export default function AppLayout() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Game" component={GameScreen} />
        <Drawer.Screen name="User" component={UserScreen} />
        <Drawer.Screen name="Login" component={LoginScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
