import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './home/index'; // Import your screen components
import GameScreen from './game/_layout';
import UserScreen from './user_settings/_layout';
import LoginScreen from './login/_layout';
import SignUpScreen from './signup/_layout';
import SearchProfilesScreen from './profile_search/_layout';
import ProfileSettingsScreen from './user_settings/_layout';
import NotificationsScreen from './working_notifications/_layout';
import SignOutScreen from './signout/_layout';

const Drawer = createDrawerNavigator();

export default function AppLayout() {
  return (
    <NavigationContainer independent={true}>
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Game" component={GameScreen} />
            <Drawer.Screen name="User" component={UserScreen} />
            <Drawer.Screen name="Login" component={LoginScreen} />
            <Drawer.Screen name='Sign Up' component={SignUpScreen} />
            <Drawer.Screen name="Search Profiles" component={SearchProfilesScreen} />
            <Drawer.Screen name="Profile Settings" component={ProfileSettingsScreen} />
            <Drawer.Screen name="Notifications" component={NotificationsScreen} />
            <Drawer.Screen name="Sign Out" component={SignOutScreen}/>
        </Drawer.Navigator>
    </NavigationContainer>
  );
}