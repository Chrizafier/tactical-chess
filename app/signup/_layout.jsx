import { useRouter } from "expo-router";
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import * as React from 'react';
import { supabase } from "../App";
import { useNavigation } from "@react-navigation/native";


  export default function SignUp(){
  const navigation = useNavigation();

  const [formData,setFormData] = useState({
    username:'',email:'',password:''
  })


  console.log(formData)


  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };


  async function handleSubmit(e){
    e.preventDefault()


    try {
      const { data, error } = await supabase.auth.signUp(
        {
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              username: formData.username,
            }
          }
        }
      )
      if (error) throw error
      alert('Check your email for verification link')


      await updateActiveStatus()

      navigation.navigate("Home")


    } catch (error) {
      alert(error)
    }
  }


  async function updateActiveStatus() {
    await supabase
      .from('user_profiles')
      .insert({ username: formData.username, rank: 0, friend_email, email: formData.email, })


    await supabase
      .from('active_statuses')
      .insert({ email: formData.email, active: true })
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder='Username'
          //name='username'
          onChangeText={(text) => handleChange('username', text)}
          value={formData.username}
        />
      </View>
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
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <Text>Already have an account? </Text>
      <Text style={styles.loginLink} onPress={()=>navigation.navigate("Login")}>Login</Text>
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
  loginLink: {
    color: '#007bff', // Example color for link
    textDecorationLine: 'underline',
  },
});

