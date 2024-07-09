import { StyleSheet, Text, View, TextInput, TouchableOpacity, AppState} from 'react-native';
import * as React from 'react';
import { useState, useEffect } from 'react'
import { supabase } from "../_layout";
import { useNavigation } from "@react-navigation/native";
 
  export default function Login(){
    const navigation = useNavigation();
 
    const [formData,setFormData] = useState({
          email:'',password:''
    })
 
    console.log(formData)


    const handleChange = (name, value) => {
      setFormData({ ...formData, [name]: value });
    };


    async function handleSubmit(e){
      e.preventDefault()
 
      try {
          const { data, error } = await supabase.auth.signInWithPassword({
              email: formData.email,
              password: formData.password,
            })
           
        if (error) throw error
        console.log("here is the data!!!!!!!!!!!!!!!!!!!!!", data)
        getUserEmail()
        updateActiveStatus()

        navigation.navigate("Home");
       
      } catch (error) {
        alert(error)
      }
    }


    async function updateActiveStatus() {
      try {
        const newData = { active: true};
 
        const {data, error} = await supabase
          .from('active_statuses')
          .update(newData)
          .eq('email', formData.email)


        if (error) throw error
      } catch (error) {
        alert(error)
      }
    }




    const getUserEmail = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          console.log("gets user email")
          console.log(user.email)
          //setUserEmail(user.email);
        }
        else {
          console.log("doesn't get user")
        }
      } catch (error) {
        console.error('Error fetching user email:', error.message);
      }
    };
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder='Email'
          //name='email'
          onChangeText={(text) => handleChange('email', text)}
          value={formData.email}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder='Password'
          //name='password'
          onChangeText={(text) => handleChange('password', text)}
          value={formData.password}
          secureTextEntry
        />
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Example background color
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 20,
  },
  inputView: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#ffffff',
    width: '100%',
    height: 30,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
    color: '#fb5b5a',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#fb5b5a',
    width: '100%',
    height: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signupLink: {
    color: '#007bff', // Example color for link
    textDecorationLine: 'underline',
  },
});

