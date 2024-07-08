import { Redirect, useRouter } from "expo-router";
import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
export const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)

export default function Page() {
    const router = useRouter();
    return <Redirect href="/login" />;
}