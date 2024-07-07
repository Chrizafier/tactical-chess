import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { createClient } from "@supabase/supabase-js";
import { decode } from 'base64-arraybuffer';

// Initialize Supabase client
const supabaseUrl = "https://mdxtlljhnmhjtnekswpv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHRsbGpobm1oanRuZWtzd3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMDQxNjMsImV4cCI6MjAzNDc4MDE2M30.0_3wnZhu2-xXnwIIE9fc66pnJIyeSP7QdW10XRR20xU";

const supabase = createClient(supabaseUrl, supabaseKey);


var userEmail = null
export default function UploadImage() {
  const [imageURI, setImageURI] = useState(null);
  const [base64String, setBase64String] = useState(null);
  const [userID, setUserID] = useState('');

  useEffect(() => {
    checkForCameraRollPermission();
    getMedia();
  }, []);

  const checkForCameraRollPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Required", "Please grant camera roll permissions in your device settings.");
    } else {
      console.log('Media Permissions are granted');
    }
  };

  const getUser = async () => {
    try {
      const { data: {user}, error } = await supabase.auth.getUser();
      if (user) {
        setUserID(user.id);
        userEmail = user.email
        console.log("User info: ", user);
      }
    } catch (error) {
      console.error("Error fetching user:", error.message);
    }
  };

  // const getMedia = async () => {
  //   try {
  //     const fileName = `${userID}/${userID}${Date.now()}.png`;
  //     const { data, error } = await supabase.storage
  //       .from('avatars')
  //       .getPublicUrl(fileName);

  //     if (error) {
  //       console.error('Error fetching image:', error.message);
  //       Alert.alert('Error', 'Failed to fetch image. Please try again later.');
  //     } else {
  //       setImageURI(data.publicURL);
  //       console.log("Public URL:", data.publicURL);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching image:', error.message);
  //     Alert.alert('Error', 'Failed to fetch image. Please try again later.');
  //   }
  // };

  const getMedia = async () => {
    try {
      await getUser()
      const { data, error } = await supabase
        .from('user_profiles')
        .select("profileURL")
        .eq('email', userEmail);
      console.log("Date URL hopefully: ", data)
      setImageURI(data[0].profileURL)
    } catch (error) {

    }
  };

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
      base64: true,
    });

    if (!_image.cancelled) {
      console.log("Image picked:", _image.assets[0].uri);
      setBase64String(_image.assets[0].base64);
      await uploadImage(_image.assets[0].base64);
      await getMedia();
    }
  };

  const deleteFolder = async (folderPath) => {

    console.log(
      "does try to delete files"
    )
    try {
      const { data: files, error } = await supabase
        .storage
        .from('avatars')
        .list(folderPath);

      if (error) {
        console.error('Error listing files:', error.message);
        return;
      }

      const deleteOperations = files.map(async (file) => {
        console.log(file)
        const { error: deleteError } = await supabase
          .storage
          .from('avatars')
          .remove([file.name]);

        if (deleteError) {
          console.error(`Error deleting file ${file.name}:`, deleteError.message);
        } else {
          console.log(`Deleted file ${file.name} successfully.`);
        }
      });

      await Promise.all(deleteOperations);

      console.log(`Deleted all files in folder ${folderPath}.`);
    } catch (error) {
      console.error('Error deleting folder:', error.message);
    }
  };

  const checkIfFolderExists = async (folderPath) => {
    const { data: files, error } = await supabase
      .storage
      .from('avatars')
      .list(folderPath);
    if (!files || files.length === 0 ) {
      return false
    }
    else {
      return true
    }
  } 

  const uploadImage = async (base64FileData) => {
    const date = Date.now()
    const folderPath = `${userID}`
    try {
      const fileName = `${userID}/${userID}${date}.png`;
      console.log("Uploading image:", fileName);
      
      if (checkIfFolderExists(folderPath)) {
        await deleteFolder(folderPath);
      }

      console.log("Delete operations testing")
      const { data: files } = await supabase
        .storage
        .from('avatars')
        .list(folderPath);

      const deleteOperations = files.map(async (file) => {
          console.log("file: ", file)
      });     

      await supabase
        .storage
        .from('avatars')
        .upload(fileName, decode(base64FileData), {
          contentType: 'image/png'
        });

      const { data, error } = await supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      const newData = { profileURL: data.publicUrl};
      await supabase
        .from('user_profiles')
        .update(newData)
        .eq('email', userEmail)
      

      if (error) {
        console.error("Error uploading image:", error.message);
        Alert.alert("Upload Failed", "Failed to upload image. Please try again later.");
      } else {
        console.log("Image uploaded successfully:", data.Key);
        Alert.alert("Upload Success", "Image uploaded successfully!");
        setImageURI(data.publicURL); // Update image URI after successful upload
      }
    } catch (error) {
      console.error("Error uploading image:", error.message);
      Alert.alert("Upload Failed", "Failed to upload image. Please try again later.");
    }
  };

  return (
    <View style={imageUploaderStyles.container}>
      {
        imageURI && <Image source={{ uri: imageURI }} style={{ width: 200, height: 200 }} />
      }
      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
          <Text>{imageURI ? 'Edit' : 'Upload'} Image</Text>
          <AntDesign name="camera" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden',
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '25%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center'
  }
});
