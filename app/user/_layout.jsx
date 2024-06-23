// import { Link, Stack, useRouter } from "expo-router";
import { useRouter } from "expo-router";
// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from 'react-native';


export default function AppLayout() {
    const router = useRouter();
  
    return (
    <View style={styles.container}>
        <Text>This is the user page!</Text>
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