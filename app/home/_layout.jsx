// import { Link, Stack, useRouter } from "expo-router";
import { useRouter } from "expo-router";
// import { StatusBar } from "expo-status-bar";
import { FlatList, Text, View } from 'react-native';
import * as React from 'react';
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from 'react'
import { Card, Button } from 'react-native-paper';


export const supabase = createClient(
  "https://mdxtlljhnmhjtnekswpv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHRsbGpobm1oanRuZWtzd3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMDQxNjMsImV4cCI6MjAzNDc4MDE2M30.0_3wnZhu2-xXnwIIE9fc66pnJIyeSP7QdW10XRR20xU"
)

var userEmail = ''

export default function AppLayout() {
    const [displayData, setDisplayData] = useState(null)
    //const [userEmail, setUserEmail] = useState(null)
    
    useEffect(() => {
      findActiveFriends()
    }, []);

    const getUserEmail = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user !== null) {
          console.log('peach')
          userEmail = user.email
          //await setUserEmail(user.email)
        }

      } catch (e) {}
    }

    async function findActiveFriends(){ 
      await getUserEmail()
      try {
        console.log("MY EMAIL: ", userEmail)

        const {data, error} = await supabase
        .from('user_profiles')
        .select('friends')
        .eq('email', userEmail)

        if (error) throw error

        let friendsList = data[0].friends[0].split(',').map(item => item.trim());

        console.log("friends listtttt: ", friendsList)

        const activeStatusData = await getActiveStatusData(friendsList)

        setDisplayData(activeStatusData)
        
      } catch (error) {
        alert(error)
      }
    }

    async function getActiveStatusData(friendsList) {
      var prabha = ['bhavyalboddu@gmail.com', 'blah@gmail.com']
      try {
        const {data, error} = await supabase
        .from('active_statuses')
        .select('*')
        .in('email', friendsList)
        .eq('active', 'TRUE')

        if (error) throw error
        return data
        
      } catch (error) {
        alert(error)
      }
    }

    return (
      <><Text>Active Friends: </Text><FlatList
        data={displayData}
        keyExtractor={(activeFriend) => activeFriend.id}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 20 }}>
            <Card>
              <Card.Content>
                <Text>{item.email} is active</Text><br></br>
              </Card.Content>
            </Card>
          </View>
        )} /></>
    );
}