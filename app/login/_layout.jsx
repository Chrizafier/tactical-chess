import { useRouter } from "expo-router";
// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AppState } from 'react-native';
import * as React from 'react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Auth, Form } from '@supabase/auth-ui-react';
import { useState } from 'react'
import { createClient } from "@supabase/supabase-js";
import { Link, useNavigate } from 'react-router-dom';
import { Card } from 'react-native-paper';
import ToggleTitle from "./card_switch_title";

export const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
export const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)

const Login = ({ setToken }) => {

  const [formData, setFormData] = useState({
    email: '', password: ''
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

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) throw error

      console.log(data)
      //setToken(data)
      router.push('/home')
      //   alert('Check your email for verification link')
    } catch (error) {
      alert(error)
    }
  }

  // return (
  //   <View style={{ backgroundzColor : '#f03', width: '15vw' }}>
  //     <Card style={{ width: '25vw' }}>
  //       <Card.Content>
  //         <form onSubmit={handleSubmit}>
  //           <ToggleTitle />
  //           <View style={[styles.container, { flex: 1, backgroundColor: '#3f0' }]}>
  //             <input
  //               placeholder='Email'
  //               name='email'
  //               onChange={handleChange}
  //               style={styles.input}
  //               type="text"
  //             />
  //             <input
  //               placeholder='Password'
  //               name='password'
  //               type="password"
  //               onChange={handleChange}
  //               style={styles.input}
  //             />
  //             <button
  //               style={styles.button}
  //               type='submit'
  //             >
  //               Sign In
  //             </button>
  //           </View>
  //         </form>
  //       </Card.Content>
  //     </Card>
  //   </View>
  // )

  return (
    <View style={styles.container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <View style={[styles.container, { flex: 1 }]}>
          <input
            placeholder='Email'
            name='email'
            onChange={handleChange}
            style={styles.input}
            type="text"
          />
          <input
            placeholder='Password'
            name='password'
            type="password"
            onChange={handleChange}
            style={styles.input}
          />
          <button
            style={styles.button}
            type='submit'
          >
            Sign In
          </button>
        </View>
      </form>

      <Text>
        Don't have an account? 
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 20,
    // backgroundColor: '#2a2a2a',
    color: "#fb5b5a",
  },
  input: {
    borderRadius: 5,
    height: 30,
    alignSelf: 'strech',
    padding: 5,

    backgroundColor: "#fff",
  },
  button: {
    borderRadius: 5,
    height: 40,
    width: '100%',

    backgroundColor: "#fb5b5a",
    border: "none"
  },
})

export default Login