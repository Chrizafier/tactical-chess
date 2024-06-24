import { Redirect, useRouter } from "expo-router";


export default function Page() {
    const router = useRouter();
    // router.replace('/home');

    return <Redirect href="/login" />;
}