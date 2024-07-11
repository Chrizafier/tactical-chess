import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './home/index'; // Import your screen components
import GameScreen from './game/_layout';
import LoginScreen from './login/_layout';
import SignUpScreen from './signup/_layout';
import SearchProfilesScreen from './profile_search/_layout';
import ProfileSettingsScreen from './user_settings/_layout';
import NotificationsScreen from './working_notifications/_layout';
import SignOutScreen from './signout/_layout';
import InstructionsScreen from './home/instructions';

const Drawer = createDrawerNavigator();

export default function AppLayout() {
  return (
    <NavigationContainer independent={true}>
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Instructions" component={InstructionsScreen} />
            <Drawer.Screen name="Game" component={GameScreen} />
            <Drawer.Screen name="Login" component={LoginScreen} />
            <Drawer.Screen name='SignUp' component={SignUpScreen} />
            <Drawer.Screen name="SearchProfiles" component={SearchProfilesScreen} />
            <Drawer.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
            <Drawer.Screen name="Notifications" component={NotificationsScreen} />
            <Drawer.Screen name="SignOut" component={SignOutScreen}/>
        </Drawer.Navigator>
    </NavigationContainer>
  );
}