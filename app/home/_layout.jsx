import React, { useState, useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { createClient } from "@supabase/supabase-js";
import { Card } from 'react-native-paper';

export const supabase = createClient(
  "https://mdxtlljhnmhjtnekswpv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHRsbGpobm1oanRuZWtzd3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMDQxNjMsImV4cCI6MjAzNDc4MDE2M30.0_3wnZhu2-xXnwIIE9fc66pnJIyeSP7QdW10XRR20xU"
);

export default function AppLayout() {
  const [userEmail, setUserEmail] = useState('');
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    findActiveFriends();
  }, []);

  const getUserEmail = async () => {
    try {
      const { data: {user}, error } = await supabase.auth.getUser();
      if (user) {
        console.log("gets user")
        console.log(user.email)
        setUserEmail(user.email);
      }
      else {
        console.log("doesn't get user")
      }
    } catch (error) {
      console.error('Error fetching user email:', error.message);
    }
  };

  async function findActiveFriends() {
    await getUserEmail();
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
    <View>
      <Text>Active Friends:</Text>
      <FlatList
        data={displayData}
        keyExtractor={(item) => item.id.toString()} // Ensure key is string or number
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 20 }}>
            <Card>
              <Card.Content>
                <Text>{item.email} is active</Text>
              </Card.Content>
            </Card>
          </View>
        )}
      />
    </View>
  );
}
