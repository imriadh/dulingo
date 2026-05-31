import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { images } from "../constants/images";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <Image
        source={images.mascotLogo}
        style={{ width: 96, height: 40, resizeMode: "contain" }}
      />
      <Text className="text-2xl font-semibold text-slate-900 mt-6">
        Welcome to muolingo
      </Text>

      <Link href="/onboarding" asChild>
        <TouchableOpacity className="mt-8 px-6 py-3 bg-violet-600 rounded-full">
          <Text className="text-white text-base">Open Onboarding</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
