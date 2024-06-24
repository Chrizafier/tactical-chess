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
                <Appbar.BackAction onPress={() => { }} />
                <Appbar.Content title='Tactical Chess' />
                <Appbar.Action icon='home' onPress={() => { }} />

                <Appbar.Action icon='chess-bishop' onPress={() => { }} />
                <Appbar.Action icon='account' onPress={() => { }} />
                <Appbar.Action icon='login' onPress={() => { }} />
            </Appbar.Header>
            <Slot />
        </>
    );
}