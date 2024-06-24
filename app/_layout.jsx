// import { Link, Stack, useRouter, Slot } from "expo-router";
import { useRouter, Slot } from "expo-router";
// import { StatusBar } from "expo-status-bar";

import * as React from 'react';
import { Appbar, Avatar } from 'react-native-paper';

export default function AppLayout() {
    const router = useRouter();

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
}