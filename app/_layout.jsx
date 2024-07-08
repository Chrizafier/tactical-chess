// // import { Link, Stack, useRouter, Slot } from "expo-router";
// import { useRouter, Slot } from "expo-router";
// // import { StatusBar } from "expo-status-bar";

// import * as React from 'react';
// import { Appbar } from 'react-native-paper';
// import { useState, useEffect } from 'react'
// import { supabase } from "../index";
// import { useNavigation } from '@react-navigation/native';

// export default function AppLayout() {
//     //const router = useRouter();
//     const navigation = useNavigation();
//     const [userEmail, setUserEmail] = useState('');

//       // useEffect(() => {
//       //   getUserEmail()
//       // }, []);

//       const getUserEmail = async () => {
//         console.log("reaches getUserEmail")
//         try {
//           const { data } = await supabase.auth.getUser()
//           if (user !== null) {
//             setUserEmail(data.user.user_metadata.email)
//           }
//         } catch (e) {}
//     }

//     async function handleSignOut(e){
//         e.preventDefault()
//         await getUserEmail()
//         const newData = { active: false};
    
//         try {
//           // await getUserEmail()
//           // const {data, error} = await supabase
//           // .from('active_statuses')
//           // .update(newData)
//           // .eq('email', userEmail)

//         //   await supabase.auth.signOut()
//         //   if (error) throw error
    
//           navigation.navigate('login');
//           console.log("i'm here")

//           await getUserEmail()
//           const {data, error} = await supabase
//           .from('active_statuses')
//           .update(newData)
//           .eq('email', userEmail)

//           console.log("data: ", data)
          
//         } catch (error) {
//         //   alert(error)
//         }
//       }

//     return (
//         <>
//             <Appbar.Header>
//                 {/* <Appbar.BackAction onPress={ () => router.back() } />
//                 <Appbar.Content title='Tactical Chess' />
//                 <Appbar.Action icon='home' onPress={() => router.push('/home')} />
//                 <Appbar.Action icon='chess-bishop' onPress={() => router.push('/game')} />
//                 <Appbar.Action icon='account-cog' onPress={ () => router.push('/user_settings') } />
//                 <Appbar.Action icon='magnify' onPress={ () => router.push('/profile_search') } />
//                 <Appbar.Action icon='bell' onPress={ () => router.push('/working_notifications') } />
//                 <Appbar.Action icon='login' onPress={ handleSignOut } /> */}
//                 {/* <Appbar.BackAction onPress={() => navigation.goBack()} /> */}
//                 <Appbar.Content title='Tactical Chess' />
//                 <Appbar.Action icon='home' onPress={() => navigation.navigate('home')} />
//                 <Appbar.Action icon='chess-bishop' onPress={() => navigation.navigate('game')} />
//                 <Appbar.Action icon='account-cog' onPress={() => navigation.navigate('user_settings')} />
//                 <Appbar.Action icon='magnify' onPress={() => navigation.navigate('profile_search')} />
//                 <Appbar.Action icon='bell' onPress={() => navigation.navigate('working_notifications')} />
//                 <Appbar.Action icon='login' onPress={handleSignOut} />
//             </Appbar.Header>
//             <Slot />
//         </>
//     );
// }