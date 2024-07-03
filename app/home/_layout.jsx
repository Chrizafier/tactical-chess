// import { Link, Stack, useRouter } from "expo-router";
import { useRouter } from "expo-router";
// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { Avatar } from 'react-native-paper';



export default function AppLayout() {
    const router = useRouter();
    return (
    <View style={styles.container}>
      <Avatar.Icon size={128} icon="home" />
    </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#33f',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });