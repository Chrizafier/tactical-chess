import { View, Text, StyleSheet } from 'react-native';
import * as React from 'react';
import { supabase } from "../App";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from 'react'

export default function SignOutScreen() {
    // const navigation = useNavigation();

    useEffect(() => {
        const signOutAndNavigate = async () => {
            try {
                await supabase.auth.signOut();
                // navigation.navigate("Login");
            } catch (error) {
                console.error('Error signing out:', error.message);
            }
        };
        signOutAndNavigate();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>You are now signed out.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 50,
        color: '#fb5b5a',
        marginBottom: 20,
    },
})

