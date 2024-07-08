// import UploadImage from "../UploadImage";
// import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';

// function UserSettings() {
//     return (
//        <View style={styles.container}>
//         <Text>User Settings</Text>
//         <UploadImage />
//         <Image></Image>
//        </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//       padding:50,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
// });

// export default UserSettings;

import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer';
import { supabase } from "../index";


export default function UploadImage() {
  const [imageURI, setImageURI] = useState('');
  const [base64String, setBase64String] = useState('');
  const [userID, setUserID] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
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
    getUser()
    checkForCameraRollPermission();
    getMedia();
  }, [imageURI, base64String, userID, userEmail]);

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
      // await getUser()
      // console.log("getMedia user email: ", userEmail)
      // console.log("getMedia user id: ", userID)
      // await getUser()
      // console.log("user email: ", userEmail)
      // console.log("user id: ", userID)
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

  // const deleteFolder = async (folderPath) => {

  //   console.log(
  //     "does try to delete files"
  //   )
  //   try {
  //     const { data: files, error } = await supabase
  //       .storage
  //       .from('avatars')
  //       .list(folderPath);

  //     if (error) {
  //       console.error('Error listing files:', error.message);
  //       return;
  //     }

  //     const deleteOperations = files.map(async (file) => {
  //       console.log(file)
  //       const { error: deleteError } = await supabase
  //         .storage
  //         .from('avatars')
  //         .remove([file.name]);

  //       if (deleteError) {
  //         console.error(`Error deleting file ${file.name}:`, deleteError.message);
  //       } else {
  //         console.log(`Deleted file ${file.name} successfully.`);
  //       }
  //     });

  //     await Promise.all(deleteOperations);

  //     console.log(`Deleted all files in folder ${folderPath}.`);
  //   } catch (error) {
  //     console.error('Error deleting folder:', error.message);
  //   }
  // };

  // const checkIfFolderExists = async (folderPath) => {
  //   const { data: files, error } = await supabase
  //     .storage
  //     .from('avatars')
  //     .list(folderPath);
  //   if (!files || files.length === 0 ) {
  //     return false
  //   }
  //   else {
  //     return true
  //   }
  // } 

  const uploadImage = async (base64FileData) => {
    const date = Date.now()
    //const folderPath = `${userID}`
    try {
      const fileName = `${userID}/${userID}${date}.png`;
      console.log("Uploading image:", fileName);
      
      // if (checkIfFolderExists(folderPath)) {
      //   await deleteFolder(folderPath);
      // }

      // console.log("Delete operations testing")
      // const { data: files } = await supabase
      //   .storage
      //   .from('avatars')
      //   .list(folderPath);

      // const deleteOperations = files.map(async (file) => {
      //     console.log("file: ", file)
      // });     

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

      // if (error) {
      //   console.error("Error uploading image:", error.message);
      //   Alert.alert("Upload Failed", "Failed to upload image. Please try again later.");
      // } else {
      //   console.log("Image uploaded successfully:", data.Key);
      //   Alert.alert("Upload Success", "Image uploaded successfully!");
      //   setImageURI(data.publicURL); // Update image URI after successful upload
      // }
    } catch (error) {
      console.error("Error uploading image:", error.message);
      Alert.alert("Upload Failed", "Failed to upload image. Please try again later.");
    }
  };

  return (
    // <View style={imageUploaderStyles.container}>
    //   {
    //     imageURI && <Image source={{ uri: imageURI }} style={{ width: 200, height: 200 }} />
    //   }
    //   <View style={imageUploaderStyles.uploadBtnContainer}>
    //     <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
    //       <View>
    //         <Text>{imageURI ? 'Edit' : 'Upload'} Image</Text>
    //       </View>
    //       <AntDesign name="camera" size={20} color="black" />
    //     </TouchableOpacity>
    //   </View>
    // </View>
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