import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from 'uuid';
import { _Image } from 'react-native';
import { decode } from 'base64-arraybuffer'


// Initialize Supabase client
const supabaseUrl = "https://mdxtlljhnmhjtnekswpv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHRsbGpobm1oanRuZWtzd3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMDQxNjMsImV4cCI6MjAzNDc4MDE2M30.0_3wnZhu2-xXnwIIE9fc66pnJIyeSP7QdW10XRR20xU";

const supabase = createClient(supabaseUrl, supabaseKey);

export default function UploadImage() {
  const [imageURI, setImageURI] = useState(null);
  const [base64String, setBase64String] = useState(null);
  const [userId, setUserId] = useState('');
  const [media, setMedia] = useState([]);

  useEffect(() => {
    checkForCameraRollPermission();
    getUser();
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
      const { data: user, error } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    } catch (error) {
      console.error("Error fetching user:", error.message);
    }
  };

  const getMedia = async () => {
    try {
      // Replace 'your_bucket_name' and 'your_image_name.png' with actual values
      const fileName = `${userId}/${uuidv4()}.png`;
      const { publicURL, error } = supabase.storage
        .from('user_profile_pics')
        .getPublicUrl(fileName);

      if (error) {
        console.error('Error fetching image:', error.message);
        Alert.alert('Error', 'Failed to fetch image. Please try again later.');
      } else {
        setImage(publicURL);
      }
    } catch (error) {
      console.error('Error fetching image:', error.message);
      Alert.alert('Error', 'Failed to fetch image. Please try again later.');
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
    console.log("image apple: ", JSON.stringify(_image));
    console.log("image base64: ", _image.assets[0].base64);
    if (!_image.canceled) {
      console.log("reaches here")
      setImage(_image.assets[0]);
      uploadImage(_image.assets[0])
      console.log("image_uri: ", _image.assets[0])
    }
  };
  const uploadImage = async (uri) => {
    try {
      const fileName = `${userId}/${uuidv4()}.png`; // Example: userId/123e4567-e89b-12d3-a456-426614174000.png

      console.log("reached 1")

      const response = await fetch(uri);

      console.log("response: ", response)
      const blob = await response.blob();
      console.log("blob: ", blob)

      // const { data, error } = await supabase
      //   .storage
      //   .from('user_profile_pics')
      //   .upload(fileName, decode('base64FileData'), {
      //     contentType: 'image/png'
      //   })


      if (error) {
        console.error("Error uploading image:", error.message);
        Alert.alert("Upload Failed", "Failed to upload image. Please try again later.");
      } else {
        console.log("Image uploaded successfully:", data.Key);
        Alert.alert("Upload Success", "Image uploaded successfully!");
        // Optionally update state or perform other actions upon successful upload
      }
    } catch (error) {
      console.error("Error uploading image:", error.message);
      Alert.alert("Upload Failed", "Failed to upload image. Please try again later.");
    }
  };

  return (
    <View style={imageUploaderStyles.container}>
      {
        image  && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      }
      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
          <Text>{image ? 'Edit' : 'Upload'} Image</Text>
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
