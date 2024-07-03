import { useRouter, Slot } from "expo-router";
import * as React from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { DataTable, Card, LeftContent, Button, Text} from 'react-native-paper';
import { useState, useEffect } from 'react'
import { ThemeSupa, darkThemes } from "@supabase/auth-ui-shared";
import { SearchBar } from 'react-native-elements';
import { SafeAreaView, TextInput, FlatList, View } from "react-native";
import filter from "lodash.filter"
import { HorizontalLayout } from "react-vaadin-components";
import { inline } from "react-native-web/dist/cjs/exports/StyleSheet/compiler";

export const supabase = createClient(
    "https://mdxtlljhnmhjtnekswpv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHRsbGpobm1oanRuZWtzd3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMDQxNjMsImV4cCI6MjAzNDc4MDE2M30.0_3wnZhu2-xXnwIIE9fc66pnJIyeSP7QdW10XRR20xU"
)

export default function AppLayout() {
    const [fetchError, setFetchError] = useState(null)
    const [profiles, setProfiles] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [displayData, setDisplayData] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)
    const [userEmail, setUserEmail] = useState('');
    
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

    useEffect(() => {
        getUserEmail()
        fetchProfiles()
    }, []);

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

const addFriend = async (friend_email) => {
    try {
        const { data, error } = await supabase.rpc('append_to_array', { email_param: userEmail, friend_email_param: friend_email });
        if (error) {
            throw new Error('Failed to add friend');
        }
        console.log('Friend added successfully');
        console.log(data)
        console.log("email_param")
        console.log(userEmail)
        console.log("friend_email_param")
        console.log(friend_email)
    } catch (error) {
        console.error('Error adding friend:', error.message);
    }
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
                                    <Button onPress={()=>addFriend(item.email)}>Add Friend</Button>
                                </HorizontalLayout>
                            </Card.Content> 
                        </Card>
                    </View>

                )}
            /></>
        );
}