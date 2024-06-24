// import { Link, Stack, useRouter } from "expo-router";
import { useRouter } from "expo-router";
// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';


export default function AppLayout() {
    const router = useRouter();
  
    return (
    <View style={styles.container}>
        <Avatar.Icon size={128} icon="account-cog" />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#03f',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });