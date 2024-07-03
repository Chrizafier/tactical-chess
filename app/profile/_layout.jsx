// import { Link, Stack, useRouter } from "expo-router";
import { useRouter } from "expo-router";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AppState} from 'react-native';

export const supabase = createClient(
  "https://mdxtlljhnmhjtnekswpv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHRsbGpobm1oanRuZWtzd3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMDQxNjMsImV4cCI6MjAzNDc4MDE2M30.0_3wnZhu2-xXnwIIE9fc66pnJIyeSP7QdW10XRR20xU"
)

export default function AppLayout() {
  const router = useRouter();
  const [fullName,setFullName] = useState("")
  const [email,setEmail] = useState("")  

  useEffect(() => {
    async function getProfile() {
      const { data, error } = await supabase.auth.getUser()
      setFullName(data.user.user_metadata.full_name)
      setEmail(data.user.user_metadata.email)
    }

    getProfile()
  })

  async function handleSubmit(e){
    e.preventDefault()

    try {
      const { error } = await supabase.auth.signOut()

      if (error) throw error

      router.push('/login')
      
    } catch (error) {
      alert(error)
    }
  }

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
      <h1>Hi {fullName}!</h1>
      <h3>Your email address is {email}!</h3>
    </ View>
  );
}
