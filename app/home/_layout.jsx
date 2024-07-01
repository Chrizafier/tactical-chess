// import { Link, Stack, useRouter } from "expo-router";
import { useRouter } from "expo-router";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AppState} from 'react-native';


// import { StatusBar } from "expo-status-bar";

// import { Platform, Pressable, Text } from "react-native";
// import FontAwesome from "@expo/vector-icons/FontAwesome";

// import { useAuth } from "../../context/auth";
// import { NotesProvider } from "../../context/notes";

export const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
export const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)

// import Home from ".";

// export const unstable_settings = {
//   initialRouteName: "index",
// };

export default function AppLayout() {
  const router = useRouter()
  const [fullName,setFullName] = useState('')
  const [email,setEmail] = useState('')

  useEffect(_ => {
    async function getProfile() {
      const { data, error } = await supabase.auth.getUser()
      try {
        setFullName(data.user.user_metadata.full_name)
        setEmail(data.user.user_metadata.email)
      }
      catch {

        setFullName(`Anonymous${[
          `${Math.floor(Math.random() * 9)}`,
          `${Math.floor(Math.random() * 9)}`,
          `${Math.floor(Math.random() * 9)}`
        ].join('')}`
        )
        setEmail('please.sign.in@email.com')
      }      
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
      <br /><br />
      <button style={buttonStyle} mode="contained" className="submit_button" type='submit' onClick={handleSubmit}>
          Sign Out
      </button><br /><br />
    </ View>



      // <NotesProvider>
      //   <StatusBar style="auto" />

      //   <Stack
      //       screenOptions={{
      //         headerRight: SignOutButton,
      //       }}
      //   >
      //     <Stack.Screen
      //         name="index"
      //         options={{
      //           title: "Notes",
      //           headerLargeTitle: true,
      //           headerSearchBarOptions: {
      //             onChangeText: (event) => {
      //               // Update the query params to match the search query.
      //               router.setParams({
      //                 q: event.nativeEvent.text,
      //               });
      //             },
      //           },
      //         }}
      //     />
      //     {/*
      //     <Stack.Screen
      //         name="compose"
      //         options={{
      //           title: "Create a new note",
      //           presentation: "modal",
      //           headerRight: Platform.select({
      //             ios: DismissComposeButton,
      //           }),
      //         }}
      //     />
      //     */}
      //   </Stack>
      // </NotesProvider>
  );
}

// function SignOutButton() {
//   const { signOut } = useAuth();

//   return (
//       <Link
//           href="/sign-in"
//           onPress={(ev) => {
//             ev.preventDefault();
//             signOut();
//           }}
//           asChild
//       >
//         <Pressable
//             style={{
//               flexDirection: "row",
//               display: "flex",
//               alignItems: "center",
//               paddingRight: 8,
//             }}
//         >
//           <Text
//               style={{
//                 fontWeight: "normal",
//                 paddingHorizontal: 8,
//                 fontSize: 16,
//               }}
//           >
//             Sign Out
//           </Text>
//           {/* <FontAwesome name="sign-out" size={24} color="black" /> */}
//         </Pressable>
//       </Link>
//   );
// }

// function DismissComposeButton() {
//   return (
//       <Link href="..">
//         <Text
//             style={{
//               fontWeight: "normal",
//               paddingHorizontal: 8,
//               fontSize: 16,
//             }}
//         >
//           Back
//         </Text>
//       </Link>
//   );
// }