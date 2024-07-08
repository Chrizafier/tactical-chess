import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, Image, StyleSheet } from 'react-native';
import { createClient } from "@supabase/supabase-js";
import { Card, Avatar, Badge} from 'react-native-paper';
import { supabase } from "../index";


// export default function AppLayout() {
//   const [userEmail, setUserEmail] = useState('');
//   const [displayData, setDisplayData] = useState([]);
//   const [session, setSession] = useState(null);

//   useEffect(() => {
//     findActiveFriends();
//   }, []);

//   const getUserEmail = async () => {
//     try {
//       const { data: { user } } = await supabase.auth.getUser()
//       if (user) {
//         console.log("gets user")
//         console.log(user.email)
//         setUserEmail(user.email);
//       }
//       else {
//         console.log("doesn't get user")
//       }
//     } catch (error) {
//       console.error('Error fetching user email:', error.message);
//     }
//   };

//   async function findActiveFriends() {
//     await getUserEmail();
//     try {
//       const { data, error } = await supabase
//         .from('user_profiles')
//         .select('friends')
//         .eq('email', userEmail);

//       if (error) {
//         throw error;
//       }

//       if (data.length > 0 && data[0].friends) {
//         const friendsList = data[0].friends[0].split(',').map(item => item.trim());
//         const activeStatusData = await getActiveStatusData(friendsList);
//         setDisplayData(activeStatusData);
//       } else {
//         console.log('No friends found for user:', userEmail);
//       }
//     } catch (error) {
//       console.error('Error fetching active friends:', error.message);
//     }
//   }

//   async function getActiveStatusData(friendsList) {
//     try {
//       const { data, error } = await supabase
//         .from('active_statuses')
//         .select('*')
//         .in('email', friendsList)
//         .eq('active', true); // Use boolean true instead of string 'TRUE'

//       if (error) {
//         throw error;
//       }

//       return data || [];
//     } catch (error) {
//       console.error('Error fetching active status data:', error.message);
//       return [];
//     }
//   }

//   return (
//     <View>
//       <Text>Active Friends:</Text>
//       <FlatList
//         data={displayData}
//         keyExtractor={(item) => item.id.toString()} // Ensure key is string or number
//         renderItem={({ item }) => (
//           <View style={{ paddingHorizontal: 20 }}>
//             <Card>
//               <Card.Content>
//                 <Text>{item.email} is active</Text>
//               </Card.Content>
//             </Card>
//           </View>
//         )}
//       />
//     </View>
//   );
// }
// export default function AppLayout() {
//   const [fullName, setFullName] = useState('')
//   const [email, setEmail] = useState('')

//   useEffect(_ => {
//     async function getProfile() {
//       //console.info(supabase)
//       const { data, error } = await supabase.auth.getUser()
//       console.log("user data: ", data)
//       try {
//         setFullName(data.user.user_metadata.full_name)
//         setEmail(data.user.user_metadata.email)
//       }
//       catch {
//         setFullName(`Anonymous${[
//           `${Math.floor(Math.random() * 9)}`,
//           `${Math.floor(Math.random() * 9)}`,
//           `${Math.floor(Math.random() * 9)}`
//         ].join('')}`
//         )
//         setEmail('please.sign.in@email.com')
//       }
//     }
//     getProfile()
//   })

//   return (
//     <View>
//       <Text>Home</Text>
//     </View>
//   )
// }


export default function AppLayout() {
  const [displayData, setDisplayData] = useState('')
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    async function getProfile() {
      try {
        const { data, error } = await supabase.auth.getUser()
        console.log("user data: ", data)
        setUserEmail(data.user.user_metadata.email)
      } catch {error}
    }
    getProfile()
    findActiveFriends()
  }, [displayData, userEmail])

  async function findActiveFriends() {
    //await getUserEmail();
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('friends')
        .eq('email', userEmail);

      if (error) {
        throw error;
      }

      if (data.length > 0 && data[0].friends) {
        const friendsList = data[0].friends[0].split(',').map(item => item.trim());
        const activeStatusData = await getActiveStatusData(friendsList);
        setDisplayData(activeStatusData);
      } else {
        console.log('No friends found for user:', userEmail);
      }
    } catch (error) {
      console.error('Error fetching active friends:', error.message);
    }
  }

  async function getActiveStatusData(friendsList) {
    try {
      const { data, error } = await supabase
        .from('active_statuses')
        .select('*')
        .in('email', friendsList)
        .eq('active', true); // Use boolean true instead of string 'TRUE'

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching active status data:', error.message);
      return [];
    }
  }

  return (
    // <View>
    //   <Text>Active Friends:</Text>
    //   <FlatList
    //     data={displayData}
    //     keyExtractor={(item) => item.id.toString()} // Ensure key is string or number
    //     renderItem={({ item }) => (
    //       <View style={{ paddingHorizontal: 20 }}>
    //         <Card>
    //           <Card.Content>
    //             <Text>{item.email} is active</Text>
    //           </Card.Content>
    //         </Card>
    //       </View>
    //     )}
    //   />
    // </View>
    <View>
      <Text>Active Friends:</Text>
      <FlatList
        data={displayData}
        keyExtractor={(item) => item.id.toString()} // Ensure key is string or number
        renderItem={({ item }) => (
          console.log(item)
          // <View style={{ paddingHorizontal: 20 }}>
          //   <Image
          //     source={{ uri: item.profileURL }}
          //     style={styles.profileImage}
          //   />
          //   <Text>{item.email}</Text>
          //   <Text>{item.profileURL}</Text>
          //   <Text>hi</Text>
          // </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderColor: '#de4e45',
      borderWidth: 1
  },
});