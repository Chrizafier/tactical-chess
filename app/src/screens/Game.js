import { Link, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { Avatar } from 'react-native-paper';
import CustomHeader from '../components/CustomHeader';



export default function Game() {
    return (
    <><CustomHeader showBackButton={true}></CustomHeader>
    <View style={styles.container}>
        <Avatar.Icon size={128} icon="chess-bishop" />
      </View></>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#30f',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });