import { useNavigation } from '@react-navigation/native'; // Assuming you're using react-navigation
import { FlatList, View, Text, StyleSheet } from "react-native";
import * as React from 'react';
import { useState, useEffect } from 'react'
import { Card, Button } from 'react-native-paper';
import { supabase } from '../../App';
import { ScrollView, TouchableOpacity } from "react-native-web";
import filter from "lodash.filter"
import CustomHeader from '../components/CustomHeader';


export default function Notifications() {
  const navigation = useNavigation();

  const [userEmail, setUserEmail] = useState('')
  const [displayData, setDisplayData] = useState([])

  useEffect(() => {
    async function getProfile() {
      const { data, error } = await supabase.auth.getUser()
      try {
        setUserEmail(data.user.user_metadata.email)
      }
      catch {}
    }
    getProfile()
    console.log("user email: ", userEmail)
    changeDisplay()
  }, [userEmail, displayData])

  const fetchRequests = async(email) => {
    console.log('bhavya2')
    console.log(email)
    const { data, error } = await supabase
        .from('friend_requests')
        .select("*")
        .eq('receiver_email', email);
    if (error) {
        throw error;
    }
    if (data !== null) {
      console.log("data after filtering for requests received: ", data) 
      const requestedList = data.map((element) => element.sender_email)
      console.log("requested listtttt: ", requestedList)
      const profileData = await getSenderProfiles(requestedList)
      console.log("profile pics data: ", profileData)
      setDisplayData(profileData);
      console.log("DISPLAY DATA: ", displayData)
    }
    return data || []
  }

  async function getSenderProfiles(requestedList) {
    console.log('enters getSenderProfiles()')
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .in('email', requestedList)

      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error fetching active status data:', error.message);
      return [];
    }
  }

  const changeDisplay = async () => {
    console.log("reaches changeDisplay")
    try {
      console.log()
      if (userEmail !== null) {
        const fetchedData = await fetchRequests(userEmail)
        setDisplayData(fetchedData)
        console.log(fetchedData)
      }
    } catch (e) {}
  };

  const acceptFriendRequest = async (sender_email) => {
    try {
        console.log("sender_email")
        console.log(sender_email)
        console.log("receiver_email")
        console.log(userEmail)
        const { data, error } = await supabase
            .from('friend_requests')
            .delete()
            .eq('sender_email', sender_email)
            .eq('receiver_email', userEmail)
        
        await supabase.rpc('update_friends_array', { sender_email: sender_email, receiver_email: userEmail});

        const fetchedData = await fetchRequests(userEmail)
        setDisplayData(fetchedData)
        console.log(fetchedData)

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
              .eq('receiver_email', userEmail)
          
          const fetchedData = await fetchRequests(userEmail)
          setDisplayData(fetchedData)
          console.log(fetchedData)

      } catch (error) {
          console.error('Error accepting friend request:', error.message);
      }
  };


  return (
    <>
    <CustomHeader showBackButton={true}></CustomHeader>
    <Text style={styles.textFriends}>Notifications</Text>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
    {displayData.map((item) => (
      <TouchableOpacity
        key={item.id}
        style={styles.profileContainer}
        activeOpacity={0.7}
      >
        {/* <Image
          source={{ uri: item.profileURL }}
          style={styles.profileImage}
        /> */}
        <View style={styles.profileInfo}>
          <Text style={styles.profileRank}>You have a friend request from {item.id}</Text>
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      marginHorizontal: 20,
  },
  input: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
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
      backgroundColor: '#e8cdb9',
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
      borderColor: '#de4e45',
      borderWidth: 1
  },
  profileInfo: {
      flex: 1,
      marginLeft: 10,
  },
  profileName: {
      fontSize: 18,
      fontWeight: '600',
      color: '#333',
  },
  profileRank: {
      fontSize: 14,
      color: 'grey',
  },
  addButton: {
      backgroundColor: '#de4e45',
      borderRadius: 5,
  },
  buttonLabel: {
      color: '#fff',
  },
});