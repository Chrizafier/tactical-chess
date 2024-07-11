// CircularButton.js
import React, { useState } from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import { FontAwesome,FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import InstructionButton from './InstructionButton';
import InstructionModal from './InstructionModal';


const CircularButtonFA = ({ onPress, iconName }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? 'white' : '#fb5b5a',
        },
      ]}    
    onPress={onPress}>
        {({ pressed }) => (
          <FontAwesome name={iconName} size={32} color={pressed ? '#fb5b5a' : 'white'} />
        )}
    </Pressable>
  );
};

const CircularButtonFA5 = ({ onPress, iconName }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? 'white' : '#fb5b5a',
        },
      ]}    
    onPress={onPress}>
        {({ pressed }) => (
          <FontAwesome5 name={iconName} size={32} color={pressed ? '#fb5b5a' : 'white'} />
        )}
    </Pressable>
  );
};

const CircularButtonII = ({ onPress, iconName }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? 'white' : '#fb5b5a',
        },
      ]}    
    onPress={onPress}>
        {({ pressed }) => (
          <Ionicons name={iconName} size={32} color={pressed ? '#fb5b5a' : 'white'} />
        )}
    </Pressable>
  );
};


const HomeScreen = () => {
  const navigation = useNavigation();

  return (  
    <View style={styles.overallContainer}>
      <InstructionModal />
      <View style={styles.container}>
      <CircularButtonFA
        key="0"
        onPress={() => navigation.navigate("Leaderboard")}
        iconName="trophy"
      ></CircularButtonFA>
      <CircularButtonFA5
        key="1"
        onPress={() => navigation.navigate("Game")}
        iconName="chess-bishop"
      ></CircularButtonFA5>
      <CircularButtonFA5
        key="2"
        onPress={() => navigation.navigate("Search Profiles")}
        iconName="user-friends"
      ></CircularButtonFA5>
      </View>
      <View style={styles.container2}>
      <CircularButtonFA
        key="3"
        onPress={() => navigation.navigate("Notifications")}
        iconName="bell"
      ></CircularButtonFA>
      <CircularButtonII
        key="4"
        onPress={() => navigation.navigate("Profile Settings")}
        iconName="settings"
      ></CircularButtonII>
    </View></ View>
  );
};


const styles = StyleSheet.create({
  overallContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ecf0f1',
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32, // half of width and height to make it circular
    backgroundColor: '#fb5b5a', // customize as needed
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  instruction_button: {
    width: 32,
    height: 32,
    borderRadius: 16, // half of width and height to make it circular
    backgroundColor: '#fb5b5a', // customize as needed
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  instruction_container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: "10%",
    backgroundColor: '#ecf0f1',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1', // background color of the grid
    height: "45%",
    paddingBottom: 10,
    alignItems: 'flex-end'
  },
  container2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1', // background color of the grid
    height: "45%"
  },
  modal_container: {
    backgroundColor: 'white',
    padding: 20,
    flex: 1
  },
});

export default HomeScreen;