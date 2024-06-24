// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Chess board</Text>
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
