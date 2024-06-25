// import { Link, Stack, useRouter, Slot } from "expo-router";
import { useRouter, Slot } from "expo-router";
// import { StatusBar } from "expo-status-bar";

import * as React from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { useWindowDimensions, View } from 'react-native';
import { Dimensions} from 'react-native'; // Add this line


export default function AppLayout() {
    const router = useRouter();
    const screenWidth = useWindowDimensions().width;
    const appBarWidth = screenWidth; // Adjust this value as needed



    return (
        <>
            <View style={{ width: appBarWidth, alignSelf: 'center' }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={ () => router.back() } />
                <Appbar.Content title='Tactical Chess' />
                <Appbar.Action icon='home' onPress={() => router.push('/home')} />

                <Appbar.Action icon='chess-bishop' onPress={() => router.push('/game')} />
                <Appbar.Action icon='account-cog' onPress={() => router.push('/user')} />
                <Appbar.Action icon='login' onPress={ () => router.push('/login') } />
            </Appbar.Header>
            </View>
            <Slot />
        </>
    );
}