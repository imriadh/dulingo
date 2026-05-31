import "../global.css";

import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";
import { View } from "react-native";
import { fonts } from "../constants/fonts";

WebBrowser.maybeCompleteAuthSession();

const publishableKey =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ??
  process.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Add your Clerk publishable key to the environment.");
}

export default function RootLayout() {
  const [loaded] = useFonts({
    Poppins: fonts.Poppins_Regular,
    "Poppins-SemiBold": fonts.Poppins_SemiBold,
    "Poppins-Medium": fonts.Poppins_Medium,
    "Poppins-Bold": fonts.Poppins_Bold,
  } as any);

  if (!loaded) {
    return <View style={{ flex: 1, backgroundColor: "#fff" }} />;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </ClerkProvider>
  );
}
