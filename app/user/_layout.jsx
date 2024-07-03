// import { Link, Stack, useRouter } from "expo-router";
import { useRouter } from "expo-router";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AppState} from 'react-native';
import { Drawer } from 'react-native-paper';
import SideNav, { Toggle, NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import User from "./User";
import UserSettings from "./UserSettings";
import FriendsSearch from "./FriendsSearch";
import AddFriend from "./AddFriend";
import Theme from "./Theme";
import Languages from "./Languages";

export default function AppLayout() {
  
  return (
  //   <Router>
  //     <User />
  //   <Routes>
  //     <Route path='/user-settings' element={<UserSettings />} />
  //     <Route path='/friends-search' element={<FriendsSearch />} />
  //     <Route path='/add-friend' element={<AddFriend />} />
  //     <Route path='/theme' element={<Theme />} />
  //     <Route path='/languages' element={<Languages />} />
  //   </Routes>
  // </Router>
  <View></View>
  );
}