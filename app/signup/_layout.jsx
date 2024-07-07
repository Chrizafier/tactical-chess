import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createClient } from "@supabase/supabase-js";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AppState} from 'react-native';

export const supabase = createClient(
    "https://mdxtlljhnmhjtnekswpv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHRsbGpobm1oanRuZWtzd3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMDQxNjMsImV4cCI6MjAzNDc4MDE2M30.0_3wnZhu2-xXnwIIE9fc66pnJIyeSP7QdW10XRR20xU"
  )

const SignUp = () => {

  const [formData,setFormData] = useState({
    username:'',email:'',password:''
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
              username: formData.username,
            }
          }
        }
      )
      if (error) throw error
      alert('Check your email for verification link')

      await updateActiveStatus()

    } catch (error) {
      alert(error)
    }
  }

  async function updateActiveStatus() {
    await supabase
      .from('user_profiles')
      .insert({ username: formData.username, rank: 0, friend_email, email: formData.email})

    await supabase
      .from('active_statuses')
      .insert({ email: formData.email, active: true })
  }

  // const title = {
  //   fontWeight: "bold",
  //   fontSize:50,
  //   color:"#fb5b5a",
  //   marginBottom: 20,
  //   alignItems: "center",
  //   justifyContent: "center-flex"
  // };

  // const inputView = {
  //   alignItems: 'center',
  //   justifyContent: 'center-flex',
  //   borderRadius: 4,
  //   backgroundColor: "#ffffff",
  //   color: '#fb5b5a',
  //   height: 30,
  //   width: "100%"
  // };

  // const buttonStyle = {
  //   alignItems: 'center',
  //   justifyContent: 'center-flex',
  //   borderRadius: 4,
  //   backgroundColor: "#fb5b5a",
  //   color: 'fb5b5a',
  //   height: 30,
  //   border: "none",
  //   width: "104%"
  // };

  // const container = {
  //   justifyContent: 'center-flex',
  //   alignItems: "center"
  // };


  // return (
  //   <View style={container}>
  //       <h1 className='title' style={title}>Sign Up</h1>
  //     <form onSubmit={handleSubmit}>
  //       <br /><br />
  //       <input className='input_style'
  //         placeholder='Username'
  //         name='username'
  //         onChange={handleChange}
  //         style={inputView}
  //       />
  //       <br /><br />
  //       <input className='input_style'
  //         placeholder='Email'
  //         name='email'
  //         onChange={handleChange}
  //         style={inputView}
  //       />
  //       <br /><br />
  //       <input className='input_style'
  //         placeholder='Password'
  //         name='password'
  //         type="password"
  //         onChange={handleChange}
  //         style={inputView}
  //       />
  //       <br /><br />
  //       <button type='submit' style={buttonStyle}>
  //         Submit
  //       </button>
  //       <br /><br />
  //     </form>
  //     <Text>Already have an account? </Text>
  //     <br />
  //     <a href="/login">Login</a>
  //   </View>
  // )

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
      <Text style={styles.loginLink}>Login</Text>
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
});



export default SignUp