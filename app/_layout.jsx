// import { Link, Stack, useRouter, Slot } from "expo-router";
import { useRouter, Slot } from "expo-router";
// import { StatusBar } from "expo-status-bar";


export default function AppLayout() {
    const router = useRouter();
  
    return (
        <Slot /> 
    );
}