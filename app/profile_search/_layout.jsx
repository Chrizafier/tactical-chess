import * as React from 'react';
import { createClient } from "@supabase/supabase-js";
import { DataTable, Card, Button } from 'react-native-paper';
import { useState, useEffect } from 'react'
import { SafeAreaView, TextInput, FlatList, View } from "react-native";
import filter from "lodash.filter"
import { HorizontalLayout } from "react-vaadin-components";

export const supabase = createClient(
    "https://mdxtlljhnmhjtnekswpv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHRsbGpobm1oanRuZWtzd3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMDQxNjMsImV4cCI6MjAzNDc4MDE2M30.0_3wnZhu2-xXnwIIE9fc66pnJIyeSP7QdW10XRR20xU"
)

export default function AppLayout() {
    const [profiles, setProfiles] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [displayData, setDisplayData] = useState(null)
    const [userEmail, setUserEmail] = useState('');
    const [disabledButtons, setDisabledButtons] = useState();

    useEffect(() => {
        getUserEmail()
        fetchProfiles()
    }, []);
    
    const updateSearch = (search) => {
        setSearchQuery(search)
        const formattedQuery = search.toLowerCase();
        console.log("formatted query")
        console.log(formattedQuery)
        const filteredData = filter(profiles, (profile) => {
            console.log('prathu')
            console.log(profile)
            return contains(profile, formattedQuery);
        });
        console.log("filteredData")
        console.log(filteredData)
        setDisplayData(filteredData)
    };

    const contains = (profile, query) => {
        console.log("profileeeeeeee")
        console.log(profile)
        console.log(profile.username)
        if (query == "") {
            return true;
        }
        if (profile.username.includes(query)) {
            return true;
        }
        return false;
    }

    const getUserEmail = async () => {
        try {
          const { data: { user } } = await supabase.auth.getUser()
          if (user !== null) {
            setUserEmail(user.email)
          }
        } catch (e) {
    }
    };

    const fetchProfiles = async() => {
        try {
            const { data, error } = await supabase
                .from('user_profiles')
                .select("*")
            if (error) throw error
            if (data != null) {
                setProfiles(data)
                console.log("success")
            }
        }
        catch (error) {
            alert(error.message)
        }
    }

const addFriendRequest = async (friend_email) => {
    try {
        const { data, error } = await supabase
            .from('friend_requests')
            .insert({ sender_email: userEmail, receiver_email: friend_email })
        console.log("sender_email")
        console.log(userEmail)
        console.log("receiver_email")
        console.log(friend_email)
    } catch (error) {
        console.error('Error adding friend:', error.message);
    }
};

const handleDisable = async (sender_email, receiver_email) => {
    return true
    // try {
    //     console.log("handling disable")
    //     console.log("user email", sender_email)
    //     console.log("receiver email", receiver_email)
    //     var { data, error } = await supabase
    //         .from('user_profiles')
    //         .select('friends')
    //         .eq('email', sender_email) //bhavyalboddu@gmail.com

    //     console.log("data", data)
        
    //     data.forEach((item, index) => {
    //         if (item == receiver_email) {
    //             console.log("p")
    //             return true
    //         }
    //     })

    //     // console.log("handling disable 2")
    //     // console.log("check1")
    //     // console.log("user email", userEmail)
    //     // console.log("check2")
    //     // console.log("receiver_email", receiver_email)
        
    //     data, error = await supabase
    //         .from('friend_requests')
    //         .select('*')
    //         .eq('sender_email', 'bhavyalboddu@gmail.com') //bhavyalboddu@gmail.com
    //         .eq('receiver_email', 'blah@gmail.com')
        
    //     // console.log("handling disable 3")
    //     // console.log("check3")
    //     // console.log("user email", userEmail)
    //     // console.log("check4")
    //     // console.log("receiver_email", receiver_email)
        
    //     // console.log("data 2")
    //     // console.log(data)
        
    //     // if (data !== null && data != []) {
    //     //     console.log('b')
    //     //     return true
    //     // }

    //     //return true

    // } catch (error) {
    //     console.error('Error accepting friend request:', error.message);
    // }
};

        return (
            <><SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
                <TextInput
                    placeholder='Search by username...'
                    clearButtonMode='always'
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={searchQuery}
                    onChangeText={(query) => updateSearch(query)}
                    style={{ paddingHorizontal: 20, paddingVertical: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 8 }} />
            </SafeAreaView>
            <FlatList
                data={displayData}
                keyExtractor={(profile) => profile.id}
                renderItem={({item}) => (
                    <View style={{paddingHorizontal: 20}}>
                        <Card>
                            <Card.Content>
                                <HorizontalLayout>
                                    <DataTable.Cell>{item.username}</DataTable.Cell>
                                    <DataTable.Cell>Rank #{item.rank}</DataTable.Cell>
                                    <Button onPress={()=>addFriendRequest(userEmail, item.email)}>Add Friend</Button>
                                </HorizontalLayout>
                            </Card.Content> 
                        </Card>
                    </View>
                )}
            /></>
        );
}