import "../global.css";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { fonts } from "../constants/fonts";

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
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
