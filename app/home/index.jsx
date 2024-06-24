// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';

export default function Home() {
  return (
    <View style={styles.container}>
      <Avatar.Icon size={128} icon="home" />
    </View>
  );
}

// below line 7
/* <StatusBar style="auto" /> */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});