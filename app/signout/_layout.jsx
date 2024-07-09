import { View } from 'react-native';
import * as React from 'react';
import { supabase } from "../_layout";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from 'react'

export default function SignOutScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        const signOutAndNavigate = async () => {
            try {
                await supabase.auth.signOut();
                navigation.navigate("Login");
            } catch (error) {
                console.error('Error signing out:', error.message);
            }
        };
        signOutAndNavigate();
    }, []);

    return (
        <View></View>
    );
}
