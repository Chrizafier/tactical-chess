// import { Redirect, useRouter } from "expo-router";
// import { createClient } from "@supabase/supabase-js";

// export const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
// export const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY
// export const supabase = createClient(supabaseUrl, supabaseKey)

// export default function Page() {
//     // const router = useRouter();
//     // return <Redirect href="/login" />;


// }

// App.js or your root navigator component
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createClient } from "@supabase/supabase-js";
import Game from './src/screens/Game';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Home from './src/screens/Home';
import UserSettings from './src/screens/UserSettings'
import SearchProfiles from './src/screens/SearchProfiles'
import Notifications from './src/screens/Notifications'

export const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
export const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={SignUp} />
        <Stack.Screen name="home" component={Home} />
        {/* <Stack.Screen name="game" component={Game} /> */}
        <Stack.Screen name="user_settings" component={UserSettings} />
        <Stack.Screen name="profile_search" component={SearchProfiles} />
        <Stack.Screen name="working_notifications" component={Notifications} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
