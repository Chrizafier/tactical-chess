import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
// Import your screen components
import HomeScreen from './home/index'; 
import GameScreen from './game/_layout';
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
  /*
  return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={ () => router.back() } />
                <Appbar.Content title='Tactical Chess' />
                <Appbar.Action icon='home' onPress={() => router.push('/home')} />
                <Appbar.Action icon='chess-bishop' onPress={() => router.push('/game')} />
                <Appbar.Action icon='account-cog' onPress={() => router.push('/user')} />
                <Appbar.Action icon='login' onPress={ () => router.push('/login') } />
            </Appbar.Header>
            <Slot />
        </>
  );
  */
}
