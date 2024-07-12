import React from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import InstructionModal from './InstructionModal';

const CircularButtonFA = ({ onPress, iconName }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? 'white' : '#fb5b5a',
        },
      ]}    
      onPress={onPress}
    >
      {({ pressed }) => (
        <FontAwesome name={iconName} size={32} color={pressed ? '#fb5b5a' : 'white'} />
      )}
    </Pressable>
  );
};

const CircularButtonFA5 = ({ onPress, iconName }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? 'white' : '#fb5b5a',
        },
      ]}    
      onPress={onPress}
    >
      {({ pressed }) => (
        <FontAwesome5 name={iconName} size={32} color={pressed ? '#fb5b5a' : 'white'} />
      )}
    </Pressable>
  );
};

const CircularButtonII = ({ onPress, iconName, label }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? 'white' : '#fb5b5a',
        },
      ]}
      onPress={onPress}
    >
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
      <View style={styles.modal_container}>
        <InstructionModal />
        <Pressable
          style={({ pressed }) => [
            styles.instruction_button,
            {
              backgroundColor: pressed ? 'white' : '#fb5b5a',
            },
          ]}    
        onPress={navigation.navigate("Sign Out")}>
            {({ pressed }) => (
              <Ionicons name="log-out-outline" size={16} color={pressed ? '#fb5b5a' : 'white'} />
            )}
        </Pressable>
      </View>
      <View style={styles.icons}>
        <View style={styles.container}>
          <View style={styles.viewLabel}>
            <CircularButtonFA
              key="0"
              onPress={() => navigation.navigate("Leaderboard")}
              iconName="trophy"
            />
            <Text style={styles.label}>Leaderboard</Text>
          </View>
          <View style={styles.viewLabel}>
            <CircularButtonFA5
              key="1"
              onPress={() => navigation.navigate("Game")}
              iconName="chess-bishop"
            />
            <Text style={styles.label}>Game</Text>
          </View>
          <View style={styles.viewLabel}>
            <CircularButtonFA5
              key="2"
              onPress={() => navigation.navigate("Search Profiles")}
              iconName="user-friends"
            />
            <Text style={styles.label}>Friends</Text>
          </View>
        </View>
        <View style={styles.container2}>
          <View style={styles.viewLabel}>
            <CircularButtonFA
              key="3"
              onPress={() => navigation.navigate("Notifications")}
              iconName="bell"
            />
            <Text style={styles.label}>Notifications</Text>
          </View>
          <View style={styles.viewLabel}>
            <CircularButtonII
              key="4"
              onPress={() => navigation.navigate("Profile Settings")}
              iconName="settings"
              label="Settings"
            />
            <Text style={styles.label}>Settings</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overallContainer: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  icons: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ecf0f1',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
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
  button: {
    width: 64,
    height: 64,
    borderRadius: 32, // half of width and height to make it circular
    backgroundColor: '#fb5b5a', // customize as needed
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  viewLabel: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    backgroundColor: '#fee6e6',
    paddingHorizontal: 8,
    borderRadius: 20,
    position: 'absolute',
    bottom: 8
  },
  modal_container: {
    backgroundColor: '#ecf0f1',
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1', // background color of the grid
    paddingBottom: 10,
    alignItems: 'flex-end'
  },
  container2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1', // background color of the grid
    alignItems: 'center',
  },
});

export default HomeScreen;
