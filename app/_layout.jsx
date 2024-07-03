// import { Link, Stack, useRouter, Slot } from "expo-router";
import { useRouter, Slot } from "expo-router";
// import { StatusBar } from "expo-status-bar";

import * as React from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://mdxtlljhnmhjtnekswpv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHRsbGpobm1oanRuZWtzd3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMDQxNjMsImV4cCI6MjAzNDc4MDE2M30.0_3wnZhu2-xXnwIIE9fc66pnJIyeSP7QdW10XRR20xU"
)

export default function AppLayout() {
    const router = useRouter();

    async function handleSignOut(e){
        e.preventDefault()
    
        try {
          const { error } = await supabase.auth.signOut()
    
          if (error) throw error
    
          router.push('/login')
          
        } catch (error) {
          alert(error)
        }
      }

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={ () => router.back() } />
                <Appbar.Content title='Tactical Chess' />
                <Appbar.Action icon='home' onPress={() => router.push('/home')} />
                <Appbar.Action icon='chess-bishop' onPress={() => router.push('/game')} />
                <Appbar.Action icon='account-cog' onPress={ () => router.push('/user') } />
                <Appbar.Action icon='login' onPress={ handleSignOut } />
            </Appbar.Header>
            <Slot />
        </>
    );
}