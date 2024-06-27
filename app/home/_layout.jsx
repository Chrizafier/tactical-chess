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

export const supabase = createClient(
  "https://mdxtlljhnmhjtnekswpv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHRsbGpobm1oanRuZWtzd3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMDQxNjMsImV4cCI6MjAzNDc4MDE2M30.0_3wnZhu2-xXnwIIE9fc66pnJIyeSP7QdW10XRR20xU"
)

// import Home from ".";

// export const unstable_settings = {
//   initialRouteName: "index",
// };

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