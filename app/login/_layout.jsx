// import { Link, Stack, useRouter } from "expo-router";
import { useRouter } from "expo-router";
// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AppState} from 'react-native';
import * as React from 'react';
import { Avatar, Button } from 'react-native-paper';
import { createClient } from "@supabase/supabase-js";
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Auth } from '@supabase/auth-ui-react';

const supabase = createClient(
  "https://mdxtlljhnmhjtnekswpv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHRsbGpobm1oanRuZWtzd3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMDQxNjMsImV4cCI6MjAzNDc4MDE2M30.0_3wnZhu2-xXnwIIE9fc66pnJIyeSP7QdW10XRR20xU"
)

export default function Login() {
    const router = useRouter();
    supabase.auth.onAuthStateChange(async (event) => {
      if (event !== "SIGNED_OUT") {
        //router.push('/home')
      }
      else {
        router.push('/')
      }
    })

    return (
    <View style={styles.container}>
      {/* <Text style={styles.title}> Login Screen</Text>
      <View style={styles.inputView}>
          <TextInput
          style={styles.inputText}
          placeholder="email@address.com" />
      </View>
      <View style={styles.inputView}>
          <TextInput
          style={styles.inputText}
          secureTextEntry
          placeholder="Password" />
      </View>
      <View>
        <Button mode="contained">
          Login
        </Button>
      </View> */}
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["google"]}
      />
      {/*<View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgot}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>*/}
    </View>
    );
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