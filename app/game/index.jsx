// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Controls() {
  return (
    <View style={styles.container}>
      <Text>Chess board</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
