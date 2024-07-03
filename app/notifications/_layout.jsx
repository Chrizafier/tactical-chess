// import { Link, Stack, useRouter } from "expo-router";
import { useRouter } from "expo-router";
// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { Avatar } from 'react-native-paper';
import Login from "../login/_layout";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://mdxtlljhnmhjtnekswpv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHRsbGpobm1oanRuZWtzd3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMDQxNjMsImV4cCI6MjAzNDc4MDE2M30.0_3wnZhu2-xXnwIIE9fc66pnJIyeSP7QdW10XRR20xU"
  )

export default function AppLayout() {
    const router = useRouter();
    return (
        <View></View>
    );
}