import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createClient } from "@supabase/supabase-js";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AppState} from 'react-native';

export const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
export const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)

const SignUp = () => {

  const [formData,setFormData] = useState({
    fullName:'',email:'',password:''
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

  async function handleSubmit(e){
    e.preventDefault()

    try {
      const { data, error } = await supabase.auth.signUp(
        {
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
            }
          }
        }
      )
      if (error) throw error
      alert('Check your email for verification link')

      
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
    height: 30,
    width: "100%"
  };

  const buttonStyle = {
    alignItems: 'center',
    justifyContent: 'center-flex',
    borderRadius: 4,
    backgroundColor: "#fb5b5a",
    color: 'fb5b5a',
    height: 30,
    border: "none",
    width: "104%"
  };

  const container = {
    justifyContent: 'center-flex',
    alignItems: "center"
  };


  return (
    <View style={container}>
        <h1 className='title' style={title}>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input className='input_style'
          placeholder='Username'
          name='fullName'
          onChange={handleChange}
          style={inputView}
        />
        <br /><br />
        <input className='input_style'
          placeholder='Email'
          name='email'
          onChange={handleChange}
          style={inputView}
        />
        <br /><br />
        <input className='input_style'
          placeholder='Password'
          name='password'
          type="password"
          onChange={handleChange}
          style={inputView}
        />
        <br /><br />
        <button type='submit' style={buttonStyle}>
          Submit
        </button>
        <br /><br />
      </form>
      <Text>Already have an account? </Text>
      <br />
      <a href="/login">Login</a>
    </View>
  )
}




export default SignUp