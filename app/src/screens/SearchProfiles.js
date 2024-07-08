import * as React from 'react';
import { DataTable, Card, Button } from 'react-native-paper';
import { useState, useEffect } from 'react'
import { SafeAreaView, TextInput, View, StyleSheet, ScrollView, Text, Image, Pressable} from "react-native";
import filter from "lodash.filter"
import { supabase } from '../../App';
import { TouchableOpacity } from 'react-native-web';
import CustomHeader from '../components/CustomHeader';

// reference used: https://github.com/aniledev/react-searchable-people-directory/blob/main/src/App.tsx

export default function SearchProfiles() {
    const [profiles, setProfiles] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [displayData, setDisplayData] = useState([])
    const [userEmail, setUserEmail] = useState('');
    const [disabledButtons, setDisabledButtons] = useState();

    useEffect(() => {
        getUserEmail()
        fetchProfiles()
        console.log("akdljfskaadasfjdakfjlajflajfljaljdflajlfjalfjlajdlfaljldajfla")
    }, []);
    
    const updateSearch = async (search) => {
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
        console.log('displayData: ', displayData)
        console.log('userEmail', userEmail)
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
        // return (
        //     <><SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
        //         <TextInput
        //             placeholder='Search by username...'
        //             clearButtonMode='always'
        //             autoCapitalize='none'
        //             autoCorrect={false}
        //             value={searchQuery}
        //             onChangeText={(query) => updateSearch(query)}
        //             style={{ paddingHorizontal: 20, paddingVertical: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 8 }} />
        //     </SafeAreaView>
        //     <ScrollView>
        //     <Text style={styles.textFriends}>Friends</Text>
        //     {
        //         displayData.map((item) => {
        //             return (
        //                 <View key={item.id} style={styles.itemContainer}>
        //                     <Image
        //                         source={{ uri: item.profileURL }}
        //                         style={styles.image}
        //                     />
        //                     <View>
        //                         <Text style={styles.textName}>{item.username}</Text>
        //                         <Text style={styles.textEmail}>Rank #{item.rank}</Text>
        //                     </View>
        //                 </View>
        //             )
        //         })
        //     }
        //     </ScrollView>
        //     </>
        // );
return (
        <><CustomHeader showBackButton={true}></CustomHeader><SafeAreaView style={styles.container}>
        <TextInput
            placeholder='Search by username...'
            clearButtonMode='always'
            autoCapitalize='none'
            autoCorrect={false}
            value={searchQuery}
            onChangeText={(query) => updateSearch(query)}
            style={styles.input} />
        <Text style={styles.textFriends}>Add Friends</Text>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {displayData.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    style={styles.profileContainer}
                    // onPress={() => addFriendRequest(item.email)}
                    activeOpacity={0.7}
                >
                    <Image
                        source={{ uri: item.profileURL }}
                        style={styles.profileImage} />
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>{item.username}</Text>
                        <Text style={styles.profileRank}>Rank #{item.rank}</Text>
                    </View>
                    <Button
                        onPress={() => addFriendRequest(item.email)}
                        style={styles.addButton}
                        labelStyle={styles.buttonLabel}
                    >
                        Add Friend
                    </Button>
                </TouchableOpacity>
            ))}
        </ScrollView>
    </SafeAreaView></>
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