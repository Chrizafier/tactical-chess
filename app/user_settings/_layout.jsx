import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import UploadProfilePic from './ProfilePic';
import { supabase } from '../App';

// resource used: https://www.rnexamples.com/react-native-examples/b6/Simple-edit-profile-view

const ProfileSettingsScreen = () => {

  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    getProfile()
    getProfileInformation()
  }, [userEmail]);

  async function getProfile() {
    try {
      const { data, error } = await supabase.auth.getUser()
      console.log("user data upload imagsssse: ", data)
      setUserEmail(data.user.user_metadata.email)
    } catch {
      console.log("oh no!!")
    }
  }
  async function getProfileInformation() {
    console.log("user emaillllll: ", userEmail)
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select("*")
        .eq('email', userEmail)
      console.log("getProfileInformation DATA: ", data)
      setBio(data[0].bio)
      setUsername(data[0].username)
    } catch {
      console.log("oh no!!")
    }
  }

  const handleSubmit = async () => {
    try {
      const newData = { username: username, bio: bio};

      const { data, error } = await supabase
        .from('user_profiles')
        .update(newData)
        .eq('email', userEmail)


      if (error) throw error
    } catch (error) {
      alert(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
      <UploadProfilePic />
      </View>
        {/* <Text style={styles.label}>Username</Text> */}
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Set/Change username..."
            value={username}
            onChangeText={setUsername}
          />
        </ View>
        {/* <Text style={styles.label}>Bio</Text> */}
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Set/Change bio..."
            value={bio}
            onChangeText={setBio}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => handleSubmit({username, bio})}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 20,
  },
  input: {
    // borderColor: '#ccc',
    // borderWidth: 1,
    // borderRadius: 5,
    // padding: 10,
    // fontSize: 18,
    height: 35,
    padding: 10,
    borderRadius: 30,
  },
  button: {
    // marginTop: 20,
    // backgroundColor: '#de4e45',
    // borderRadius: 5,
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    width:"60%",
    borderRadius:25,
    height:40,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    marginBottom:20,
    backgroundColor:"#fb5b5a",
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  avatarContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarButtonText: {
    color: '#1E90FF',
    fontSize: 18,
  },
  inputView: {
    backgroundColor: "#FFC9CB",
    borderRadius: 30,
    width: "60%",
    height: 35,
    marginBottom: 20,
    alignItems: "left",
  },
});

export default ProfileSettingsScreen;