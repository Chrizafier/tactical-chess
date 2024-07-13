import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { supabase } from '../_layout';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function NotificationsScreen() {
  // const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState('');
  const [displayData, setDisplayData] = useState([]);

  // useEffect(() => {
  //   async function getProfile() {
  //     try {
  //       console.log("running")

  //       const { data, error } = await supabase.auth.getUser();
  //       if (data) {
  //         setUserEmail(data.user.user_metadata.email);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user:', error.message);
  //     }
  //   }
  //   getProfile();
  //   changeDisplay();

  // }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     async function getProfile() {
  //       try {
  //         const { data, error } = await supabase.auth.getUser();
  //         if (data) {
  //           setUserEmail(data.user.user_metadata.email);
  //         }
  //       } catch (error) {
  //         console.error('Error fetching user:', error.message);
  //       }
  //     }
  //     getProfile();
  //     changeDisplay();
  //   }, [])
  // );

  // useEffect(() => {
  //   const unsubscribeFocus = navigation.addListener('focus', async () => {
  //     try {
  //       const { data, error } = await supabase.auth.getUser();
  //       if (data) {
  //         setUserEmail(data.user.user_metadata.email);
  //       }
  //       changeDisplay()
  //     } catch (error) {
  //       console.error('Error fetching user:', error.message);
  //     }
  //   });

  //   // Cleanup function for removing listener
  //   return unsubscribeFocus;
  // }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      getProfile()
      changeDisplay()
    }, [userEmail])
  );

        async function getProfile() {
        try {
          const { data, error } = await supabase.auth.getUser();
          if (data) {
            setUserEmail(data.user.user_metadata.email);
          }
        } catch (error) {
          console.error('Error fetching user:', error.message);
        }
      }


  const fetchRequests = async (email) => {
    try {
      const { data, error } = await supabase
        .from('friend_requests')
        .select('*')
        .eq('receiver_email', email);
        console.log(data)
      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        const requestedList = data.map((element) => element.sender_email);
        const profileData = await getSenderProfiles(requestedList);
        setDisplayData(profileData);
      } else {
        setDisplayData([]);
      }
    } catch (error) {
      console.error('Error fetching friend requests:', error.message);
    }
  };

  const getSenderProfiles = async (requestedList) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .in('email', requestedList);

      if (error) {
        throw error;
      }
      console.log(data)
      return data || [];
    } catch (error) {
      console.error('Error fetching sender profiles:', error.message);
      return [];
    }
  };

  const changeDisplay = () => {
    if (userEmail) {
      fetchRequests(userEmail);
    }
  };

  const acceptFriendRequest = async (sender_email) => {
    try {
      const { data, error } = await supabase
        .from('friend_requests')
        .delete()
        .eq('sender_email', sender_email)
        .eq('receiver_email', userEmail);

      if (error) {
        throw error;
      }

      await supabase.rpc('update_friends_array', { sender_email, receiver_email: userEmail });
      fetchRequests(userEmail);
    } catch (error) {
      console.error('Error accepting friend request:', error.message);
    }
  };

  const declineFriendRequest = async (sender_email) => {
    try {
      const { data, error } = await supabase
        .from('friend_requests')
        .delete()
        .eq('sender_email', sender_email)
        .eq('receiver_email', userEmail);

      if (error) {
        throw error;
      }

      fetchRequests(userEmail);
    } catch (error) {
      console.error('Error declining friend request:', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textFriends}>Notifications</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {displayData.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.profileContainer}
            activeOpacity={0.7}
          >
            <Image
              source={{ uri: item.profileURL }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileRank}>You have a friend request from {item.username}</Text>
            </View>
            <Button
              onPress={() => acceptFriendRequest(item.email)}
              style={styles.addButton}
              labelStyle={styles.buttonLabel}
            >
              Accept
            </Button>
            <Button
              onPress={() => declineFriendRequest(item.email)}
              style={styles.addButton}
              labelStyle={styles.buttonLabel}
            >
              Decline
            </Button>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  textFriends: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  scrollViewContent: {
    marginTop: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#fee6e6',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: '#fb5b5a',
    borderWidth: 1,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 10,
  },
  profileRank: {
    fontSize: 14,
    color: 'grey',
  },
  addButton: {
    backgroundColor: '#fb5b5a',
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonLabel: {
    color: '#fff',
  },
});
