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
  
    const [formData,setFormData] = useState({
          email:'',password:''
    })
  
    console.log(formData)
  
    function handleChange(event){
      setFormData((prevFormData)=>{
        return{
          ...prevFormData,
          [event.target.name]:event.target.value
        }
  
      })
  
    }
  
    const router = useRouter();

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
  
  const title = {
    fontWeight: "bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center-flex"
  };

  const inputView = {
    alignItems: 'center',
    justifyContent: 'center-flex',
    borderRadius: 4,
    backgroundColor: "#ffffff",
    color: '#fb5b5a',
    width: "100%",
    height: 30,
  };

  const buttonStyle = {
    alignItems: 'center',
    justifyContent: 'center-flex',
    borderRadius: 4,
    backgroundColor: "#fb5b5a",
    color: 'fb5b5a',
    width: "104%",
    height: 30,
    border: "none"
  };

  const container = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }

    return (
      <View style={container}>
        <h1 className='title' style={title}>Login</h1>
        <form onSubmit={handleSubmit}>
          <input className='input_style'
            placeholder='Email'
            name='email'
            onChange={handleChange}
            style={inputView}
            type="text"
          /><br /><br />
          <input
            placeholder='Password'
            name='password'
            type="password"
            onChange={handleChange}
            style={inputView}
          />
  <br /><br />
          <button style={buttonStyle} mode="contained" className="submit_button" type='submit'>
            Sign In
          </button><br /><br />

        </form>
        
       <Text>Don't have an account? </Text>
       <br />
       <Text><a href="/signup">Sign Up</a></Text>
       </View>
    );
  }


  
export default Login