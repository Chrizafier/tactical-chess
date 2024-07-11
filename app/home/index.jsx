// CircularButton.js
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { FontAwesome,FontAwesome5, Ionicons } from '@expo/vector-icons';

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

  return (
    <><View style={styles.container}>
      <CircularButtonFA5
        key="0"
        onPress={handleInstructions}
        iconName="book"
      ></CircularButtonFA5>
      <CircularButtonFA5
        key="1"
        onPress={handleGame}
        iconName="chess-bishop"
      ></CircularButtonFA5>
      <CircularButtonFA5
        key="2"
        onPress={handleFriends}
        iconName="user-friends"
      ></CircularButtonFA5>
      </View>
      <View style={styles.container2}>
      <CircularButtonFA
        key="3"
        onPress={handleNotifs}
        iconName="bell"
      ></CircularButtonFA>
      <CircularButtonII
        key="4"
        onPress={handleSettings}
        iconName="settings"
      ></CircularButtonII>
    </View></>
  );
};


const styles = StyleSheet.create({
  button: {
    width: 64,
    height: 64,
    borderRadius: 32, // half of width and height to make it circular
    backgroundColor: '#fb5b5a', // customize as needed
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#ecf0f1', // background color of the grid
    paddingBottom: 20
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#ecf0f1', // background color of the grid
  },
});

export default HomeScreen;