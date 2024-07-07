import UploadImage from "../UploadImage";
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';

function UserSettings() {
    return (
       <>
       <View style={styles.container}>
        <h1>User Settings</h1>
        <UploadImage />
        <Image></Image>
       </View>
       </>
    );
}

const styles = StyleSheet.create({
    container: {
      padding:50,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default UserSettings;