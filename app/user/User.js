// import { Link, Stack, useRouter } from "expo-router";
import { useRouter } from "expo-router";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AppState} from 'react-native';
import { Drawer } from 'react-native-paper';
//import SideNav, { Toggle, NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css"
import { useNavigate, useLocation } from "react-router-dom";
// import { SideNav } from '@vaadin/react-components/SideNav.js';
// import { SideNavItem } from '@vaadin/react-components/SideNavItem.js';
// import { Icon } from '@vaadin/react-components/Icon.js';
// import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';


export const supabase = createClient(
  "https://mdxtlljhnmhjtnekswpv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHRsbGpobm1oanRuZWtzd3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMDQxNjMsImV4cCI6MjAzNDc4MDE2M30.0_3wnZhu2-xXnwIIE9fc66pnJIyeSP7QdW10XRR20xU"
)

export default function AppLayout() {
  const router = useRouter();
  const [fullName,setFullName] = useState("")
  const [email,setEmail] = useState("")  

  useEffect(() => {
    async function getProfile() {
      const { data, error } = await supabase.auth.getUser()
      setFullName(data.user.user_metadata.full_name)
      setEmail(data.user.user_metadata.email)
    }

    getProfile()
  })

  async function handleSubmit(e){
    e.preventDefault()

    try {
      const { error } = await supabase.auth.signOut()

      if (error) throw error

      router.push('/login')
      
    } catch (error) {
      alert(error)
    }
  }
  const navigate = useNavigate();
  const location = useLocation();
supabase.auth.
  return (
      // <VerticalLayout>
      //   <SideNav style={{ width: '100%' }} ref={sideNavRef}>
      //     <SideNavItem path="/inbox">
      //       <Icon icon="vaadin:inbox" slot="prefix" />
      //       Inbox
      //     </SideNavItem>
      //     <SideNavItem path="/sent">
      //       <Icon icon="vaadin:paperplane" slot="prefix" />
      //       Sent
      //     </SideNavItem>
      //     <SideNavItem path="/trash">
      //       <Icon icon="vaadin:trash" slot="prefix" />
      //       Trash
      //     </SideNavItem>
      //   </SideNav>
      // </VerticalLayout>
      <View>
      </View>
  );
}
