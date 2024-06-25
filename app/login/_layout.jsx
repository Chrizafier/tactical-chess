import { useRouter } from "expo-router";
// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AppState} from 'react-native';
import * as React from 'react';
import { Avatar, Button } from 'react-native-paper';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Auth, Form } from '@supabase/auth-ui-react';
import { useState } from 'react'
import { createClient } from "@supabase/supabase-js";
import { Link, useNavigate} from 'react-router-dom';


export const supabase = createClient(
    "https://mdxtlljhnmhjtnekswpv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHRsbGpobm1oanRuZWtzd3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMDQxNjMsImV4cCI6MjAzNDc4MDE2M30.0_3wnZhu2-xXnwIIE9fc66pnJIyeSP7QdW10XRR20xU"
  )
  
  const Login = ({setToken}) => {
  
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
        //setToken(data)
        router.push('/home')
  
  
      //   alert('Check your email for verification link')
  
        
      } catch (error) {
        alert(error)
      }
    }
  
    return (
      <View style={styles.container}>
        <form onSubmit={handleSubmit}>
          <input 
            className="inputField"
            placeholder='Email'
            name='email'
            onChange={handleChange}
            style={styles.inputText}
          />
  
          <input 
            className="inputField"
            placeholder='Password'
            name='password'
            type="password"
            onChange={handleChange}
            style={styles.inputText}
          />
  
          <button className="button block primary" type='submit'>
            Submit
          </button>
  
        </form>
       Don't have an account? <a href="/signup">Sign Up</a>
      </View>
    // <View style={styles.container}>
    //   <Text style={styles.title}> Login Screen</Text>
    //   <View style={styles.inputView}>
    //       <TextInput
    //       style={styles.inputText}
    //       placeholder='Email'
    //       name='email'
    //       onChange={handleChange}
    //       />
    //   </View>
    //   <View style={styles.inputView}>
    //       <TextInput
    //       style={styles.inputText}
    //       secureTextEntry
    //       placeholder='Password'
    //       name='password'
    //       onChange={handleChange}
    //       />
    //   </View>
    //   <View>
    //     <Button mode="contained" onPress={handleSubmit}>
    //       Login
    //     </Button>
    //   </View>
    //   <View>
    //     <TouchableOpacity>
    //       <Text style={styles.forgot}>Don't have an account? <a href="/signup">Sign Up</a></Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>

    )
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: "bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width:"30%",
    backgroundColor:"#3AB4BA",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  forgot: {
    padding: 20
  }
});
  
export default Login