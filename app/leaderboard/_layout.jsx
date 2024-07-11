import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, DataTable, PaperProvider } from 'react-native-paper';
import { supabase } from "../App";



export default function LeaderboardScreen() {
    const [userEmail, setUserEmail] = useState('');
    const [profiles, setProfiles] = useState([])

    useEffect(() => {
        fetchProfiles()
        console.log("profiles: ", profiles)
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
        await getUserEmail()
        try {
            const { data, error } = await supabase
                .from('user_profiles')
                .select("*")
                .order('points', {ascending: false})
            if (error) throw error
            if (data != null) {
                setProfiles(data)                
            }
            return data
        }
        catch (error) {
            alert(error.message)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.largeText}>Leaderboard</Text>
            <ScrollView style={styles.tableContainer}>
             <DataTable style={styles.table}>
                <DataTable.Header>
                    <DataTable.Title style={styles.tableHeader}>Username</DataTable.Title>
                    <DataTable.Title numeric style={styles.tableHeader}>Rank</DataTable.Title>
                    <DataTable.Title numeric style={styles.tableHeader}>Points</DataTable.Title>
                </DataTable.Header>

                {profiles.map((item, index) => (
                    <DataTable.Row key={item.id} style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                    <DataTable.Cell>{item.username}</DataTable.Cell>
                    <DataTable.Cell numeric>{index+1}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.points}</DataTable.Cell>
                    </DataTable.Row>
                ))}
            </ DataTable> 
            </ ScrollView>
        </ View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Light background color
    padding: 16,
  },
  tableContainer: {
    borderRadius: 20,
    },
  table: {
    borderRadius: 25,
    backgroundColor: '#fc9c9c'
  },
  largeText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fb5b5a',
    paddingBottom: 20,
  },
  tableHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black ', // Darker font color
    },
  rowEven: {
    backgroundColor: '#fecdcd', // Alternate row background color
    },
    rowOdd: {
        backgroundColor: '#fee6e6', // Alternate row background color
    },
});