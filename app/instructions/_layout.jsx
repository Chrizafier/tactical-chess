import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, DataTable, DefaultTheme, List } from 'react-native-paper';

export default function InstructionsScreen() {
    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>How to play</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <Text>Don't have an account? </Text>
          <Text style={styles.signupLink} onPress={()=>navigation.navigate("SignUp")}>Sign Up</Text>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontWeight: 'bold',
      fontSize: 50,
      color: '#fb5b5a',
      marginBottom: 20,
    },
    inputView: {
      backgroundColor: "#FFC9CB",
      borderRadius: 30,
      width: "60%",
      height: 45,
      marginBottom: 20,
      alignItems: "left",
    },
    input: {
      height: 50,
      padding: 10,
      borderRadius: 30,
    },
    button: {
      width:"70%",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:20,
      backgroundColor:"#fb5b5a",
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    signupLink: {
      color: '#007bff',
      textDecorationLine: 'underline',
    },
  });
  
  