import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import { supabase } from '../_layout';
import { HorizontalLayout } from 'react-vaadin-components';

export default function ActiveStatusBar() {
  const [displayData, setDisplayData] = useState('')
  const [userEmail, setUserEmail] = useState('')


  useEffect(() => {
    async function getProfile() {
      try {
        const { data, error } = await supabase.auth.getUser()
        console.log("user data: ", data)
        setUserEmail(data.user.user_metadata.email)
      } catch (error) {
        
      }
    }
    getProfile()
    findActiveFriends()
  }, [userEmail, displayData])


  async function findActiveFriends() {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('friends')
        .eq('email', userEmail);


      if (error) {
        throw error;
      }


      console.log("Friends dataaaa: ", data)
      if (data.length > 0 && data[0].friends) {
        const friendsList = data[0].friends
        console.log("friends Listtttttt: ", friendsList)
        const activeStatusData = await getActiveStatusData(friendsList);
        console.log("active status data: ", activeStatusData)
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
      ////////// ONLY ADDED THIS
      if (data !== null) {
        console.log("data after filtering active: ", data)
        const activeList = data.map((element) => element.email)
        console.log("active listtttt: ", activeList)
        const profileData = await getActiveProfiles(activeList)
        console.log("profile data: ", profileData)
        setDisplayData(profileData);
      }


      return data || [];
    } catch (error) {
      console.error('Error fetching active status data:', error.message);
      return [];
    }
  }


  async function getActiveProfiles(activeList) {
    console.log('enters getActiveProfilePics()')
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .in('email', activeList)
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
    <View style={styles.container}>
      <Text style={styles.header}>Active Friends:</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <HorizontalLayout>
          <FlatList
            data={displayData}
            horizontal={true}
            keyExtractor={(item) => item.id.toString()} // Ensure key is string or number
            renderItem={({ item }) => (
              <View style={{ paddingHorizontal: 20 }}>
                <Image
                  source={{ uri: item.profileURL }}
                  style={styles.profileImage} />
                <Text style={styles.username}>{item.username}</Text>
              </View>
            )} />
        </HorizontalLayout>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -50,
    marginLeft: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
    borderRadius: 10,
    width: 120,
    height: 150,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#de4e45',
    marginBottom: 10,
  },
  username: {
    fontSize: 12,
    textAlign: 'center',
  },
});
