import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from 'uuid'
//SOURCE: https://www.waldo.com/blog/add-an-image-picker-react-native-app

export const supabase = createClient(
  "https://mdxtlljhnmhjtnekswpv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHRsbGpobm1oanRuZWtzd3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMDQxNjMsImV4cCI6MjAzNDc4MDE2M30.0_3wnZhu2-xXnwIIE9fc66pnJIyeSP7QdW10XRR20xU"
)

export default function UploadImage() {
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState('');
  const [media, setMedia] = useState([]);

  useEffect(() => {
    checkForCameraRollPermission()
    getUser()
    getMedia()
  }, []);

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });
    console.log(_image)
    console.log(_image.canceled);
    if (!_image.canceled) {
        setImage(_image.assets[0].uri);
        uploadImage(_image.assets[0].uri)
        console.log("here is the uri")
        console.log(_image.uri)
        console.log("happens")
      }
  };
  const  checkForCameraRollPermission=async()=>{
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert("Please grant camera roll permissions inside your system's settings");
    }else{
      console.log('Media Permissions are granted')
    }
  };

  const getUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user !== null) {
        setUserId(user.id)
      }
      console.log(user)
    } catch (e) {
    }
  };

  async function getMedia() {

    const { data, error } = await supabase.storage.from('uploads').list(userId + '/', {
      limit: 1
    });

    if (data) {
      setMedia(data);
    } else {
      console.log(error);
    }
  }

  const uploadImage = async (imageUri) => {
    try {
      const fileName = `${userId}/${uuidv4()}`;
      const { data, error } = await supabase.storage.from('User Profile Pictures').upload(fileName, imageUri);
      
      if (error) {
        console.error("Error uploading image:", error.message);
        alert("Upload Failed", "Failed to upload image. Please try again later.");
      } else {
        console.log("Image uploaded successfully:", data.Key);
        alert("Upload Success", "Image uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading image:", error.message);
      alert("Upload Failed", "Failed to upload image. Please try again later.");
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
const imageUploaderStyles=StyleSheet.create({
    container:{
        elevation:2,
        height:200,
        width:200,
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:999,
        overflow:'hidden',
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'25%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    }
})