import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from '../_layout';
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

export default function SignOutScreen() {
    const navigation = useNavigation();

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
            <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate("Login")}>
                <Text style={styles.buttonText}>Go Back to Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 50,
        color: '#fb5b5a',
        marginBottom: 20,
        textAlign: 'center'
    },
    button: {
        width:"50%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        alignSelf: 'center',
        marginTop:40,
        marginBottom:20,
        backgroundColor:"#fb5b5a",
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
})
