import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-paper'

export default function Home() {
  return (
    <View style={styles.container}>
      <Avatar.Icon size={128} icon="home" />
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
