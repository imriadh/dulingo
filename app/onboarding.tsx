import { Link } from "expo-router";
import React from "react";
import {
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { images } from "../constants/images";

export default function Onboarding() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View className="flex-1 px-6 pt-6">
        <View className="flex-row items-center space-x-3">
          <Image
            source={images.mascotLogo}
            style={{ width: 36, height: 36, resizeMode: "contain" }}
          />
          <Text className="text-2xl font-semibold text-slate-900">
            muolingo
          </Text>
        </View>

        <View className="mt-10">
          <Text className="text-4xl font-bold text-slate-900">
            Your AI language
          </Text>
          <Text className="text-4xl font-bold text-violet-600">teacher.</Text>
        </View>

        <Text className="text-base text-slate-500 mt-4 max-w-[320px]">
          Real conversations, personalized lessons, anytime, anywhere.
        </Text>

        <View className="flex-1 items-center justify-center">
          <Image
            source={images.mascotWelcome}
            style={{ width: 300, height: 300, resizeMode: "contain" }}
          />
        </View>

        <View className="mb-8">
          <Link href="/" asChild>
            <TouchableOpacity className="bg-violet-600 px-6 py-4 rounded-2xl items-center">
              <Text className="text-white text-lg font-medium">
                Get Started
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
