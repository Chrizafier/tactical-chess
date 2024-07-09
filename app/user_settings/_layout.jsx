import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import UploadProfilePic from './ProfilePic';
import { supabase } from '../_layout';

// resource used: https://www.rnexamples.com/react-native-examples/b6/Simple-edit-profile-view

const ProfileSettingsScreen = () => {

  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    getProfile()
    getProfileInformation()
  }, [username, bio, userEmail]);

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

      await supabase
        .from('active_statuses')
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
      <View style={styles.form}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username..."
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter bio..."
          value={bio}
          onChangeText={setBio}
        />
        <TouchableOpacity style={styles.button} onPress={() => handleSubmit({username, bio})}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '80%',
  },
  label: {
    marginTop: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#de4e45',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
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
});

export default ProfileSettingsScreen;