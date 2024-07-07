import { useRouter } from "expo-router";
// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AppState} from 'react-native';
import * as React from 'react';
import { Avatar, Button } from 'react-native-paper';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Auth, Form } from '@supabase/auth-ui-react';
import { useState, useEffect } from 'react'
import { createClient } from "@supabase/supabase-js";
import { Link, useNavigate} from 'react-router-dom';

export const supabase = createClient(
    "https://mdxtlljhnmhjtnekswpv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHRsbGpobm1oanRuZWtzd3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMDQxNjMsImV4cCI6MjAzNDc4MDE2M30.0_3wnZhu2-xXnwIIE9fc66pnJIyeSP7QdW10XRR20xU"
)
  
  const Login = () => {
    const router = useRouter();
  
    const [formData,setFormData] = useState({
          email:'',password:''
    })
  
    console.log(formData)
  
    // function handleChange(event){
    //   setFormData((prevFormData)=>{
    //     return{
    //       ...prevFormData,
    //       [event.target.name]:event.target.value
    //     }
    //   })
    // }

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
        console.log(data)
        updateActiveStatus()
        router.push('/home')
        
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
      <Text><Text style={styles.signupLink} onPress={()=>router.push('/signup')}>Sign Up</Text></Text>
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
  
export default Login