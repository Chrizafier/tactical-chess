import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer';
import { supabase } from '../_layout';
import { useNavigation, useFocusEffect } from '@react-navigation/native';


export default function UploadProfilePic() {
  const [imageURI, setImageURI] = useState('');
  const [base64String, setBase64String] = useState('');
  const [userID, setUserID] = useState('');
  const [userEmail, setUserEmail] = useState('');


  useEffect(() => {
    // console.log("hello")
    // async function getProfile() {
    //   try {
    //     const { data, error } = await supabase.auth.getUser()
    //     console.log("user data upload image: ", data)
    //     setUserEmail(data.user.user_metadata.email)
    //     setUserID(data.user.id)
       
       
    //   } catch {
    //     console.log("oh no!!")
    //   }
    // }
    // getProfile()
    checkForCameraRollPermission();
    // getMedia();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      console.log("hello")
      async function getProfile() {
        try {
          const { data, error } = await supabase.auth.getUser()
          console.log("user data upload image: ", data)
          setUserEmail(data.user.user_metadata.email)
          setUserID(data.user.id)
         
         
        } catch {
          console.log("oh no!!")
        }
      }
      getProfile()
      // checkForCameraRollPermission();
      getMedia();
    }, [userEmail])
  );


  const checkForCameraRollPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Required", "Please grant camera roll permissions in your device settings.");
    } else {
      console.log('Media Permissions are granted');
    }
  };


  const getUser = async() => {
    try {
      const { data, error } = await supabase.auth.getUser()
      console.log("user data upload image: ", data)
      setUserEmail(data.user.user_metadata.email)
      setUserID(data.user.id)
      console.log("data.user.user_metadata.email: ", data.user.user_metadata.email)
      console.log("data.user.id: ", data.user.id)
    } catch {
      console.log("oh no!!")
    }
  }


  const getMedia = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select("profileURL")
        .eq('email', userEmail);
      console.log("Data URL hopefully: ", data)
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

  const uploadImage = async (base64FileData) => {
    const date = Date.now()
    try {
      const fileName = `${userID}/${userID}${date}.png`;
      console.log("Uploading image:", fileName);

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
     
        setImageURI(data.publicURL);

    } catch (error) {
      console.error("Error uploading image:", error.message);
      Alert.alert("Upload Failed", "Failed to upload image. Please try again later.");
    }
  };


  return (

    <>
      <View style={imageUploaderStyles.container}>
        {imageURI && <Image source={{ uri: imageURI }} style={{ width: 200, height: 200 }} />}
        <View style={imageUploaderStyles.uploadBtnContainer}>
          <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn}>
            <View>
              <Text>{imageURI ? 'Edit' : 'Upload'} Image</Text>
            </View>
            <AntDesign name="camera" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>  
      </>
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
    marginBottom: 25
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