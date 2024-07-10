import { useRouter } from "expo-router"
import { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import * as React from 'react'
import { supabase } from "../_layout"
import { useNavigation } from "@react-navigation/native"


export default function SignUp() {
  const navigation = useNavigation()

  const [formData, setFormData] = useState({
    username: '', email: '', password: ''
  })


  console.log(formData)


  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }


    })


  }


  async function handleSubmit(e) {
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
          name='username'
          onChangeText={(text) => handleChange('username', text)}
          value={formData.username}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder='Email'
          name='email'
          onChangeText={(text) => handleChange('email', text)}
          value={formData.email}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder='Password'
          name='password'
          onChangeText={(text) => handleChange('password', text)}
          value={formData.password}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <Text>Already have an account? </Text>
      <Text style={styles.loginLink} onPress={() => navigation.navigate("Login")}>Login</Text>
    </View>
  )
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
    color: '#fb5b5a',
    height: 30,
    width: '100%',
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
    color: '#fff',
    height: 30,
    width: '104%',
    border: 'none',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loginLink: {
    color: '#007bff', // Example color for link
    textDecorationLine: 'underline',
  },
})

