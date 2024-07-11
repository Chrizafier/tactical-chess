import React, { useState } from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import { FontAwesome,FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


const InstructionButton = ({ onPress }) => {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.instruction_button,
          {
            backgroundColor: pressed ? 'white' : '#fb5b5a',
          },
        ]}    
      onPress={onPress}>
          {({ pressed }) => (
            <Ionicons name="help" size={16} color={pressed ? '#fb5b5a' : 'white'} />
          )}
      </Pressable>
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

export default InstructionButton