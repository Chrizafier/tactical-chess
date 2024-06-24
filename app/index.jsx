import { Redirect, useRouter } from "expo-router";


export default function Page() {
    const router = useRouter();
    return <Redirect href="/home" />;
}