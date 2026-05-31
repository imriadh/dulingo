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
        <View className="items-center">
          <Image
            source={images.mascotLogo}
            style={{ width: 84, height: 36, resizeMode: "contain" }}
          />
        </View>

        <View style={{ marginTop: 28 }}>
          <Text className="text-5xl font-bold text-[#0D132B]">
            Your AI language
          </Text>
          <Text className="text-5xl font-bold" style={{ color: "#6C4EF5" }}>
            teacher.
          </Text>
        </View>

        <Text
          className="text-base"
          style={{ color: "#6B7280", marginTop: 12, maxWidth: 320 }}
        >
          Real conversations, personalized lessons, anytime, anywhere.
        </Text>

        <View
          className="flex-1 items-center justify-center"
          style={{ marginTop: 8 }}
        >
          <View
            style={{
              width: 320,
              height: 320,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={images.mascotWelcome}
              style={{ width: 300, height: 300, resizeMode: "contain" }}
            />

            {/* Speech bubbles */}
            <View
              style={{
                position: "absolute",
                top: 30,
                left: 10,
                backgroundColor: "#EEF2FF",
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 12,
              }}
            >
              <Text style={{ color: "#0D132B", fontSize: 14 }}>Hello!</Text>
            </View>

            <View
              style={{
                position: "absolute",
                top: 40,
                right: 40,
                backgroundColor: "#F3F0FF",
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 12,
              }}
            >
              <Text style={{ color: "#6C4EF5", fontSize: 14 }}>¡Hola!</Text>
            </View>

            <View
              style={{
                position: "absolute",
                top: 150,
                right: 20,
                backgroundColor: "#FFF2EE",
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 12,
              }}
            >
              <Text style={{ color: "#E6513A", fontSize: 14 }}>你好!</Text>
            </View>
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Link href="/" asChild>
            <TouchableOpacity
              className="bg-[#6C4EF5] px-6 py-4 rounded-2xl flex-row items-center justify-between"
              style={{ paddingHorizontal: 24 }}
            >
              <Text className="text-white text-lg font-medium">
                Get Started
              </Text>
              <Text className="text-white text-lg">›</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
