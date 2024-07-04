import { useRouter } from "expo-router";
import { FlatList, View, Text } from "react-native";
import * as React from 'react';
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from 'react'
import { Card, Button } from 'react-native-paper';
import { HorizontalLayout } from "react-vaadin-components";
export const supabase = createClient(
    "https://mdxtlljhnmhjtnekswpv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHRsbGpobm1oanRuZWtzd3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMDQxNjMsImV4cCI6MjAzNDc4MDE2M30.0_3wnZhu2-xXnwIIE9fc66pnJIyeSP7QdW10XRR20xU"
  )

  var userEmail = "";
  
export default function AppLayout() {
    
    //const [userEmail, setUserEmail] = useState(null);
    const [displayData, setDisplayData] = useState(null)

    useEffect(() => {
        getUserEmail()
    }, []);

    const fetchRequests = async(email) => {
        console.log('bhavya2')
        console.log(email)
            const { data, error } = await supabase
                .from('friend_requests')
                .select("*")
                .eq('receiver_email', email);
        return data
    }

    const getUserEmail = async () => {
        try {
          const { data: { user } } = await supabase.auth.getUser()
          if (user !== null) {
            //setUserEmail(user.email)
            userEmail = user.email
            console.log("bhavya")
            console.log(userEmail)
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
        <FlatList
                data={displayData}
                keyExtractor={(request) => request.id}
                renderItem={({item}) => (
                    <View style={{paddingHorizontal: 20}}>
                        <Card>
                            <Card.Content>
                                <Text>You have a friend request from {item.sender_email}</Text><br></br>
                                <HorizontalLayout>
                                    <Button onPress={()=>acceptFriendRequest(item.sender_email)}>Accept</Button>
                                    <Button onPress={()=>declineFriendRequest(item.sender_email, userEmail)}>Decline</Button>
                                </HorizontalLayout>
                            </Card.Content> 
                        </Card>
                    </View>

                )}
            />
    );
}